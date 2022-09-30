import { Router } from 'express';
import UserController from '../../api/controllers/UserController';
import Call from '../../api/utils/Call';
import UserServices from '../../api/services/UserServices';
// import validateRole from '../../api/utils/validate-rols';

const router = Router();

const userController = new UserController(new UserServices());

router.get('/', [], Call(userController.index.bind(userController)));
router.get('/:id', [], Call(userController.getUserById.bind(userController)));

export default router;
