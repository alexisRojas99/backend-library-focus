import { Model, DataTypes } from 'sequelize';
import { Books, Users } from './index';
import DB from '../database/sequelize/DB';

class BooksRecords extends Model {
  static associate() {
    this.belongsTo(Books, {
      foreignKey: 'isbn',
    });
    this.belongsTo(Users, {
      foreignKey: 'id_user',
    });
  }
}

BooksRecords.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'id_user',
        key: 'id',
      },
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      references: {
        model: 'isbn',
        key: 'isbn',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    movement_type: {
      type: DataTypes.ENUM('entry', 'egress'),
    },
    movement_date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
    sequelize: DB.connection(),
    tableName: 'books_records',
    schema: 'public',
    indexes: [
      {
        name: 'id_user',
        unique: true,
        fields: [{ name: 'id' }],
      },
      {
        name: 'isbn',
        unique: true,
        fields: [{ name: 'isbn' }],
      },
    ],
  },
);

export default BooksRecords;
