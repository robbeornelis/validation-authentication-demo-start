// import npm libraries
import express from "express";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import { VIEWS_PATH, PORT } from "./consts.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";

// middleware
import ContactValidation from "./middleware/validation/ContactValidation.js";

// controllers
/**
 * We use the import * as syntax to import all the functions from the file and
 * and assign them to a variable with the same name as the file.
 * This allows us to call the functions using the variable name as a prefix.
 */
import * as PageController from "./controllers/PageController.js";
import * as AuthController from "./controllers/AuthController.js";
import * as ApiUserController from "./controllers/api/UserController.js";

// create an express app
const app = express();
app.use(express.static("public"));

// make sure we can parse the body of the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine: handlebars
const hbs = create({
  helpers: HandlebarsHelpers,
  extname: "hbs",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH);

/**
 * ------------------------------
 *            ROUTING
 * ------------------------------
 */

// Auth routes
app.get("/login", AuthController.login);
app.get("/register", AuthController.register);
app.post("/register", AuthController.postRegister, AuthController.register);
app.post("/login", AuthController.postLogin, AuthController.login);
app.post("/logout", AuthController.logout);

// Page routes
app.get("/", PageController.home);
app.get("/contact", PageController.contact);
app.post(
  "/contact",
  ContactValidation,
  PageController.postContact,
  PageController.contact
);

// API routes
app.get("/api/user", ApiUserController.index);
app.get("/api/user/:id", ApiUserController.show);
app.post("/api/user", ApiUserController.store);
app.patch("/api/user/:id", ApiUserController.update);
app.delete("/api/user/:id", ApiUserController.destroy);

/**
 * ------------------------------
 *        START SERVER
 * ------------------------------
 */

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}/.`);
});
