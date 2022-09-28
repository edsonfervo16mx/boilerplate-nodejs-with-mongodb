const { Schema, model } = require("mongoose");
const User = require("./User");

const organizationSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    logo_img: {
      type: String,
      default: "https://picsum.photos/200/300",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Organization = model("Organization", organizationSchema, "Organizations");
module.exports = Organization;
