/**
 * A Page Controller
 */

export const home = async (req, res) => {
  res.render("home", {});
};

/*
 * A contact page
 */
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
      type: "email",
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
  res.send(req.body);
  return;

  next();
};
