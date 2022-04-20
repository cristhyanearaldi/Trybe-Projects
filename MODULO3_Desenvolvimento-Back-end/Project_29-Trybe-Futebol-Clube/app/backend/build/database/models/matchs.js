"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = require(".");
const clubs_1 = require("./clubs");
class Match extends sequelize_1.Model {
}
Match.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    homeTeam: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clubs',
            key: 'id',
        },
    },
    homeTeamGoals: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    awayTeam: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clubs',
            key: 'id',
        },
    },
    awayTeamGoals: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    inProgress: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'matchs',
    timestamps: false,
});
Match.belongsTo(clubs_1.default, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(clubs_1.default, { foreignKey: 'awayTeam', as: 'awayClub' });
exports.default = Match;
//# sourceMappingURL=matchs.js.map