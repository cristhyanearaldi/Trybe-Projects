import Club from '../database/models/clubs';
import Match from '../database/models/matchs';
import { IMatch, IMatchGoals } from '../interfaces/Match';

const getAll = async () => {
  const matchs = Match.findAll({
    include: [
      { model: Club, as: 'homeClub', attributes: ['clubName'] },
      { model: Club, as: 'awayClub', attributes: ['clubName'] },
    ],
  });
  return matchs;
};

const getAllInProgress = async (inProgress: string) => {
  let where = {};
  if (inProgress === 'false') {
    where = { inProgress: false };
  } else {
    where = { inProgress: true };
  }

  const matchsInProgress = await Match.findAll({
    where,
    include: [
      { model: Club, as: 'homeClub', attributes: ['clubName'] },
      { model: Club, as: 'awayClub', attributes: ['clubName'] },
    ],
  });
  return matchsInProgress;
};

const create = async ({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: IMatch) => {
  const newMatch = await Match.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
  });
  return newMatch;
};

const updateFinishedMatchs = async (id: number) => {
  await Match.update(
    { inProgress: false },
    { where: { id } },
  );
};

const updateMatchResult = async (id: number, { homeTeamGoals, awayTeamGoals }: IMatchGoals) => {
  await Match.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );
};

export default {
  getAll,
  getAllInProgress,
  create,
  updateFinishedMatchs,
  updateMatchResult,
};
