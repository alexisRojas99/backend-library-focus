const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('mnt_permissions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        references: {
          model: 'mnt_roles',
          key: 'id',
        },
      },
      id_route: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        references: {
          model: 'mnt_routes',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('mnt_permissions');
  },
};
