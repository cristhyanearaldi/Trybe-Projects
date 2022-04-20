import { Request, Response, NextFunction } from 'express';
import StatusCode from '../enums/StatusCode';
import clubsService from '../service/clubsService';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clubs = await clubsService.getAll();
    return res.status(StatusCode.HTTP_OK).json(clubs);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const club = await clubsService.getById({ id });
    return res.status(StatusCode.HTTP_OK).json(club);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
};
