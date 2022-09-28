const httpStatus = require("http-status");

class HttpStatusUtils {
  async status(payload) {
    try {
      if (Object.keys(payload).length === 0) {
        return httpStatus.NOT_FOUND;
      } else {
        if (payload.errors) {
          return httpStatus.BAD_REQUEST;
        }
        return httpStatus.OK;
      }
    } catch (err) {
      console.log(err.message);
      return httpStatus.BAD_REQUEST;
    }
  }
}

module.exports = HttpStatusUtils;
