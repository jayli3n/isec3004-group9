import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { fakePosts, fakeUsers, Post, User } from "./constants";
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

    // Seed posts table
    const posts = db.collection("posts");
    await posts.deleteMany({});
    await posts.insertMany(fakePosts);

    const newPosts = await posts.find().toArray();
    const newUsers = await users.find().toArray();

    res.json({
        posts: newPosts,
        users: newUsers,
    });
};

// Returns the login page
export const loginPage = async (req: Request, res: Response, preventNoSQLInjection = false) => {
    let errorMessage = "";

    // If user is logged in, redirect to welcome page
    if (loggedInUserID) {
        res.redirect("/welcome");
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

        // Check if username and password are correct, if yes, redirect to welcome page
        const user = await db.collection("users").findOne({ username, password });
        if (user) {
            console.log("🟢 Successfully logged in.");
            loggedInUserID = user._id;
            res.redirect("/welcome");
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

// Returns the Welcome page
export const welcomePage = async (req: Request, res: Response) => {
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

    // Get user posts
    interface PostDoc extends Post {
        _id: ObjectId;
    }
    const posts = (await db.collection("posts").find({ username: user.username }).toArray()) as PostDoc[];
    // Insert new post works but gives error:
    // Cannot send headers after they are send to the client
    if (req.query.postTitle) {
        try {
            db.collection("posts").insertOne({ username: user.username, title: req.query.postTitle });
            res.redirect("/welcome"); //called res.redirect twice
        } catch {
            console.log("Failed to insert.");
        }
    } else {
        // Render the page
        res.render("welcome", {
            username: user.username,
            posts,
            isLoggedIn: !!loggedInUserID,
        });
    }
};
