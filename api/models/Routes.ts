/* eslint-disable lines-between-class-members */
/* eslint-disable import/no-cycle */
import { Model, DataTypes } from 'sequelize';
import DB from '../database/sequelize/DB';
import { Roles } from './index';

class Ruta extends Model {
  id: number | undefined;
  nombre: string | undefined;
  descripcion: string | undefined;
  url: string | undefined;
  icon: string | undefined;

  static associate() {
    this.belongsToMany(Roles, {
      through: 'Permissions',
      foreignKey: 'id_ruta',
      otherKey: 'id_rol',
    });
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      url: this.url,
      icon: this.icon,
    };
  }
}

Ruta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'mnt_ruta',
    schema: 'public',
  },
);

export default Ruta;
