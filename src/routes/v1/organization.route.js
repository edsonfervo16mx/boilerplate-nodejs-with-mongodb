const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/validate");
const checkRole = require("../../middlewares/checkRole");
const OrganizationController = require("../../controllers/organization.controller");

const controller = new OrganizationController();

router.get(
  "/",
  verifyToken,
  checkRole("organizations", "read"),
  async (req, res, next) => {
    try {
      const payload = await controller.list();
      res.status(200).json(payload);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    fields = req.body;
    const payload = await controller.create(fields);
    res.status(201).json(payload);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/",
  verifyToken,
  checkRole("organizations", "write"),
  async (req, res, next) => {
    try {
      fields = req.body;
      const payload = await controller.update(fields);
      res.status(200).json(payload);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
