/**
 * The API controllers
 */

import User from "../../models/User.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.query().withGraphFetched("[meta, role]");

    // get the interests and return them with status code 200
    res.status(200).json(users);
  } catch (e) {
    next(e.message);
  }
};
