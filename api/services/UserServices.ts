import { Op } from 'sequelize';
import setPagination from '../helpers/AuxPagination';
import { UserServicesInterfaces, RequestQuery } from './interfaces/UserServicesInterfaces';
import { Users, Roles } from '../models/index';
import RequestException from '../../handlers/RequestException';

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

    let response: {
      total_rows?: number;
      page?: number;
      per_page?: number;
      body?: object;
    } | object[] = {};

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
}
