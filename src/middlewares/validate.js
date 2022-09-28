require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Token } = require("../models/index");

const verifyToken = async (req, res, next) => {
  try {
    const { params } = req;

    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Not access token");
    }
    let type = token.split(" ")[0];
    let string = token.split(" ")[1];
    if (type !== "Bearer") {
      throw new Error("Different token type");
    }

    await jwt.verify(string, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        throw new Error("Unauthorized");
      } else {
        if (!decoded.id) {
          throw new Error("User null");
        }

        // Verify is token exists on database
        const session = await Token.findOne({ token: string });

        if (session != undefined) {
          // segment values
          req.id = decoded.id;
          req.organization = decoded.organizations;
          req.role = decoded.roles;
          // req.token = string;

          // console.log("---");
          // console.log(req.id);
          // console.log(params.user);
          // console.log("---");

          // Verify params users with id json token
          if (Object.keys(params).length > 0) {
            if (params.user != undefined) {
              if (params.user != req.id) {
                throw new Error("Unauthorized");
              }
            }
          }
        } else {
          throw new Error("Unauthorized");
        }
        //
        next();
      }
    });
  } catch (err) {
    return res.status(401).json({
      errors: { jwt: { name: err.message, message: err.message } },
      name: "ValidationError",
      message: "User validation failed, verify token",
    });
  }
};

module.exports = verifyToken;
