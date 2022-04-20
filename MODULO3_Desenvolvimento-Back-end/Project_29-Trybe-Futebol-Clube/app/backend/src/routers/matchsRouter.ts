import { Router } from 'express';
import matchsController from '../controllers/matchsController';
import { validateMatchTeams, validateMatchClubs } from '../middlewares/matchValidation';

const router = Router();

router.get('/', matchsController.getAll);
router.post('/', validateMatchTeams, validateMatchClubs, matchsController.create);
router.patch('/:id', matchsController.updateMatchResult);
router.patch('/:id/finish', matchsController.updateFinishedMatchs);

export default router;
