"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const loginRouter_1 = require("./routers/loginRouter");
const clubsRouter_1 = require("./routers/clubsRouter");
const matchsRouter_1 = require("./routers/matchsRouter");
const leaderboardRouter_1 = require("./routers/leaderboardRouter");
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
class App {
    // ...
    constructor() {
        // ...
        this.app = express();
        this.config();
        this.routes();
        // ...
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
        this.app.use(bodyParser.json());
        this.app.use(cors());
        // ...
    }
    routes() {
        this.app.use('/login', loginRouter_1.default);
        this.app.use('/clubs', clubsRouter_1.default);
        this.app.use('/matchs', matchsRouter_1.default);
        this.app.use('/leaderboard', leaderboardRouter_1.default);
        this.app.use(errorMiddleware_1.default);
    }
    // ...
    start(PORT) {
        this.app.listen(PORT, () => {
            console.log(`Escutando na porta: ${PORT}`);
        });
    }
}
exports.App = App;
// A execução dos testes de cobertura depende dessa exportação
exports.app = new App().app;
//# sourceMappingURL=app.js.map