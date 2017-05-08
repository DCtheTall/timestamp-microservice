'use strict';

const express = require('express');
const moment = require('moment');
const debug = require('debug');
const http = require('http');

const app = express();

function testForNaturalDate(dateString) {
  const splitDateString = dateString.split(' ');
  return (
    splitDateString.length === 3
    && isNaN(Number(splitDateString[0]))
    && splitDateString[1].includes(',')
    && !isNaN(Number(splitDateString[1].slice(0, -1)))
    && !isNaN(Number(splitDateString[2]))
  );
}

app.get('/:date', (req, res) => {
  const { date } = req.params;

  let unix;
  let natural;
  if (!isNaN(Number(date))) {
    unix = Number(date);
    natural = moment.unix(date).format('MMMM D, YYYY');
    res.json({ unix, natural });
  } else if (testForNaturalDate(date)) {
    natural = moment(date).format('MMMM D, YYYY');
    unix = moment(date).unix();
    res.json({ unix, natural });
  } else {
    res.json({ unix: null, natural: null });
  }
});

function normalizePort(val) {
  var port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

const port = normalizePort(process.env.PORT || 3000);

function onListen() {
  console.log(`Listening on port ${port}`);
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

function onError(err) {
  if (err.syscall !== 'listen') throw err;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (err.code) {
    case 'EACCESS':
      console.log(`${bind} requires elevated privilege`);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      break;
    default:
      throw err;
  }
}

const server = http.createServer(app);
server.listen(port);
server.on('listening', onListen);
server.on('error', onError);
