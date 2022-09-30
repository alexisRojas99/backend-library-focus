/* eslint-disable import/no-cycle */
import { Model, DataTypes } from 'sequelize';
import DB from '../database/sequelize/DB';

class Permisos extends Model {
  static associate() {}
}

Permisos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_ruta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_permisos',
    schema: 'public',
  },
);

export default Permisos;
