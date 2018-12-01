'use strict';

const config = require('config');
const Sequelize = require('sequelize');
const pg = require('pg');
pg.defaults.ssl = true;

const databaseUrl = config.databaseUrl;
const Op = Sequelize.Op;
const sequelize = new Sequelize(databaseUrl, {
  underscoredAll: true,
  operatorsAliases: Op,
  ssl: true
});

const Professor = sequelize.define(
  'professor',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastseen: {
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: false
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
