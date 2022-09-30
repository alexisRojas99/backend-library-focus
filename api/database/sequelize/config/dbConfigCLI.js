require('dotenv').config();

module.exports = {
  development: {
    dialect: process.env.DB_MOTOR || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'node_sequelize_db',
    username: process.env.DB_USERNAME || 'node_sequelize',
    password: process.env.DB_PASSWORD || 'node_sequelize',
  },
};
