class DatetimeUtils {
  async addHoursToDate(objDate, intHours) {
    let numberOfMlSeconds = objDate.getTime();
    let addMlSeconds = intHours * 60 * 60000;
    let newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
    return newDateObj;
  }
}

module.exports = DatetimeUtils;
