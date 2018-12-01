'use strict';

const config = require('config');
const Sequelize = require('sequelize');

const databaseUrl = config.databaseUrl;
const Op = Sequelize.Op;
const sequelize = new Sequelize(databaseUrl, {
  underscoredAll: true,
  operatorsAliases: Op
});

const Professor = sequelize.define(
  'professores',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastSeen: {
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true
  }
);

function resetDatabase() {
  return Professor.truncate();
}

function syncDatabase() {
  return Professor.sync({ force: true });
}

module.exports = {
  resetDatabase,
  syncDatabase,
  Professor
};
