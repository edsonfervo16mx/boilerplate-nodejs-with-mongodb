require("dotenv").config();

const { Permission } = require("../models/index");

const checkRole = (model, action) => async (req, res, next) => {
  console.log("checkRole...");
  try {
    if (req.role != undefined) {
      const permissions = await Permission.find({
        roles: req.role,
        model: model,
      });
      is_allowed = permissions.map(function (x) {
        return x[action];
      });
      if (!is_allowed.includes(true)) {
        return res.status(403).json({
          errors: { jwt: { name: "Role", message: "Forbidden" } },
          name: "ValidationError",
          message: "User validation failed, verify token",
        });
      }
      next();
    }
  } catch (err) {
    throw new Error("Unauthorized");
  }
};

module.exports = checkRole;
