import { Router } from 'express';
import Call from '../api/utils/Call';
import MainControllers from '../api/controllers/mainControllers';
import validate from '../api/middlewares/validate';
import auth from '../api/middlewares/validate-jwt';
import { loginSchema } from '../api/validations/UsersSchema';
import routesUsers from './resource/users';
import MainServices from '../api/services/auth/MainServices';
import routerBooks from './resource/books';

const router = Router();

const mainControllers = new MainControllers(new MainServices());

router.post('/v1/login', [validate(loginSchema)], Call(mainControllers.login.bind(mainControllers)));
router.get('/v1/auth', [auth], Call(mainControllers.authToken.bind(mainControllers)));
router.use('/v1/users', [auth], routesUsers);
router.use('/v1/books', [auth], routerBooks);

export default router;
