import { Request, Response } from "express";
import { Db, ObjectId } from "mongodb";
import { fakeTodoItems, fakeUsers, TodoItem, User } from "./constants";
import { getDb } from "./db/connectDb";

// A very basic way of remember the logged in user, it's not proper auth logic
let loggedInUserID: ObjectId | undefined;

export const indexPage = async (req: Request, res: Response) => {
    res.render("index", { isLoggedIn: !!loggedInUserID });
};

const seed = async (db: Db) => {
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

    return {
        todoItems: newTodoItems,
        users: newUsers,
    };
};

// Seeds random data into db
export const seedData = async (req: Request, res: Response) => {
    const db = await getDb();
    if (!db) {
        res.status(500).send("Server failed to initialize db.");
        return;
    }
    const result = await seed(db);
    res.json(result);
};

// Returns the login page
export const loginPage = async (req: Request, res: Response, isSafe = false) => {
    let errorMessage = "";

    // If user is logged in, redirect to todo list page
    if (loggedInUserID) {
        res.redirect("/todo-list");
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

        await seed(db);

        // This code will manually check that password is type string, if not, return error
        if (isSafe) {
            if (typeof username !== "string" || typeof password !== "string") {
                errorMessage = "🔴 The data you have entered seems like it could be a NoSQL Injection.";
                console.log(errorMessage);
                renderLoginPage(res, isSafe, errorMessage);
                return;
            }
        }

        // Check if username and password are correct, if yes, redirect to todos page
        const user = await db.collection("users").findOne({ username, password });
        if (user) {
            console.log("🟢 Successfully logged in.");
            loggedInUserID = user._id;
            res.redirect("/todo-list");
            return;
        }

        errorMessage = "🔴 Incorrect username and password.";
        console.log(errorMessage);
    }

    renderLoginPage(res, isSafe, errorMessage);
};

const renderLoginPage = (res: Response, isSafe: boolean, errorMessage: string) => {
    res.render("login", { isSafe, isLoggedIn: !!loggedInUserID, errorMessage });
};

export const logout = async (req: Request, res: Response) => {
    loggedInUserID = undefined;
    res.redirect("/login");
};

// Returns the Todos page
export const todoPage = async (req: Request, res: Response, isSafe: boolean) => {
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

    await seed(db);

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

    // Insert new todoItem works but gives error:
    // Cannot send headers after they are send to the client
    if (req.query.newItem) {
        try {
            db.collection("todoItems").insertOne({ username: user.username, title: req.query.newItem });
            res.redirect("/todo-list"); //called res.redirect twice
        } catch {
            console.log("Failed to insert.");
        }
        return;
    }

    // Get user todoItems
    interface TodoItemDoc extends TodoItem {
        _id: ObjectId;
    }
    try {
        if (isSafe) {
            const todoItems = (await db
                .collection("todoItems")
                .find({ username: user.username, title: { $regex: req.query.search || "", $options: "i" } })
                .toArray()) as TodoItemDoc[];

            // Render the page
            res.render("todoList", {
                username: user.username,
                todoItems,
                isLoggedIn: !!loggedInUserID,
                isSafe,
            });
        } else {
            const todoItems = (await db
                .collection("todoItems")
                .find({ $where: `this.title.toLowerCase().includes('${req.query.search || ""}') && this.username == '${user.username}'` })
                .toArray()) as TodoItemDoc[];

            // Render the page
            res.render("todoList", {
                username: user.username,
                todoItems,
                isLoggedIn: !!loggedInUserID,
                isSafe,
            });
        }
    } catch (err) {
        console.log(err);
        // Render the page
        res.render("todoList", {
            username: user.username,
            todoItems: [],
            isLoggedIn: !!loggedInUserID,
            isSafe,
        });
    }
};
