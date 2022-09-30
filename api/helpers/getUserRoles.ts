import { Users, Roles } from '../models/index';
import { User } from '../models/interfaces/ModelsInterfaces';

export default class GetUserRoles {
  static async index(userId: number) {
    const user: User = await Users.findByPk(userId, {
      include: {
        model: Roles,
      },
    }) as any;

    const roles = user?.Roles?.map((role: any) => role?.name);

    return roles;
  }
}
