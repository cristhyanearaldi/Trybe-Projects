import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import loginRouter from './routers/loginRouter';
import clubsRouter from './routers/clubsRouter';
import matchsRouter from './routers/matchsRouter';
import leaderboardRouter from './routers/leaderboardRouter';
import errorMiddleware from './middlewares/errorMiddleware';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    this.routes();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
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

  public routes() {
    this.app.use('/login', loginRouter);
    this.app.use('/clubs', clubsRouter);
    this.app.use('/matchs', matchsRouter);
    this.app.use('/leaderboard', leaderboardRouter);
    this.app.use(errorMiddleware);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => {
      console.log(`Escutando na porta: ${PORT}`);
    });
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
