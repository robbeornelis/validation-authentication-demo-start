/**
 * An auth controller that handles login, register, and logout
 */

import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import Role from "../models/Role.js";
import User from "../models/User.js";

/**
 * Login
 */
export const login = async (req, res) => {
  const inputs = [
    {
      name: "email",
      label: "Email",
      type: "email",
      value: req.body.email,
      err: req.formErrorFields?.email ? req.formErrorFields.email : "",
    },
    {
      name: "password",
      label: "Wachtwoord",
      type: "password",
      err: req.formErrorFields?.password ? req.formErrorFields.password : "",
    },
  ];

  // get flash messages
  const flash = req.flash || {};

  res.render("login", { layout: "authentication", inputs, flash });
};
export const postLogin = async (req, res, next) => {
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

    // redirect to the login page
    return next();
  }

  // check if user exists
  const user = await User.query().findOne({ email: req.body.email });
  if (!user) {
    req.flash = {
      type: "danger",
      message: "Gebruiker bestaat niet",
    };
    return next();
  }

  // check password
  const match = bcrypt.compareSync(req.body.password, user.password);

  if (!match) {
    req.flash = {
      type: "danger",
      message: "Wachtwoord is fout",
    };
    return next();
  }

  // token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.TOKEN_SALT,
    {
      expiresIn: "1h",
    }
  );

  // set cookie, this is very unsafe, but for now it's okay
  res.cookie("user", token, { httpOnly: true });

  // redirect to the home page
  res.redirect("/");
};

/**
 * Register
 */
export const register = async (req, res) => {
  const inputs = [
    {
      name: "firstname",
      label: "Voornaam",
      type: "text",
      value: req.body.firstname,
      err: req.formErrorFields?.firstname ? req.formErrorFields.firstname : "",
    },
    {
      name: "lastname",
      label: "Achternaam",
      type: "text",
      value: req.body.lastname,
      err: req.formErrorFields?.lastname ? req.formErrorFields.lastname : "",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      value: req.body.email,
      err: req.formErrorFields?.email ? req.formErrorFields.email : "",
    },
    {
      name: "password",
      label: "Wachtwoord",
      type: "password",
      err: req.formErrorFields?.password ? req.formErrorFields.password : "",
    },
  ];

  // get roles
  const roles = await Role.query();

  // get flash messages
  const flash = req.flash || {};

  res.render("register", { layout: "authentication", inputs, roles, flash });
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

  // check if user exists
  const userExists = await User.query().findOne({ email: req.body.email });
  if (userExists) {
    req.flash = {
      type: "danger",
      message: "Gebruiker bestaat al",
    };
    return next();
  }

  // hash password
  const pass = bcrypt.hashSync(req.body.password, 10);

  // create user
  const user = await User.query().insert({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: pass,
    role_id: parseInt(req.body.role),
  });

  // redirect to the login page
  res.redirect("/login");
};

/**
 * Logout
 */
export const logout = async (req, res) => {};
