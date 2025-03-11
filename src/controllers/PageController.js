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
      label: "E-mail",
      type: "text",
    },
    {
      name: "message",
      label: "Bericht",
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
export const postContact = async (req, res, next) => {};
