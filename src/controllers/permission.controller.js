const { Permission } = require("../models/index");

class PermissionController {
  async list() {
    let response = {};
    try {
      response = await Permission.find();
      return response;
    } catch (err) {
      return err;
    }
  }
  async create(fields) {
    let response = {};
    try {
      response = await Permission.create(fields);
      return response;
    } catch (err) {
      return err;
    }
  }
  async update(fields) {
    let response = {};
    if (fields.roles != undefined) {
      let role = fields.roles;
      delete fields.roles;
      fields.$addToSet = { roles: role };
    }
    try {
      response = await Permission.updateOne({ _id: fields._id }, fields, {
        new: true,
      });
      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = PermissionController;
