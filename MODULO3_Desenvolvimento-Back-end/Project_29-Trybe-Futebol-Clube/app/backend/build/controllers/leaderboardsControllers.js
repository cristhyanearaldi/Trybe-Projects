"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leaderboardsService_1 = require("../service/leaderboardsService");
const StatusCode_1 = require("../enums/StatusCode");
const getAllHome = async (req, res, next) => {
    try {
        const leaderboardHome = await leaderboardsService_1.default.getAllHome();
        res.status(StatusCode_1.default.HTTP_OK).json(leaderboardHome);
    }
    catch (error) {
        next(error);
    }
};
const getAllAway = async (req, res, next) => {
    try {
        const leaderboardAway = await leaderboardsService_1.default.getAllAway();
        res.status(StatusCode_1.default.HTTP_OK).json(leaderboardAway);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAllHome,
    getAllAway,
};
//# sourceMappingURL=leaderboardsControllers.js.map