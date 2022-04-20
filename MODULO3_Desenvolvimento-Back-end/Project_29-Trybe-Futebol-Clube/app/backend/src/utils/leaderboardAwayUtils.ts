import Club from '../database/models/clubs';
import Match from '../database/models/matchs';

const leaderboardTotalGames = async (club: Club) => {
  const awayGames = await Match.count(
    { where: { awayTeam: club.id, inProgress: false } },
  );
  return awayGames;
};

const leaderboardTotalVictories = async (club: Club) => {
  const awayVictories = await Match.findAll({
    where: { awayTeam: club.id, inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });
  const awayTotalVictories = awayVictories
    .reduce((acc, curr) => (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc), 0);

  return awayTotalVictories;
};

const leaderboardTotalDraws = async (club: Club) => {
  const awayDraws = await Match.findAll({
    where: { awayTeam: club.id, inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });
  const awayTotalDraws = awayDraws
    .reduce((acc, curr) => (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc), 0);

  return awayTotalDraws;
};

const leaderboardTotalLosses = async (club: Club) => {
  const awayLosses = await Match.findAll({
    where: { awayTeam: club.id, inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });
  const awayTotalLosses = awayLosses
    .reduce((acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc), 0);

  return awayTotalLosses;
};

const leaderboardTotalPoints = async (club: Club) => {
  const victories = await leaderboardTotalVictories(club);
  const draws = await leaderboardTotalDraws(club);
  const totalPoints = (victories * 3) + draws;
  return totalPoints;
};

const leaderboardGoalsFavor = async (club: Club) => {
  const awayGoalsFavor = await Match.sum(
    'awayTeamGoals',
    { where: { awayTeam: club.id, inProgress: false } },
  );
  return awayGoalsFavor;
};

const leaderboardGoalsOwn = async (club: Club) => {
  const awayGoalsOwn = await Match.sum(
    'homeTeamGoals',
    { where: { awayTeam: club.id, inProgress: false } },
  );
  return awayGoalsOwn;
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
