import { body } from "express-validator";

export default [
  body("fullname")
    .notEmpty()
    .withMessage("Volledige naam is een verplicht veld")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Volledige naam moet minimaal 2 karakters bevatten"),
  body("email")
    .notEmpty()
    .withMessage("email is een verplicht veld")
    .bail()
    .isEmail()
    .withMessage("Ongeldig email adres"),
  body("message")
    .notEmpty()
    .withMessage("Je moet een bericht invullen")
    .bail()
    .isLength({ min: 10 })
    .withMessage("Bericht moet ten minste 10 tekens bevatten"),
];
