const { Role } = require("../models/index");

class RoleController {
  async list() {
    let response = {};
    try {
      response = await Role.find();
      return response;
    } catch (err) {
      return err;
    }
  }
  async create(fields) {
    let response = {};
    try {
      response = await Role.create(fields);
      return response;
    } catch (err) {
      return err;
    }
  }
  async update(fields) {
    let response = {};
    try {
      response = await Role.updateOne({ _id: fields._id }, fields);
      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = RoleController;
