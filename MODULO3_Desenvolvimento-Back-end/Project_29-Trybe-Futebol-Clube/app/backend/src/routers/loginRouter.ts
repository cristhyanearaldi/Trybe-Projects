import { Router } from 'express';
import { verifyAuth } from '../middlewares/authMiddleware';
import loginController from '../controllers/loginController';
import { validateLogin, validateUser } from '../middlewares/loginValidation';

const router = Router();

router.post('/', validateLogin, validateUser, loginController.login);
router.get('/validate', verifyAuth);

export default router;
