const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');

const option = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  option.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, option);

setupModels(sequelize);

module.exports = sequelize;
