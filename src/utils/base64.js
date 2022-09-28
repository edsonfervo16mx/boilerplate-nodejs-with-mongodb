class Base64Utils {
  async utf8_to_b64(str) {
    const buff = new Buffer.from(str);
    return buff.toString("base64");
  }

  async b64_to_utf8(str) {
    const buff = new Buffer.from(str, "base64");
    return buff.toString("ascii");
  }
}

module.exports = Base64Utils;
