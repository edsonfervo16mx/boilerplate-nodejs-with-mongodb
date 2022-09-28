const { Schema, model } = require("mongoose");
const User = require("./User");
const Organization = require("./Organization");

const tokenSchema = new Schema(
  {
    is_active: {
      type: Boolean,
      default: true,
    },
    refresh: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    organizations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Organization",
      },
    ],
    create: { type: Date },
    expiration: { type: Date },
  },
  { timestamps: true }
);

const Token = model("Token", tokenSchema, "Tokens");
module.exports = Token;
