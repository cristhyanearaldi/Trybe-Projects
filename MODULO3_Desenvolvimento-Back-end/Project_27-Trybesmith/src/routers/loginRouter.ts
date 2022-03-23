import { Router } from 'express';
import loginController from '../controllers/loginController';
import validateLogin from '../middlewares/loginValidation';

const router = Router();

router.post('/', validateLogin, loginController.login);

export default router;