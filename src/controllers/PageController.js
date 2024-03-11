/**
 * A Page Controller
 */

import { validationResult } from "express-validator";

export const home = async (req, res) => {
  res.render("home", {});
};

export const contact = (req, res) => {
  const inputs = [
    {
      name: "fullname",
      label: "Volledige naam",
      type: "text",
    },
    {
      name: "email",
      label: "Jouw e-mail adres",
      type: "text",
    },
    {
      name: "message",
      label: "Jouw bericht",
      type: "textarea",
    },
  ];

  res.render("contact", {
    inputs,
  });
};

/**
 * This function handles the post request for the contact page
 */
export const postContact = async (req, res, next) => {
  // check errors and show in browser
  const errors = validationResult(req);
  res.send(errors);
  return;

  res.send(req.body);
  return;

  next();
};
