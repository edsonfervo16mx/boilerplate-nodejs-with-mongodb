const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewares/validate");
const checkRole = require("../../middlewares/checkRole");
const UserController = require("../../controllers/user.controller");
const HttpStatusUtils = require("../../utils/httpresponse");

const controller = new UserController();
const http = new HttpStatusUtils();

router.post("/login", async (req, res, next) => {
  try {
    let fields = req.body;
    const payload = await controller.login(fields);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/", verifyToken, async (req, res, next) => {
  try {
    // console.log("-----");
    // console.log(req.id);
    // console.log(req.organization);
    // console.log("-----");
    const payload = await controller.list(req.organization);
    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
});

router.get("/:user", verifyToken, async (req, res, next) => {
  try {
    const payload = await controller.get(req.id);
    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
});

router.get("/:user/refresh", async (req, res, next) => {
  try {
    let fields = req.body;
    let params = req.params;
    const payload = await controller.refreshToken(req.id, fields.refresh);
    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
});

router.get("/:user/reset", async (req, res, next) => {
  try {
    console.log("reset password email");
    let fields = req.body;
    const payload = await controller.sendEmailResetPassword(fields);
    res.status(200).json(payload);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let fields = req.body;
    const payload = await controller.create(fields);
    const status = await http.status(payload);
    res.status(status).json(payload);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put(
  "/:user",
  verifyToken,
  checkRole("user", "write"),
  async (req, res, next) => {
    try {
      let fields = req.body;
      const payload = await controller.update(fields);
      const status = await http.status(payload);
      res.status(status).json(payload);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
