import { Model, DataTypes } from 'sequelize';
import { BooksRecords } from './index';
import DB from '../database/sequelize/DB';

class Books extends Model {
  static associate() {
    this.hasMany(BooksRecords, {
      foreignKey: 'isbn',
    });
  }
}

Books.init(
  {
    isbn: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
    },

    author: {
      type: DataTypes.STRING,
    },

    published_year: {
      type: DataTypes.INTEGER,
    },

    genre: {
      type: DataTypes.STRING,
    },

    stock: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: false,

    sequelize: DB.connection(),

    tableName: 'books',

    schema: 'public',
  },
);

export default Books;
