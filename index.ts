import bodyParser from "body-parser";
import express, { Express } from "express";
import { SERVER_PORT } from "./src/constants";
import { domXSS, domXSS2, domXSS2safe,domXSSsafe } from "./src/domBasedXSS";
import { logRequests } from "./src/middlewares";
import { indexPage, loginPage, logout, seedData, welcomePage } from "./src/noSQL";

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

// Welcome page
app.get("/welcome", welcomePage);

// DOM based XSS
app.get("/dom-xss", domXSS);

// DOM based XSS SAFE
app.get("/dom-xss-safe", domXSSsafe);

// DOM based XSS 2
app.get("/dom-xss2", domXSS2);

// DOM based XSS2 SAFE
app.get("/dom-xss2-safe", domXSS2safe)

// Start server
app.listen(SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${SERVER_PORT}`);
});
