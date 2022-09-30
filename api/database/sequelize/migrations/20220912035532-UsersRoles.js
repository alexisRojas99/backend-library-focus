const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('mnt_users_roles', {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        references: {
          model: 'mnt_users',
          key: 'id',
        },
      },
      id_role: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        references: {
          model: 'mnt_roles',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('mnt_users_roles');
  },
};
