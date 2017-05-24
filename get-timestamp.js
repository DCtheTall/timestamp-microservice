'use strict';

const moment = require('moment');

/**
 * testForNaturalDate
 * @param {String} dateString testing this string
 * @returns {Boolean} is natural date
 */
function testForNaturalDate(dateString) {
  const splitDateString = dateString.split(' ');
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    splitDateString.length === 3
    && months.includes(splitDateString[0])
    && splitDateString[1].includes(',')
    && !isNaN(Number(splitDateString[1].slice(0, -1)))
    && !isNaN(Number(splitDateString[2]))
  );
}

/**
 * timestamp
 * @param {Express.Request} req the request
 * @param {Express.Response} res the response
 * @returns {undefined}
 */
function getTimestamp(req, res) {
  const { date } = req.params;

  let unix;
  let natural;
  if (!isNaN(Number(date))) {
    unix = Number(date);
    natural = moment.unix(date).format('MMMM D, YYYY');
    res.json({ unix, natural });
  } else if (testForNaturalDate(date)) {
    try {
      natural = moment(date).format('MMMM D, YYYY');
      unix = moment(date).unix();
      res.json({ unix, natural });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    res.json({ unix: null, natural: null });
  }
}

module.exports = getTimestamp;
