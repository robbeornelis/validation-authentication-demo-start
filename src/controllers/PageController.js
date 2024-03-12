/**
 * A Page Controller
 */

import { validationResult } from "express-validator";

export const home = async (req, res) => {
  res.render("home", {});
};

export const contact = (req, res) => {
  // create input fields
  const inputs = [
    {
      name: "fullname",
      label: "Volledige naam",
      type: "text",
      err: req.formErrorFields?.fullname ? req.formErrorFields.fullname : "",
      value: req.body?.fullname ? req.body.fullname : "",
    },
    {
      name: "email",
      label: "Jouw e-mail adres",
      type: "text",
      err: req.formErrorFields?.email ? req.formErrorFields.email : "",
      value: req.body?.email ? req.body.email : "",
    },
    {
      name: "message",
      label: "Jouw bericht",
      type: "textarea",
      err: req.formErrorFields?.message ? req.formErrorFields.message : "",
      value: req.body?.message ? req.body.message : "",
    },
  ];

  // get flash message if available
  const flash = req.flash || "";

  res.render("contact", {
    inputs,
    flash,
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

    // set flash message
    req.flash = {
      type: "danger",
      message: "Er zijn fouten gevonden in je formulier",
    };

    // show errors in browser via the contact page
    return next();
  }

  // set flash message
  req.flash = {
    type: "success",
    message: "Bedankt voor je bericht. Georgette gaat ermee aan de slag!",
  };

  // clear form fields
  req.body = {};

  return next();
};
