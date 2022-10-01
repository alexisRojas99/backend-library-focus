import { Router } from 'express';
import Call from '../../api/utils/Call';
import validateRole from '../../api/utils/validate-rols';
import BookController from '../../api/controllers/BookController';
import BookServices from '../../api/services/BookServices';
import validate from '../../api/middlewares/validate';
import { createNewBookSchema } from '../../api/validations/BookSchema';

const router = Router();

const bookController = new BookController(new BookServices());

router.get('/', [], Call(bookController.index.bind(bookController)));
router.get('/history', [], Call(bookController.getHistory.bind(bookController)));
router.post('/history', [], Call(bookController.createHistoryBook.bind(bookController)));
router.get('/:id', [], Call(bookController.getBookById.bind(bookController)));
router.post('/', [validate(createNewBookSchema)], Call(bookController.createBook.bind(bookController)));

export default router;
