import express, { Express, Request, Response } from "express"
import { noSqlDemo } from "./src/noSqlDemo"

const app: Express = express()
const port = 8000

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
})

app.get("/no-sql-demo", noSqlDemo)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
