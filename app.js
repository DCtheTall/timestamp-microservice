'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const getTimestamp = require('./get-timestamp');
const debug = require('debug');
const http = require('http');

const app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));

app.get('/:date', getTimestamp);

app.get('/', (req, res) => {
  res.render('index');
});

function normalizePort(val) {
  var port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

const port = normalizePort(process.env.PORT || 3001);

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
