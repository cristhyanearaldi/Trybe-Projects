"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clubs_1 = require("../database/models/clubs");
const matchs_1 = require("../database/models/matchs");
const getAll = async () => {
    const matchs = matchs_1.default.findAll({
        include: [
            { model: clubs_1.default, as: 'homeClub', attributes: ['clubName'] },
            { model: clubs_1.default, as: 'awayClub', attributes: ['clubName'] },
        ],
    });
    return matchs;
};
const getAllInProgress = async (inProgress) => {
    let where = {};
    if (inProgress === 'false') {
        where = { inProgress: false };
    }
    else {
        where = { inProgress: true };
    }
    const matchsInProgress = await matchs_1.default.findAll({
        where,
        include: [
            { model: clubs_1.default, as: 'homeClub', attributes: ['clubName'] },
            { model: clubs_1.default, as: 'awayClub', attributes: ['clubName'] },
        ],
    });
    return matchsInProgress;
};
const create = async ({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }) => {
    const newMatch = await matchs_1.default.create({
        homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    return newMatch;
};
const updateFinishedMatchs = async (id) => {
    await matchs_1.default.update({ inProgress: false }, { where: { id } });
};
const updateMatchResult = async (id, { homeTeamGoals, awayTeamGoals }) => {
    await matchs_1.default.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
};
exports.default = {
    getAll,
    getAllInProgress,
    create,
    updateFinishedMatchs,
    updateMatchResult,
};
//# sourceMappingURL=matchsService.js.map