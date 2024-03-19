import User from "../../models/User.js";

export const index = async (req, res, next) => {
  const users = await User.query();
  res.render("dashboard/users/index", { users });
};

export const show = async (req, res, next) => {
  res.send("User show");
};

export const create = async (req, res, next) => {
  res.send("User create");
};

export const store = async (req, res, next) => {
  res.send("User store");
};

export const edit = async (req, res, next) => {
  res.send("User edit");
};

export const update = async (req, res, next) => {
  res.send("User update");
};

export const destroy = async (req, res, next) => {
  res.send("User destroy");
};
