import express, { Express, Request, Response } from "express"
import { noSqlDemo } from "./src/noSqlDemo"

// Setup server
const SERVER_PORT = 8000
const app: Express = express()

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
})

app.get("/no-sql-demo", noSqlDemo)

app.listen(SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${SERVER_PORT}`)
})
