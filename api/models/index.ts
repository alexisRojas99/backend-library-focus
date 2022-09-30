/* eslint-disable import/no-cycle */
import Users from './Users';
import Roles from './Roles';
import Routes from './Routes';
import Permissions from './Permissions';
import UsersRoles from './UsersRoles';
import Books from './Books';
import BooksRecords from './BooksRecords';

Users.associate();
Roles.associate();
Routes.associate();
Permissions.associate();
UsersRoles.associate();
Books.associate();
BooksRecords.associate();
// eslint-disable-next-line import/prefer-default-export
export {
  Users, Roles, Routes, Permissions, UsersRoles, Books, BooksRecords,
};
