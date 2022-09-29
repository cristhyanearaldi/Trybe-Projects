import App from './app';
import CarRouter from './routers/carRouter';
import MotorcycleRouter from './routers/motorcycleRouter';

const server = new App();

const carRouter = new CarRouter();
const motorcycleRouter = new MotorcycleRouter();

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;
