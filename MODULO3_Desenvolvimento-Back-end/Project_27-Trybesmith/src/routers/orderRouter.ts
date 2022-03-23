import { Router } from 'express';
import orderController from '../controllers/orderController';
import { verifyAuth } from '../middlewares/authMiddleware';
import validateOrder from '../middlewares/orderValidation';

const router = Router();

router.post('/', verifyAuth, validateOrder, orderController.create);

export default router;