import { Sequelize } from 'sequelize';
import dbConfig from './config/dbConfig';

type ObjectConfig = {
  [key: string]: any;
}

export default class DB {
  static connection(connection = null) {
    let config: ObjectConfig = {};
    if (connection) config = dbConfig.connections[connection];
    else config = dbConfig.connections;

    return new Sequelize(
      config.options.db_name,
      config.options.db_username,
      config.options.db_password,
      {
        host: config.options.db_host,
        port: config.options.db_port,
        dialect: config.motor,
        logging: false,
      },
    );
  }

  static async testing(connection = null) {
    try {
      await this.connection(connection).authenticate();
      return true;
    } catch (e) {
      return false;
    }
  }
}
