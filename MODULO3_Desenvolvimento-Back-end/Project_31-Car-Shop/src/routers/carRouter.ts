import { Router } from 'express';
import CarController from '../controllers/CarController';
import idValidation from '../middlewares/idValidation';

class CarRouter {
  public router: Router;

  private carController = new CarController();

  private carRouter = this.carController.route;

  constructor() {
    this.router = Router();
    this.addRoute();
  }

  private addRoute() {
    this.router.post(this.carRouter, this.carController.create);
    this.router.get(this.carRouter, this.carController.read);
    this.router.get(
      `${this.carRouter}/:id`,
      idValidation,
      this.carController.readOne,
    );
    this.router.put(
      `${this.carRouter}/:id`,
      idValidation,
      this.carController.update,
    );
    this.router.delete(
      `${this.carRouter}/:id`,
      idValidation,
      this.carController.delete,
    );
  }
}

export default CarRouter;