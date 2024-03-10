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
  res.render("contact", {});
};

/**
 * This function handles the post request for the contact page
 */
export const postContact = async (req, res, next) => {};
