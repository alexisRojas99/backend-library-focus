const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('mnt_routes', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      description: {
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('mnt_routes');
  },
};
