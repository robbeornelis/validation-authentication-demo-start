/**
 * A Page Controller
 */

import { validationResult } from "express-validator";

export const home = async (req, res) => {
  res.render("home", {});
};

export const contact = (req, res) => {
  if (req.formErrorFields) {
    console.log(req.formErrorFields);
  }

  const inputs = [
    {
      name: "fullname",
      label: "Volledige naam",
      type: "text",
      err: req.formErrorFields?.fullname ? req.formErrorFields.fullname : "",
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

  if (!errors.isEmpty()) {
    req.formErrorFields = {};
    errors.array().forEach((error) => {
      req.formErrorFields[error.path] = error.msg;
    });

    // show errors in browser via the contact page
    return next();
  }

  res.send(req.body);
  return;

  next();
};
