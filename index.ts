import express, { Express, Request, Response } from "express"
import { SERVER_PORT } from "./src/constants"
import { loginPage, loginPost, logout, seedData, welcomePage } from "./src/noSQL"
import bodyParser from "body-parser"

// Setup server
const app: Express = express()

// Setup handlebar server side rendering
app.set("view engine", "hbs")

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Root route, just prints hell world
app.get("/", (req: Request, res: Response) => {
    res.render("index")
})

// Seeds data
app.get("/seed", seedData)

// Login page
app.get("/login", loginPage)

// Handle login post
app.post("/login", loginPost)

// Logout
app.get("/logout", logout)

// Welcome page
app.get("/welcome", welcomePage)

// Start server
app.listen(SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${SERVER_PORT}`)
})
