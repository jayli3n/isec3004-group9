import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import { fakePosts, fakeUsers, Post, User } from "./constants"
import { getDb } from "./db/connectDb"

// A very basic way of remember the logged in user, it's not proper auth logic
let loggedInUserID: ObjectId | undefined

// Seeds random data into db
export const seedData = async (req: Request, res: Response) => {
    const db = await getDb()
    if (!db) {
        res.status(500).send("Server failed to initialize db.")
        return
    }

    // Seed users table
    const users = db.collection("users")
    await users.deleteMany({})
    await users.insertMany(fakeUsers)

    // Seed posts table
    const posts = db.collection("posts")
    await posts.deleteMany({})
    await posts.insertMany(fakePosts)

    const newPosts = await posts.find().toArray()
    const newUsers = await users.find().toArray()

    res.json({
        posts: newPosts,
        users: newUsers,
    })
}

// Returns the login page
export const loginPage = async (req: Request, res: Response) => {
    // If user is logged in, redirect to welcome page
    if (loggedInUserID) {
        res.redirect("/welcome")
        return
    }

    const db = await getDb()
    if (!db) {
        res.status(500).send("Server failed to initialize db.")
        return
    }

    res.render("login")
}

export const loginPost = async (req: Request, res: Response) => {
    const db = await getDb()
    if (!db) {
        res.status(500).send("Server failed to initialize db.")
        return
    }

    // Check if username and password are correct, if yes, redirect to welcome page
    const user = await db.collection("users").findOne({ username: req.body.username, password: req.body.password })
    if (user) {
        loggedInUserID = user._id
        res.redirect("/welcome")
    }

    res.redirect("/login")
}

export const logout = async (req: Request, res: Response) => {
    loggedInUserID = undefined
    res.redirect("/login")
}

// Returns the login page
export const welcomePage = async (req: Request, res: Response) => {
    // If user is not logged in, redirection to login page
    if (!loggedInUserID) {
        res.redirect("/login")
        return
    }

    const db = await getDb()
    if (!db) {
        res.status(500).send("Server failed to initialize db.")
        return
    }

    // Get the user from db
    interface UserDoc extends User {
        _id: ObjectId
    }
    const user = (await db.collection("users").findOne({ _id: loggedInUserID })) as UserDoc
    // If user doesn't exist in db, then redirect to login page
    if (!user) {
        res.redirect("/login")
        return
    }

    // Get user posts
    interface PostDoc extends Post {
        _id: ObjectId
    }
    const posts = (await db.collection("posts").find({ username: user.username }).toArray()) as PostDoc[]

    // Render the page
    res.render("welcome", {
        username: user.username,
        posts,
    })
}
