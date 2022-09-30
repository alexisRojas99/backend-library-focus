import { Op, Sequelize, Transaction } from 'sequelize';
import setPagination from '../helpers/AuxPagination';
import { UserServicesInterfaces, RequestQuery, RequestQueryCreateUser } from './interfaces/UserServicesInterfaces';
import { Users, Roles, UsersRoles } from '../models/index';
import RequestException from '../../handlers/RequestException';
import DB from '../database/sequelize/DB';
import encrypt from '../utils/encrypt';

type Filters = {
  [key: string]: any;
};
export default class UserServices implements UserServicesInterfaces {
  public async index(RequestQuery: RequestQuery): Promise<object> {
    const filters: Filters = {};
    let pagination: object = {};

    if (RequestQuery.page || RequestQuery.per_page) {
      pagination = setPagination(RequestQuery.page, RequestQuery.per_page);
    }

    if (RequestQuery.username !== undefined) filters.username = { [Op.like]: `%${RequestQuery.username}%` };
    if (RequestQuery.is_suspended !== undefined) filters.is_suspended = RequestQuery.is_suspended;

    const countUsers = await Users.count({
      where: filters,
    });

    const allUsers = await Users.findAll({
      attributes: ['id', 'username', 'is_suspended', 'last_login', 'created_at'],
      where: filters,
      ...pagination,
      include: {
        model: Roles,
        through: {
          attributes: [],
        },
      },
    });

    let response:
      | {
          total_rows?: number;
          page?: number;
          per_page?: number;
          body?: object;
        }
      | object[] = {};

    if (Object.keys(pagination).length > 1) {
      response.total_rows = countUsers;
      response.page = Number(RequestQuery.page ?? 1);
      response.per_page = Number(RequestQuery.per_page ?? 10);
      response.body = allUsers;
    } else {
      response = allUsers;
    }

    return response;
  }

  public async getUserById(id: number): Promise<object> {
    if (!id) throw new RequestException();

    const user = await Users.findOne({
      attributes: ['id', 'username', 'is_suspended', 'last_login', 'created_at'],
      where: { id },
      include: {
        model: Roles,
        through: {
          attributes: [],
        },
      },
    });

    return user || {};
  }

  public async createUser(dataUser: RequestQueryCreateUser): Promise<object> {
    const t = await DB.connection().transaction();

    const pwd = await encrypt(dataUser.password);

    const data = {
      firstname: dataUser.firstname,
      lastname: dataUser.lastname,
      username: dataUser.username,
      password: pwd,
    };

    const userExists = await Users.findOne({
      where: { username: dataUser.username },
    });

    if (userExists) throw new RequestException('User already exists');

    try {
      const user = (await Users.create(data, { transaction: t })) as any;
      const role = {
        id_user: user.id,
        id_role: dataUser.id_role,
      };

      const addRole = (await UsersRoles.create(role, { transaction: t })) as any;

      const response = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        is_suspended: user.is_suspended,
        last_login: user.last_login,
        created_at: user.created_at,
        role: addRole.id_role,
      };

      await t.commit();

      return response;
    } catch (err) {
      await t.rollback();
      throw new RequestException();
    }
  }
}
