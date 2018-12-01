'use strict';

const Hapi = require('hapi');
const config = require('config');

const { addRoutes } = require('./routes');

const port = +process.env.PORT || config.port;
const server = Hapi.server({
  port: port,
  host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
});

const init = async () => {
  addRoutes(server);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
