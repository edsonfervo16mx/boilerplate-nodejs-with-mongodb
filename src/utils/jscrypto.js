require("dotenv").config();
const Base64Utils = require("../utils/base64");
const base = new Base64Utils();
const CryptoJS = require("crypto-js");

const PASSWORD_CRYPTO = process.env.PASSWORD_CRYPTO;
const SALT_CRYPTO = process.env.SALT_CRYPTO;
const KEYSIZE = process.env.KEYSIZE;
const ITERATIONS = process.env.ITERATIONS;

class JsCrytoUtils {
  async encrypt(str) {
    let bytes = CryptoJS.PBKDF2(PASSWORD_CRYPTO, SALT_CRYPTO, {
      keySize: KEYSIZE,
      iterations: ITERATIONS,
    });
    let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
    let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

    let ciphertext = CryptoJS.AES.encrypt(str, key, { iv });
    return ciphertext.toString();
  }

  async decrypt(str) {
    let bytes = CryptoJS.PBKDF2(PASSWORD_CRYPTO, SALT_CRYPTO, {
      keySize: KEYSIZE,
      iterations: ITERATIONS,
    });
    let iv = CryptoJS.enc.Hex.parse(bytes.toString().slice(0, 32));
    let key = CryptoJS.enc.Hex.parse(bytes.toString().slice(32, 96));

    let ciphertext = CryptoJS.AES.decrypt(str, key, { iv });
    let plane = ciphertext.toString(CryptoJS.enc.Utf8);
    return plane;
  }
}

module.exports = JsCrytoUtils;
