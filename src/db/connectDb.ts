import { Db, MongoClient } from "mongodb"
import { DB_URL } from "../constants"

const client = new MongoClient(DB_URL)
let db: Db | undefined = undefined

export const connectDb = async () => {
    try {
        // Connect to db
        await client.connect()
        console.log("Connected successfully to db.")

        // Get db
        db = client.db()
        return db
    } catch (err) {
        console.error(err)
    }
}

export const getDb = async () => {
    // If db is not connected, then connect first
    if (!db) return await connectDb()
    return db
}
