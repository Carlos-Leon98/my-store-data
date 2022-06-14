const { Pool } = require('pg');

const { config } = require('../config/config');

const options = {}

if (config.isProd) {
  URI = config.dbUrl;
  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: config.isProd
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

const pool = new Pool();

module.exports = pool;
