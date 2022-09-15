import { Request, Response } from "express"
import path from "path"
import { getDb } from "./db/connectDb"

export const noSqlDemo = async (req: Request, res: Response) => {
    const db = await getDb()
    if (!db) {
        res.status(500).send("Server failed to initialize db.")
        return
    }

    // Seed some data
    const users = await db.collection("users").find().toArray()

    res.render("index", {
        users,
    })
}