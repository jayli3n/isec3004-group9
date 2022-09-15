import { Request, Response } from "express"
import { connectDb } from "../db/connectDb"

export const noSqlDemo = async (req: Request, res: Response) => {
    const db = await connectDb()
    console.log(db)
    res.send("Hello world!")
}
