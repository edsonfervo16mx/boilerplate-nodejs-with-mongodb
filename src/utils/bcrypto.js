require("dotenv").config();
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = Number(process.env.SALT_BCRYPT);

class CryptoUtils {
  async encrypt(str) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(str, salt);
    return hash;
  }
}

module.exports = CryptoUtils;
