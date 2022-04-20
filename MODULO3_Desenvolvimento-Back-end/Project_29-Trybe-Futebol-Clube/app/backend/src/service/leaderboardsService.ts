import Club from '../database/models/clubs';
import ILeaderboard from '../interfaces/Leaderboard';
import leaderboardHomeUtils from '../utils/leaderboardHomeUtils';
import leaderboardAwayUtils from '../utils/leaderboardAwayUtils';

const teamRanking = (leaderboard: ILeaderboard[]) => {
  leaderboard.sort((teamA, teamB) => {
    if (teamA.totalPoints < teamB.totalPoints) return 1;
    if (teamA.totalPoints > teamB.totalPoints) return -1;
    if (teamA.totalVictories < teamB.totalVictories) return 1;
    if (teamA.totalVictories > teamB.totalVictories) return -1;
    if (teamA.goalsBalance < teamB.goalsBalance) return 1;
    if (teamA.goalsBalance > teamB.goalsBalance) return -1;
    if (teamA.goalsFavor < teamB.goalsFavor) return 1;
    if (teamA.goalsFavor > teamB.goalsFavor) return -1;
    if (teamA.goalsOwn < teamB.goalsOwn) return 1;
    if (teamA.goalsOwn > teamB.goalsOwn) return -1;
    return 0;
  });
  return leaderboard;
};

const getAllHome = async () => {
  const clubs = await Club.findAll();

  const leaderboardHome = await Promise.all((clubs).map(async (club) => ({
    name: club.clubName,
    totalPoints: await leaderboardHomeUtils.leaderboardTotalPoints(club),
    totalGames: await leaderboardHomeUtils.leaderboardTotalGames(club),
    totalVictories: await leaderboardHomeUtils.leaderboardTotalVictories(club),
    totalDraws: await leaderboardHomeUtils.leaderboardTotalDraws(club),
    totalLosses: await leaderboardHomeUtils.leaderboardTotalLosses(club),
    goalsFavor: await leaderboardHomeUtils.leaderboardGoalsFavor(club),
    goalsOwn: await leaderboardHomeUtils.leaderboardGoalsOwn(club),
    goalsBalance: await leaderboardHomeUtils.leaderboardGoalsBalance(club),
    efficiency: await leaderboardHomeUtils.leaderboardEfficiency(club),
  })));
  const result = teamRanking(leaderboardHome);
  return result;
};

const getAllAway = async () => {
  const clubs = await Club.findAll();

  const leaderboardAway = await Promise.all((clubs).map(async (club) => ({
    name: club.clubName,
    totalPoints: await leaderboardAwayUtils.leaderboardTotalPoints(club),
    totalGames: await leaderboardAwayUtils.leaderboardTotalGames(club),
    totalVictories: await leaderboardAwayUtils.leaderboardTotalVictories(club),
    totalDraws: await leaderboardAwayUtils.leaderboardTotalDraws(club),
    totalLosses: await leaderboardAwayUtils.leaderboardTotalLosses(club),
    goalsFavor: await leaderboardAwayUtils.leaderboardGoalsFavor(club),
    goalsOwn: await leaderboardAwayUtils.leaderboardGoalsOwn(club),
    goalsBalance: await leaderboardAwayUtils.leaderboardGoalsBalance(club),
    efficiency: await leaderboardAwayUtils.leaderboardEfficiency(club),
  })));
  const result = teamRanking(leaderboardAway);
  return result;
};

export default {
  getAllHome,
  getAllAway,
};
