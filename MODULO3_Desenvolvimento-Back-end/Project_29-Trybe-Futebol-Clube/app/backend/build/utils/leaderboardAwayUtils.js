"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchs_1 = require("../database/models/matchs");
const leaderboardTotalGames = async (club) => {
    const awayGames = await matchs_1.default.count({ where: { awayTeam: club.id, inProgress: false } });
    return awayGames;
};
const leaderboardTotalVictories = async (club) => {
    const awayVictories = await matchs_1.default.findAll({
        where: { awayTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
    const awayTotalVictories = awayVictories
        .reduce((acc, curr) => (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc), 0);
    return awayTotalVictories;
};
const leaderboardTotalDraws = async (club) => {
    const awayDraws = await matchs_1.default.findAll({
        where: { awayTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
    const awayTotalDraws = awayDraws
        .reduce((acc, curr) => (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc), 0);
    return awayTotalDraws;
};
const leaderboardTotalLosses = async (club) => {
    const awayLosses = await matchs_1.default.findAll({
        where: { awayTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
    const awayTotalLosses = awayLosses
        .reduce((acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc), 0);
    return awayTotalLosses;
};
const leaderboardTotalPoints = async (club) => {
    const victories = await leaderboardTotalVictories(club);
    const draws = await leaderboardTotalDraws(club);
    const totalPoints = (victories * 3) + draws;
    return totalPoints;
};
const leaderboardGoalsFavor = async (club) => {
    const awayGoalsFavor = await matchs_1.default.sum('awayTeamGoals', { where: { awayTeam: club.id, inProgress: false } });
    return awayGoalsFavor;
};
const leaderboardGoalsOwn = async (club) => {
    const awayGoalsOwn = await matchs_1.default.sum('homeTeamGoals', { where: { awayTeam: club.id, inProgress: false } });
    return awayGoalsOwn;
};
const leaderboardGoalsBalance = async (club) => {
    const goalsBalance = await leaderboardGoalsFavor(club) - await leaderboardGoalsOwn(club);
    return goalsBalance;
};
const leaderboardEfficiency = async (club) => {
    const totalPoints = await leaderboardTotalPoints(club);
    const totalGames = await leaderboardTotalGames(club);
    const efficiency = +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return efficiency;
};
exports.default = {
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
//# sourceMappingURL=leaderboardAwayUtils.js.map