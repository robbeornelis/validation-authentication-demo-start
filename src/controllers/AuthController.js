/**
 * An auth controller that handles login, register, and logout
 */

import { validationResult } from "express-validator";

import Role from "../models/Role.js";

/**
 * Login
 */
export const login = async (req, res) => {
  res.render("login", { layout: "authentication" });
};
export const postLogin = async (req, res, next) => {};

/**
 * Register
 */
export const register = async (req, res) => {
  const inputs = [
    { name: "firstname", label: "Voornaam", type: "text" },
    { name: "lastname", label: "Achternaam", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Wachtwoord", type: "password" },
  ];

  const roles = await Role.query();

  res.render("register", { layout: "authentication", inputs, roles });
};
export const postRegister = async (req, res, next) => {
  // check errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.formErrorFields = {};
    errors.array().forEach((error) => {
      req.formErrorFields[error.path] = error.msg;
    });

    // set flash message
    req.flash = {
      type: "danger",
      message: "Er zijn fouten gevonden in het formulier",
    };

    // redirect to the register page
    return next();
  }
};

/**
 * Logout
 */
export const logout = async (req, res) => {};
