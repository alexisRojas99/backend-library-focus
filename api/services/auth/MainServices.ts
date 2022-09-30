import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import { Users } from '../../models/index';
import { HttpCode } from '../../../configs/HttpCode';
import RequestException from '../../../handlers/RequestException';
import GetUserRoles from '../../helpers/getUserRoles';
import { MainServicesInterfaces, Login, UserToken } from '../interfaces/MainServicesInterfaces';
import { User } from '../../models/interfaces/ModelsInterfaces';
import generateJWT from '../../utils/generate-jwt';
import BadRequestException from '../../../handlers/BadRequestException';

export default class MainServices implements MainServicesInterfaces {
  public async login(login: Login): Promise<object> {
    const user: User = (await Users.findOne({
      where: {
        username: login.username,
      },
      attributes: ['id', 'username', 'password', 'is_suspended', 'last_login', 'created_at'],
    })) as any;

    if (!user) throw new RequestException('Credenciales incorrectas', 'UNAUTHORIZED', HttpCode.HTTP_UNAUTHORIZED);

    if (user?.is_suspended) throw new RequestException('Usuario suspendido', 'UNAUTHORIZED', HttpCode.HTTP_UNAUTHORIZED);

    const validatePassword = await bcrypt.compare(login.password, user?.password);
    if (!validatePassword) throw new RequestException('Credenciales incorrectas', 'UNAUTHORIZED', HttpCode.HTTP_UNAUTHORIZED);

    const roles = await GetUserRoles.index(user?.id);

    const payload = {
      user: {
        id: user?.id,
        username: user?.username,
        is_suspended: user?.is_suspended,
        roles,
      },
    };

    const token = await generateJWT(payload);

    await user.update({
      last_login: dayjs().format(),
    });

    return {
      token,
    };
  }

  public async authToken(user: UserToken): Promise<object> {
    const getDataUser = user;

    return getDataUser;
  }
}
