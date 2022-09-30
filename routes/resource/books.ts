import { Router } from 'express';
import Call from '../../api/utils/Call';
// import validateRole from '../../api/utils/validate-rols';
import BookController from '../../api/controllers/BookController';
import BookServices from '../../api/services/BookServices';

const router = Router();

const bookController = new BookController(new BookServices());

router.get('/', [], Call(bookController.index.bind(bookController)));
router.get('/:id', [], Call(bookController.getBookById.bind(bookController)));

export default router;
