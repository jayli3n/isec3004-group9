import bodyParser from "body-parser";
import express, { Express } from "express";
import { SERVER_PORT } from "./src/constants";
import { domXSS, domXSS2 } from "./src/domBasedXSS";
import { logRequests } from "./src/middlewares";
import { indexPage, loginPage, logout, seedData, todoPage } from "./src/noSQL";

// Setup server
const app: Express = express();

// Setup handlebar server side rendering
app.set("view engine", "hbs");

// Middlewares
app.use(logRequests);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Root route, show index page
app.get("/", indexPage);

// Seeds data
app.get("/seed-data", seedData);

// Login page
app.get("/login", (req, res) => loginPage(req, res, false));

// Login page (protection against no sql injection)
app.get("/login-safe", (req, res) => loginPage(req, res, true));

// Logout
app.get("/logout", logout);

// The todo list page
app.get("/todo-list", (req, res) => todoPage(req, res, false));

// The todo list page SAFE
app.get("/todo-list-safe", (req, res) => todoPage(req, res, true));

// DOM based XSS
app.get("/dom-xss", (req, res) => domXSS(req, res, false));

// DOM based XSS SAFE
app.get("/dom-xss-safe", (req, res) => domXSS(req, res, true));

// DOM based XSS 2
app.get("/dom-xss2", (req, res) => domXSS2(req, res, false));

// DOM based XSS 2 SAFE
app.get("/dom-xss2-safe", (req, res) => domXSS2(req, res, true));

// Start server
app.listen(SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${SERVER_PORT}`);
});
