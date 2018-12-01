'use strict';

const R = require('ramda');
const { Professor } = require('./models');
const Boom = require('boom');

const index = async (request, h) => {
  const professores = await Professor.findAll({
    attributes: ['name', 'email', 'lastseen']
  });
  return { professores: professores };
};

const show = async (request, h) => {
  const id = request.params.id.split('-').join(' ');
  const professor = await Professor.findById(id, {
    attributes: ['name', 'email', 'lastseen']
  });

  if (professor) {
    return { professor: professor };
  } else {
    return Boom.notFound(`Professor ${id} não encontrado`);
  }
};

const create = async (request, h) => {
  const attributes = {
    name: request.payload.professor.name,
    email: request.payload.professor.email,
    lastseen: request.payload.professor.lastseen
  };

  const professor = await Professor.create(attributes);

  if (professor) {
    return { professor: professor };
  } else {
    return { professor: professor };
  }
};

const update = async (request, h) => {
  try {
    const id = request.params.id.split('-').join(' ');
    const professor = await Professor.findById(id);

    const attributes = R.pick(
      ['name', 'email', 'lastseen'],
      request.payload.professor
    );

    Object.assign(professor, attributes);
    await professor.save();

    return { professor: professor };
  } catch (e) {
    return `Error > ${e}`;
  }
};

const destroy = async (request, h) => {
  try {
    const professor = await Professor.findById(request.params.id);

    await professor.destroy();

    return {};
  } catch (e) {
    return `Error > ${e}`;
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
