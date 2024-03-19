export default (firstRole, secondRole, thirdRole) => (req, res, next) => {
  const userRole = req.user.role.slug;
  console.log(userRole);
  if (
    userRole === firstRole ||
    userRole === secondRole ||
    userRole === thirdRole
  ) {
    return next();
  }

  return res.render("errors/message", {
    code: 403,
    title: "Forbidden",
    message: "You are not authorised to access this page",
  });
};
