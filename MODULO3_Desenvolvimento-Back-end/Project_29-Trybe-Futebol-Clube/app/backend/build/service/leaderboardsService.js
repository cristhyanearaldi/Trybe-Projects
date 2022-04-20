"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clubs_1 = require("../database/models/clubs");
const leaderboardHomeUtils_1 = require("../utils/leaderboardHomeUtils");
const leaderboardAwayUtils_1 = require("../utils/leaderboardAwayUtils");
const teamRanking = (leaderboard) => {
    leaderboard.sort((teamA, teamB) => {
        if (teamA.totalPoints < teamB.totalPoints)
            return 1;
        if (teamA.totalPoints > teamB.totalPoints)
            return -1;
        if (teamA.totalVictories < teamB.totalVictories)
            return 1;
        if (teamA.totalVictories > teamB.totalVictories)
            return -1;
        if (teamA.goalsBalance < teamB.goalsBalance)
            return 1;
        if (teamA.goalsBalance > teamB.goalsBalance)
            return -1;
        if (teamA.goalsFavor < teamB.goalsFavor)
            return 1;
        if (teamA.goalsFavor > teamB.goalsFavor)
            return -1;
        if (teamA.goalsOwn < teamB.goalsOwn)
            return 1;
        if (teamA.goalsOwn > teamB.goalsOwn)
            return -1;
        return 0;
    });
    return leaderboard;
};
const getAllHome = async () => {
    const clubs = await clubs_1.default.findAll();
    const leaderboardHome = await Promise.all((clubs).map(async (club) => ({
        name: club.clubName,
        totalPoints: await leaderboardHomeUtils_1.default.leaderboardTotalPoints(club),
        totalGames: await leaderboardHomeUtils_1.default.leaderboardTotalGames(club),
        totalVictories: await leaderboardHomeUtils_1.default.leaderboardTotalVictories(club),
        totalDraws: await leaderboardHomeUtils_1.default.leaderboardTotalDraws(club),
        totalLosses: await leaderboardHomeUtils_1.default.leaderboardTotalLosses(club),
        goalsFavor: await leaderboardHomeUtils_1.default.leaderboardGoalsFavor(club),
        goalsOwn: await leaderboardHomeUtils_1.default.leaderboardGoalsOwn(club),
        goalsBalance: await leaderboardHomeUtils_1.default.leaderboardGoalsBalance(club),
        efficiency: await leaderboardHomeUtils_1.default.leaderboardEfficiency(club),
    })));
    const result = teamRanking(leaderboardHome);
    return result;
};
const getAllAway = async () => {
    const clubs = await clubs_1.default.findAll();
    const leaderboardAway = await Promise.all((clubs).map(async (club) => ({
        name: club.clubName,
        totalPoints: await leaderboardAwayUtils_1.default.leaderboardTotalPoints(club),
        totalGames: await leaderboardAwayUtils_1.default.leaderboardTotalGames(club),
        totalVictories: await leaderboardAwayUtils_1.default.leaderboardTotalVictories(club),
        totalDraws: await leaderboardAwayUtils_1.default.leaderboardTotalDraws(club),
        totalLosses: await leaderboardAwayUtils_1.default.leaderboardTotalLosses(club),
        goalsFavor: await leaderboardAwayUtils_1.default.leaderboardGoalsFavor(club),
        goalsOwn: await leaderboardAwayUtils_1.default.leaderboardGoalsOwn(club),
        goalsBalance: await leaderboardAwayUtils_1.default.leaderboardGoalsBalance(club),
        efficiency: await leaderboardAwayUtils_1.default.leaderboardEfficiency(club),
    })));
    const result = teamRanking(leaderboardAway);
    return result;
};
exports.default = {
    getAllHome,
    getAllAway,
};
//# sourceMappingURL=leaderboardsService.js.map