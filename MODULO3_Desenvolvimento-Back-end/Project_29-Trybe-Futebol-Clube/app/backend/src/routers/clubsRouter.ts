import { Router } from 'express';
import clubsController from '../controllers/clubsController';

const router = Router();

router.get('/', clubsController.getAll);
router.get('/:id', clubsController.getById);

export default router;
