import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import matchsService from '../service/matchsService';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const { inProgress } = req.query;
  try {
    if (!inProgress) {
      const matchs = await matchsService.getAll();
      return res.status(StatusCode.HTTP_OK).json(matchs);
    }
    const matchsInProgress = matchsService.getAllInProgress(inProgress as string);
    return res.status(StatusCode.HTTP_OK).json(matchsInProgress);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  try {
    const newMatch = await matchsService.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    return res.status(StatusCode.HTTP_CREATED).json(newMatch);
  } catch (error) {
    next(error);
  }
};

const updateFinishedMatchs = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await matchsService.updateFinishedMatchs(+id);
    return res.status(StatusCode.HTTP_OK).json({ message: 'Finished Match!' });
  } catch (error) {
    next(error);
  }
};

const updateMatchResult = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { homeTeamGoals, awayTeamGoals } = req.body;
  try {
    await matchsService.updateMatchResult(+id, { homeTeamGoals, awayTeamGoals });
    res.status(StatusCode.HTTP_OK).json({ message: 'Updated Match!' });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  create,
  updateFinishedMatchs,
  updateMatchResult,
};
