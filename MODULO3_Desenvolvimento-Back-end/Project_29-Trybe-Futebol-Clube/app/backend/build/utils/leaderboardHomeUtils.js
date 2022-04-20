"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchs_1 = require("../database/models/matchs");
const leaderboardTotalGames = async (club) => {
    const homeGames = await matchs_1.default.count({ where: { homeTeam: club.id, inProgress: false } });
    return homeGames;
};
const leaderboardTotalVictories = async (club) => {
    const homeVictories = await matchs_1.default.findAll({
        where: { homeTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
    const homeTotalVictories = homeVictories
        .reduce((acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc), 0);
    return homeTotalVictories;
};
const leaderboardTotalDraws = async (club) => {
    const homeDraws = await matchs_1.default.findAll({
        where: { homeTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
    const homeTotalDraws = homeDraws
        .reduce((acc, curr) => (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc), 0);
    return homeTotalDraws;
};
const leaderboardTotalLosses = async (club) => {
    const homeLosses = await matchs_1.default.findAll({
        where: { homeTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
    const homeTotalLosses = homeLosses
        .reduce((acc, curr) => (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc), 0);
    return homeTotalLosses;
};
const leaderboardTotalPoints = async (club) => {
    const victories = await leaderboardTotalVictories(club);
    const draws = await leaderboardTotalDraws(club);
    const totalPoints = (victories * 3) + draws;
    return totalPoints;
};
const leaderboardGoalsFavor = async (club) => {
    const homeGoalsFavor = await matchs_1.default.sum('homeTeamGoals', { where: { homeTeam: club.id, inProgress: false } });
    return homeGoalsFavor;
};
const leaderboardGoalsOwn = async (club) => {
    const homeGoalsOwn = await matchs_1.default.sum('awayTeamGoals', { where: { homeTeam: club.id, inProgress: false } });
    return homeGoalsOwn;
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
//# sourceMappingURL=leaderboardHomeUtils.js.map