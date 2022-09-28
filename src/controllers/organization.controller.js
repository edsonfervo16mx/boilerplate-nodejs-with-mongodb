const { Organization } = require("../models/index");

class OrganizationController {
  async list() {
    let response = {};
    try {
      response = await Organization.find();
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  async create(fields) {
    let response = {};
    try {
      response = await Organization.create(fields);
      return response;
    } catch (err) {
      return err;
    }
  }
  async update(fields) {
    let response = {};
    if (fields.users != undefined) {
      let user = fields.users;
      delete fields.users;
      fields.$addToSet = { users: user };
    }
    try {
      response = await Organization.updateOne({ _id: fields._id }, fields);
      return response;
    } catch (err) {
      return err;
    }
  }
}

module.exports = OrganizationController;
