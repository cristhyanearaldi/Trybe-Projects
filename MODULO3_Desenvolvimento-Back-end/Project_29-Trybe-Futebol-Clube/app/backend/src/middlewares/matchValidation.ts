import { Request, Response, NextFunction } from 'express';
import Club from '../database/models/clubs';
import StatusCode from '../enums/StatusCode';

const validateMatchTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res
      .status(StatusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  return next();
};

const validateMatchClubs = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const existingHomeTeam = await Club.findByPk(homeTeam);
  const existingAwayTeam = await Club.findByPk(awayTeam);

  if (!existingHomeTeam || !existingAwayTeam) {
    return res
      .status(StatusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'There is no team with such id!' });
  }
  return next();
};

export {
  validateMatchTeams,
  validateMatchClubs,
};
