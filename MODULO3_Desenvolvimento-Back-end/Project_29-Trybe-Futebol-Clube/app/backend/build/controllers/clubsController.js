"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCode_1 = require("../enums/StatusCode");
const clubsService_1 = require("../service/clubsService");
const getAll = async (req, res, next) => {
    try {
        const clubs = await clubsService_1.default.getAll();
        return res.status(StatusCode_1.default.HTTP_OK).json(clubs);
    }
    catch (error) {
        next(error);
    }
};
const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const club = await clubsService_1.default.getById({ id });
        return res.status(StatusCode_1.default.HTTP_OK).json(club);
    }
    catch (error) {
        next(error);
    }
};
exports.default = {
    getAll,
    getById,
};
//# sourceMappingURL=clubsController.js.map