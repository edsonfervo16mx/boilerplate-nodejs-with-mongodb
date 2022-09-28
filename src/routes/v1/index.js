const express = require("express");

const router = express.Router();
// Routes
const user = require("./user.route");
const organization = require("./organization.route");
const role = require("./role.route");
const permission = require("./permission.route");

const mapNavigationUrls = [
  {
    path: "/users",
    route: user,
  },
  {
    path: "/organizations",
    route: organization,
  },
  {
    path: "/roles",
    route: role,
  },
  {
    path: "/permissions",
    route: permission,
  },
];

mapNavigationUrls.forEach((item) => {
  router.use(item.path, item.route);
});

module.exports = router;
