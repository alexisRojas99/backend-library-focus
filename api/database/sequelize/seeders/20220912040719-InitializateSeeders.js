const bycript = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const t = await queryInterface.sequelize.transaction();
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      const salt = await bycript.genSaltSync();
      const [user] = await queryInterface.bulkInsert(
        'mnt_users',
        [
          {
            username: process.env.EMAIL_SEED,
            password: bycript.hashSync(process.env.PASSWORD_SEED, salt),
          },
        ],
        {
          returning: true,
          transaction: t,
        },
      );

      const roles = await queryInterface.bulkInsert(
        'mnt_roles',
        [
          // Roles de super administrador
          {
            name: 'ROLE_SUPER_ADMIN',
            description: 'Super Administrador',
          },
          // Roles de administrador
          {
            name: 'ROLE_ADMIN',
            description: 'Administrador',
          },
          {
            name: 'ROLE_ADMIN_DASHBOARD',
            description: 'Administrador Dashboard',
          },
          {
            name: 'ROLE_ADMIN_USER_LIST',
            description: 'Administrador Lista de Usuarios',
          },
          {
            name: 'ROLE_ADMIN_USER_CREATE',
            description: 'Administrador Crear Usuarios',
          },
          {
            name: 'ROLE_ADMIN_USER_DELETE',
            description: 'Administrador Eliminar Usuarios',
          },
          {
            name: 'ROLE_ADMIN_USER_UPDATE',
            description: 'Administrador Actualizar Usuarios',
          },
          // Roles de rol
          {
            name: 'ROLE_ROLE_LIST',
            description: 'Listar roles',
          },
          {
            name: 'ROLE_ROLE_CREATE',
            description: 'Crear roles',
          },
          {
            name: 'ROLE_ROLE_DELETE',
            description: 'Eliminar roles',
          },
          {
            name: 'ROLE_ROLE_UPDATE',
            description: 'Actualizar roles',
          },
          // Roles de usuario
          {
            name: 'ROLE_USER_LIST',
            description: 'Usuario List',
          },
          {
            name: 'ROLE_USER_CREATE',
            description: 'Usuario Create',
          },
          {
            name: 'ROLE_USER_UPDATE',
            description: 'Usuario Update',
          },
          {
            name: 'ROLE_USER_DELETE',
            description: 'Usuario Delete',
          },
          // Roles de permisos
          {
            name: 'ROLE_PERMISSION_LIST',
            description: 'Permiso List',
          },
          {
            name: 'ROLE_PERMISSION_CREATE',
            description: 'Permiso Create',
          },
          {
            name: 'ROLE_PERMISSION_DELETE',
            description: 'Permiso Delete',
          },
          {
            name: 'ROLE_PERMISSION_UPDATE',
            description: 'Permiso Update',
          },
          // Roles de ruta
          {
            name: 'ROLE_ROUTE_LIST',
            description: 'Ruta List',
          },
          {
            name: 'ROLE_ROUTE_CREATE',
            description: 'Ruta Create',
          },
          {
            name: 'ROLE_ROUTE_UPDATE',
            description: 'Ruta Update',
          },
          {
            name: 'ROLE_ROUTE_DELETE',
            description: 'Ruta Delete',
          },
        ],
        {
          returning: true,
          transaction: t,
        },
      );

      const routes = await queryInterface.bulkInsert(
        'mnt_routes',
        [
          {
            name: 'Dashboard',
            description: 'Dashboard principal',
            url: '/',
            icon: 'fa fa-tachometer-alt',
          },
          {
            name: 'roles',
            description: 'Listar Roles',
            url: '/roles',
            icon: 'fa fa-user-tag',
          },
          {
            name: 'roles',
            description: 'Crear Roles',
            url: '/roles/create',
            icon: 'fa fa-user-tag',
          },
          {
            name: 'rutas',
            description: 'Listar Rutas',
            url: '/rutas',
            icon: 'fa fa-route',
          },
          {
            name: 'rutas',
            description: 'Crear Rutas',
            url: '/rutas/create',
            icon: 'fa fa-route',
          },
          {
            name: 'rutas',
            description: 'Actualizar Rutas',
            url: '/rutas/update',
            icon: 'fa fa-route',
          },
          {
            name: 'usuarios',
            description: 'Listar Usuarios',
            url: '/usuarios',
            icon: 'fa fa-user',
          },
          {
            name: 'usuarios',
            description: 'Crear Usuarios',
            url: '/usuarios/create',
            icon: 'fa fa-user',
          },
          {
            name: 'usuarios',
            description: 'Actualizar Usuarios',
            url: '/usuarios/update',
            icon: 'fa fa-user',
          },
        ],
        {
          returning: true,
          transaction: t,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_permissions',
        roles.map((rol) => {
          const permission = {
            id_role: rol.id,
            id_route: routes[0].id,
          };
          return permission;
        }),
        {
          returning: true,
          transaction: t,
        },
      );

      await queryInterface.bulkInsert(
        'mnt_users_roles',
        [
          {
            id_user: user.id,
            id_role: roles[0].id,
          },
        ],
        {
          returning: true,
          transaction: t,
        },
      );

      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await Promise.all([
      queryInterface.bulkDelete('mnt_users_roles', null, {}),
      queryInterface.bulkDelete('mnt_permissions', null, {}),
      queryInterface.bulkDelete('mnt_users', null, {}),
      queryInterface.bulkDelete('mnt_roles', null, {}),
      queryInterface.bulkDelete('mnt_routes', null, {}),
    ]);
  },
};
