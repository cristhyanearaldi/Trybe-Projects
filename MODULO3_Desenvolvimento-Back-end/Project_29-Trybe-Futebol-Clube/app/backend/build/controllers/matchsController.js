"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCode_1 = require("../enums/StatusCode");
const matchsService_1 = require("../service/matchsService");
const getAll = async (req, res, next) => {
    const { inProgress } = req.query;
    try {
        if (!inProgress) {
            const matchs = await matchsService_1.default.getAll();
            return res.status(StatusCode_1.default.HTTP_OK).json(matchs);
        }
        const matchsInProgress = matchsService_1.default.getAllInProgress(inProgress);
        return res.status(StatusCode_1.default.HTTP_OK).json(matchsInProgress);
    }
    catch (error) {
        next(error);
    }
};
const create = async (req, res, next) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    try {
        const newMatch = await matchsService_1.default.create({
            homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
        });
        return res.status(StatusCode_1.default.HTTP_CREATED).json(newMatch);
    }
    catch (error) {
        next(error);
    }
};
const updateFinishedMatchs = async (req, res, next) => {
    const { id } = req.params;
    try {
        await matchsService_1.default.updateFinishedMatchs(+id);
        return res.status(StatusCode_1.default.HTTP_OK).json({ message: 'Finished Match!' });
    }
    catch (error) {
        next(error);
    }
};
const updateMatchResult = async (req, res, next) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    try {
        await matchsService_1.default.updateMatchResult(+id, { homeTeamGoals, awayTeamGoals });
        res.status(StatusCode_1.default.HTTP_OK).json({ message: 'Updated Match!' });
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAll,
    create,
    updateFinishedMatchs,
    updateMatchResult,
};
//# sourceMappingURL=matchsController.js.map