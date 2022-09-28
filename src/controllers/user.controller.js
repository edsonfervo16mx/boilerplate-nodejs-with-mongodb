require("dotenv").config();
const jwt = require("jsonwebtoken");
const randtoken = require("rand-token");

const DatetimeUtils = require("../utils/datetime");
const NodeEmail = require("../utils/email");
const { User, Token } = require("../models/index");

const datetime = new DatetimeUtils();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

class UserController {
  async login(fields) {
    let response = {};
    try {
      let email = fields.email;
      let password = fields.password;
      const user_data = await User.findOne({ email: email, is_active: true });
      if (user_data.id) {
        if (password === user_data.password) {
          let id = user_data.id;
          let username = user_data.username;
          let organizations = user_data.organizations.toString();
          let roles = user_data.roles.toString();
          let create = new Date();
          let expiration = await datetime.addHoursToDate(
            create,
            JWT_EXPIRES_IN.replace("h", "")
          );
          let is_active = true;
          const dataSession = {
            id,
            email,
            username,
            organizations,
            create,
            expiration,
            is_active,
            roles,
          };
          const token = jwt.sign(dataSession, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
          });
          const refresh = randtoken.uid(256);
          const session = await Token.create({
            refresh: refresh,
            token: token,
            users: id,
            organizations: organizations,
            create: create,
            expiration: expiration,
          });
          response = {
            token,
            id,
            email,
            username,
            organizations,
            session,
          };
        }
      }
      return response;
    } catch (err) {
      console.log(err.message);
      return err;
    }
  }
  async list(organizations) {
    try {
      const response = await User.find({ organizations });
      return response;
    } catch (err) {
      return err;
    }
  }
  async get(id) {
    try {
      const response = await User.findById(id);
      return response;
    } catch (err) {
      return err;
    }
  }
  async refreshToken(id, refresh) {
    try {
      let session = await Token.findOne({ id, refresh, is_active: true });
      if (session != undefined) {
        const destroy = await Token.findByIdAndDelete(session._id.toString());
        if (destroy != undefined) {
          let user_data = await this.get(session.users);
          const new_session = await this.login({
            email: user_data.email,
            password: user_data.password,
          });
          return new_session;
        }
      }
      return session;
    } catch (err) {
      return err;
    }
  }
  async create(fields) {
    try {
      const response = await User.create(fields);
      return response;
    } catch (err) {
      // console.log(err.message);
      return err;
    }
  }
  async update(fields) {
    let response = {};
    if (fields.organizations != undefined) {
      let organization = fields.organizations;
      delete fields.organizations;
      fields.$addToSet = { organizations: organization };
    }
    try {
      response = await User.findOneAndUpdate({ _id: fields._id }, fields, {
        new: true,
      });
      return response;
    } catch (err) {
      return err;
    }
  }
  async sendEmailResetPassword(fields) {
    let response = {};
    let from = "test@caribbeandigitalgroup";
    let to = "e.ventura@caribbeandigitalgroup.com, edsonfernando16@gmail.com";
    let subject = "Testing Nodemailer";
    let template = "reset_password.html";
    try {
      const user = await User.findOne({ email: fields.email, is_active: true });
      console.log(user);
      let user_data = await this.get(user._id.toString());
      const new_session = await this.login({
        email: user_data.email,
        password: user_data.password,
      });
      // console.log(new_session);
      let params = {
        email: new_session.email,
        token: new_session.token,
      };
      const emailObj = new NodeEmail(from, to, subject, template, params);
      response = await emailObj.sendEmail();
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = UserController;
