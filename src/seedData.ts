import { Request, Response } from "express"
import { getDb } from "./db/connectDb"

export const seedData = async (req: Request, res: Response) => {
    const db = await getDb()
    if (!db) {
        res.status(500).send("Server failed to initialize db.")
        return
    }

    // Seed some data
    const users = db.collection("users")
    users.deleteMany({})
    await users.insertMany([
        {
            username: "christine",
            password: "1234",
        },
        {
            username: "jay",
            password: "1234",
        },
        {
            username: "tristan",
            password: "1234",
        },
        {
            username: "james",
            password: "1234",
        },
    ])
    res.send("Data seeded!")
}
