import { Request, Response, NextFunction } from 'express';
import leaderboardsService from '../service/leaderboardsService';
import StatusCode from '../enums/StatusCode';

const getAllHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboardHome = await leaderboardsService.getAllHome();
    res.status(StatusCode.HTTP_OK).json(leaderboardHome);
  } catch (error) {
    next(error);
  }
};

const getAllAway = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboardAway = await leaderboardsService.getAllAway();
    res.status(StatusCode.HTTP_OK).json(leaderboardAway);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllHome,
  getAllAway,
};
