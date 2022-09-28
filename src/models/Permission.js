const { Schema, model } = require("mongoose");

const permissionSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: true,
    },
    write: {
      type: Boolean,
      default: true,
    },
    create: {
      type: Boolean,
      default: true,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true }
);

const Permission = model("Permission", permissionSchema, "Permissions");
module.exports = Permission;
