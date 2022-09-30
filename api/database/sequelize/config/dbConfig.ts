const config = {
  connections: {
    motor: process.env.DB_MOTOR || 'postgres', // mysql, sqlite, mariadb, postgres, mssql
    options: {
      db_host: process.env.DB_HOST || 'localhost',
      db_port: process.env.DB_PORT || 5432,
      db_name: process.env.DB_DATABASE || 'node_sequelize_db',
      db_username: process.env.DB_USERNAME || 'node_sequelize',
      db_password: process.env.DB_PASSWORD || 'node_sequelize',
    },
  },
};

export default config;
