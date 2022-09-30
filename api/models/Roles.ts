/* eslint-disable import/no-cycle */
import { Model, DataTypes } from 'sequelize';
import DB from '../database/sequelize/DB';
import { Users, Routes, UsersRoles } from './index';

class Roles extends Model {
  static associate() {
    this.belongsToMany(Users, {
      through: UsersRoles,
      foreignKey: 'id_role',
      otherKey: 'id_user',
    });

    this.belongsToMany(Routes, {
      through: 'Permissions',
      foreignKey: 'id_role',
      otherKey: 'id_route',
    });
  }
}

Roles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(250),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_roles',
    schema: 'public',
  },
);

export default Roles;
