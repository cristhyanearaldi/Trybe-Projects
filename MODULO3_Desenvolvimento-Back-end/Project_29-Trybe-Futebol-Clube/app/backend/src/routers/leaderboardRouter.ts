import { Router } from 'express';
import leaderboardsControllers from '../controllers/leaderboardsControllers';

const router = Router();

router.get('/home', leaderboardsControllers.getAllHome);
router.get('/away', leaderboardsControllers.getAllAway);

export default router;
