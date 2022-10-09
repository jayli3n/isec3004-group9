import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { fakeTodoItems, fakeUsers, TodoItem, User } from "./constants";
import { getDb } from "./db/connectDb";

// A very basic way of remember the logged in user, it's not proper auth logic
let loggedInUserID: ObjectId | undefined;

export const indexPage = async (req: Request, res: Response) => {
    res.render("index", { isLoggedIn: !!loggedInUserID });
};

// Seeds random data into db
export const seedData = async (req: Request, res: Response) => {
    const db = await getDb();
    if (!db) {
        res.status(500).send("Server failed to initialize db.");
        return;
    }

    // Seed users table
    const users = db.collection("users");
    await users.deleteMany({});
    await users.insertMany(fakeUsers);

    // Seed todoItems table
    const todoItems = db.collection("todoItems");
    await todoItems.deleteMany({});
    await todoItems.insertMany(fakeTodoItems);

    const newTodoItems = await todoItems.find().toArray();
    const newUsers = await users.find().toArray();

    res.json({
        todoItems: newTodoItems,
        users: newUsers,
    });
};

// Returns the login page
export const loginPage = async (req: Request, res: Response, preventNoSQLInjection = false) => {
    let errorMessage = "";

    // If user is logged in, redirect to todo list page
    if (loggedInUserID) {
        res.redirect("/todos");
        return;
    }

    // Just for the demo purposes, try to convert username / password into objects
    let username = req.query.username;
    let password = req.query.password;

    // If request contains login details, attempt to log them in
    if (username && password) {
        console.log("🟡 Login request received: ", { username, password });

        const db = await getDb();
        if (!db) {
            res.status(500).send("Server failed to initialize db.");
            return;
        }

        // This code will manually check that password is type string, if not, return error
        if (preventNoSQLInjection) {
            if (typeof username !== "string" || typeof password !== "string") {
                errorMessage = "🔴 The data you have entered seems like it could be a NoSQL Injection.";
                console.log(errorMessage);
                renderLoginPage(res, preventNoSQLInjection, errorMessage);
                return;
            }
        }

        // Check if username and password are correct, if yes, redirect to todos page
        const user = await db.collection("users").findOne({ username, password });
        if (user) {
            console.log("🟢 Successfully logged in.");
            loggedInUserID = user._id;
            res.redirect("/todos");
            return;
        }

        errorMessage = "🔴 Incorrect username and password.";
        console.log(errorMessage);
    }

    renderLoginPage(res, preventNoSQLInjection, errorMessage);
};

const renderLoginPage = (res: Response, preventNoSQLInjection: boolean, errorMessage: string) => {
    if (preventNoSQLInjection) {
        res.render("login", { isSafe: true, isLoggedIn: !!loggedInUserID, errorMessage });
    } else {
        res.render("login", { isLoggedIn: !!loggedInUserID, errorMessage });
    }
};

export const logout = async (req: Request, res: Response) => {
    loggedInUserID = undefined;
    res.redirect("/login");
};

// Returns the Todos page
export const todoPage = async (req: Request, res: Response) => {
    // If user is not logged in, redirection to login page

    if (!loggedInUserID) {
        res.redirect("/login");
        return;
    }

    const db = await getDb();
    if (!db) {
        res.status(500).send("Server failed to initialize db.");
        return;
    }
    // Get the user from db
    interface UserDoc extends User {
        _id: ObjectId;
    }

    const user = (await db.collection("users").findOne({ _id: loggedInUserID })) as UserDoc;

    // If user doesn't exist in db, then redirect to login page
    if (!user) {
        res.redirect("/login");
        return;
    }

    // Get user todoItems
    interface TodoItemDoc extends TodoItem {
        _id: ObjectId;
    }
    const todoItems = (await db.collection("todoItems").find({ username: user.username }).toArray()) as TodoItemDoc[];
    // Insert new todoItem works but gives error:
    // Cannot send headers after they are send to the client
    if (req.query.todoItemTitle) {
        try {
            db.collection("todoItems").insertOne({ username: user.username, title: req.query.todoItemTitle });
            res.redirect("/todos"); //called res.redirect twice
        } catch {
            console.log("Failed to insert.");
        }
    } else {
        // Render the page
        res.render("todoList", {
            username: user.username,
            todoItems,
            isLoggedIn: !!loggedInUserID,
        });
    }
};
