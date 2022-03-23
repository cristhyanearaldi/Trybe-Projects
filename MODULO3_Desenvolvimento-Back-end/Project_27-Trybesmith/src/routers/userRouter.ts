import { Router } from 'express';
import userController from '../controllers/userController';
import validateUser from '../middlewares/userValidation';

const router = Router();

router.post('/', validateUser, userController.create);

export default router;