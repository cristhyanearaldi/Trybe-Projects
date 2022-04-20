import Club from '../database/models/clubs';
import Match from '../database/models/matchs';

const leaderboardTotalGames = async (club: Club) => {
  const homeGames = await Match.count(
    { where: { homeTeam: club.id, inProgress: false } },
  );
  return homeGames;
};

const leaderboardTotalVictories = async (club: Club) => {
  const homeVictories = await Match.findAll({
    where: { homeTeam: club.id, inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });
  const homeTotalVictories = homeVictories
    .reduce((acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc), 0);
  return homeTotalVictories;
};

const leaderboardTotalDraws = async (club: Club) => {
  const homeDraws = await Match.findAll({
    where: { homeTeam: club.id, inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });
  const homeTotalDraws = homeDraws
    .reduce((acc, curr) => (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc), 0);
  return homeTotalDraws;
};

const leaderboardTotalLosses = async (club: Club) => {
  const homeLosses = await Match.findAll({
    where: { homeTeam: club.id, inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });
  const homeTotalLosses = homeLosses
    .reduce((acc, curr) => (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc), 0);
  return homeTotalLosses;
};

const leaderboardTotalPoints = async (club: Club) => {
  const victories = await leaderboardTotalVictories(club);
  const draws = await leaderboardTotalDraws(club);
  const totalPoints = (victories * 3) + draws;
  return totalPoints;
};

const leaderboardGoalsFavor = async (club: Club) => {
  const homeGoalsFavor = await Match.sum(
    'homeTeamGoals',
    { where: { homeTeam: club.id, inProgress: false } },
  );
  return homeGoalsFavor;
};

const leaderboardGoalsOwn = async (club: Club) => {
  const homeGoalsOwn = await Match.sum(
    'awayTeamGoals',
    { where: { homeTeam: club.id, inProgress: false } },
  );
  return homeGoalsOwn;
};

const leaderboardGoalsBalance = async (club: Club) => {
  const goalsBalance = await leaderboardGoalsFavor(club) - await leaderboardGoalsOwn(club);
  return goalsBalance;
};

const leaderboardEfficiency = async (club: Club) => {
  const totalPoints = await leaderboardTotalPoints(club);
  const totalGames = await leaderboardTotalGames(club);
  const efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  return efficiency;
};

export default {
  leaderboardTotalGames,
  leaderboardTotalVictories,
  leaderboardTotalDraws,
  leaderboardTotalLosses,
  leaderboardTotalPoints,
  leaderboardGoalsFavor,
  leaderboardGoalsOwn,
  leaderboardGoalsBalance,
  leaderboardEfficiency,
};

// Source of sequelize methods (Dica do maravilhoso Écio Ferraz):
// 'https://sequelize.org/v5/manual/models-usage.html'
