/* eslint-disable import/no-cycle */
import { Model, DataTypes } from 'sequelize';
import DB from '../database/sequelize/DB';

class UsersRoles extends Model {
  static associate() {}
}

UsersRoles.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_users_roles',
    schema: 'public',
  },
);

export default UsersRoles;
