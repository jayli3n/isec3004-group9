import bodyParser from "body-parser"
import express, { Express } from "express"
import { SERVER_PORT } from "./src/constants"
import { domXSS } from "./src/domBasedXSS"
import { logRequests } from "./src/middlewares"
import { indexPage, loginPage, logout, seedData, welcomePage } from "./src/noSQL"

// Setup server
const app: Express = express()

// Setup handlebar server side rendering
app.set("view engine", "hbs")

// Middlewares
app.use(logRequests)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Root route, show index page
app.get("/", indexPage)

// Seeds data
app.get("/seed-data", seedData)

// Login page
app.get("/login", (req, res) => loginPage(req, res, false))

// Login page (protection against no sql injection)
app.get("/login-safe", (req, res) => loginPage(req, res, true))

// Logout
app.get("/logout", logout)

// Welcome page
app.get("/welcome", welcomePage)

// DOM based XSS
app.get("/dom-xss", domXSS)

// Start server
app.listen(SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${SERVER_PORT}`)
})
