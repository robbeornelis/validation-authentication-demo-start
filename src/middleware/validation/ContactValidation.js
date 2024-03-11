import { body } from "express-validator";

export default [
  // fullname
  body("fullname")
    .notEmpty()
    .withMessage("Vul je naam in")
  // email
  body("email")
    .notEmpty()
    .withMessage("E-mail is verplicht")
    .bail()
    .isEmail()
    .withMessage("Vul een geldig e-mail adres in"),
  // message
  body("message")
    .notEmpty()
    .withMessage("Vul een bericht in")
    .bail()
    .isLength({ min: 15 })
    .withMessage("Je bericht moet minimaal 15 tekens bevatten"),
];
