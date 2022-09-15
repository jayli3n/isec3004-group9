import express, { Express, Request, Response } from "express"
import { SERVER_PORT } from "./src/constants"
import { loginGet, loginPost } from "./src/login"
import { seedData } from "./src/seedData"

// Setup server
const app: Express = express()

app.set("view engine", "hbs")

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!")
})

app.get("/seed", seedData)

app.get("/login", loginGet)

app.post("/login", loginPost)

app.listen(SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${SERVER_PORT}`)
})
