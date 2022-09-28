const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  is_active: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Role = model("Role", roleSchema, "Roles");
module.exports = Role;
