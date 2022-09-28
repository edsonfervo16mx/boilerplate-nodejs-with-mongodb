const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/validate");
const checkRole = require("../../middlewares/checkRole");
const RoleController = require("../../controllers/role.controller");

const controller = new RoleController();

router.get(
  "/",
  verifyToken,
  checkRole("role", "read"),
  async (req, res, next) => {
    try {
      const payload = await controller.list();
      res.status(200).json(payload);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  verifyToken,
  checkRole("role", "create"),
  async (req, res, next) => {
    try {
      fields = req.body;
      const payload = await controller.create(fields);
      res.status(201).json(payload);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/",
  verifyToken,
  checkRole("role", "write"),
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
