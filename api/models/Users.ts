/* eslint-disable import/no-cycle */
import { Model, DataTypes, Sequelize } from 'sequelize';
import DB from '../database/sequelize/DB';
import { Roles, UsersRoles } from './index';

class Users extends Model {
  static associate() {
    this.belongsToMany(Roles, {
      through: UsersRoles,
      foreignKey: 'id_user',
      otherKey: 'id_role',
    });
  }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(250),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
    is_suspended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_users',
    schema: 'public',
  },
);

export default Users;
