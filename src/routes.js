'use strict';

const R = require('ramda');
const { Professor } = require('./models');
const Boom = require('boom');

const index = async (request, h) => {
  const professores = await Professor.findAll({
    attributes: ['id', 'name', 'email']
  });
  return { professores: professores };
};

const show = async (request, h) => {
  try {
    const id = request.params.id;
    const professor = await Professor.findById(id, {
      attributes: ['id', 'name', 'email']
    });

    return { professor: professor };
  } catch (e) {
    return Boom.notFound(`Professor ${id} não encontrado > ${e}`);
  }
};

const create = async (request, h) => {
  try {
    const attributes = {
      name: request.payload.professor.name,
      email: request.payload.professor.email,
      lastSeen: request.payload.professor.lastSeen
    };
    const professor = await Professor.create(attributes);

    return { professor: professor };
  } catch (e) {
    console.log(e);
    return Boom.badImplementation();
  }
};

const update = async (request, h) => {
  try {
    const professor = await Professor.findById(request.params.id);

    const attributes = R.pick(
      ['name', 'email', 'lastSeen'],
      request.payload.professor
    );

    Object.assign(professor, attributes);
    await professor.save();

    return { professor: professor };
  } catch (e) {
    return;
  }
};

const destroy = async (request, h) => {
  try {
    const professor = await Professor.findById(request.params.id);

    await professor.destroy();

    return {};
  } catch (e) {
    return;
  }
};

const addRoutes = server => {
  server.route({
    method: 'GET',
    path: '/professores',
    handler: index
  });
  server.route({
    method: 'GET',
    path: '/professores/{id}',
    handler: show
  });
  server.route({
    method: 'POST',
    path: '/professores',
    handler: create
  });
  server.route({
    method: ['PUT'],
    path: '/professores/{id}',
    handler: update
  });
  server.route({
    method: ['DELETE'],
    path: '/professores/{id}',
    handler: destroy
  });
};

module.exports = {
  addRoutes
};
