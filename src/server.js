'use strict';

const Hapi = require('hapi');
const config = require('config');

const { addRoutes } = require('./routes');

const port = config.port;
const server = Hapi.server({
  port: port,
  host: 'localhost'
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
