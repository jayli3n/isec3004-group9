"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const constants_1 = require("./src/constants");
const domBasedXSS_1 = require("./src/domBasedXSS");
const middlewares_1 = require("./src/middlewares");
const noSQL_1 = require("./src/noSQL");
// Setup server
const app = (0, express_1.default)();
// Setup handlebar server side rendering
app.set("view engine", "hbs");
// Middlewares
app.use(middlewares_1.logRequests);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static("public"));
// Root route, show index page
app.get("/", noSQL_1.indexPage);
// Seeds data
app.get("/seed-data", noSQL_1.seedData);
// Login page
app.get("/login", (req, res) => (0, noSQL_1.loginPage)(req, res, false));
// Login page (protection against no sql injection)
app.get("/login-safe", (req, res) => (0, noSQL_1.loginPage)(req, res, true));
// Logout
app.get("/logout", noSQL_1.logout);
// The todo list page
app.get("/todo-list", (req, res) => (0, noSQL_1.todoPage)(req, res, false));
// The todo list page SAFE
app.get("/todo-list-safe", (req, res) => (0, noSQL_1.todoPage)(req, res, true));
// DOM based XSS
app.get("/dom-xss", (req, res) => (0, domBasedXSS_1.domXSS)(req, res, false));
// DOM based XSS SAFE
app.get("/dom-xss-safe", (req, res) => (0, domBasedXSS_1.domXSS)(req, res, true));
// DOM based XSS 2
app.get("/dom-xss2", (req, res) => (0, domBasedXSS_1.domXSS2)(req, res, false));
// DOM based XSS 2 SAFE
app.get("/dom-xss2-safe", (req, res) => (0, domBasedXSS_1.domXSS2)(req, res, true));
// Start server
app.listen(constants_1.SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${constants_1.SERVER_PORT}`);
});
