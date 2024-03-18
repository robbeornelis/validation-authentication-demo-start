/**
 * An auth controller that handles login, register, and logout
 */

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
export const postRegister = async (req, res, next) => {};

/**
 * Logout
 */
export const logout = async (req, res) => {};
