import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import idValidation from '../middlewares/idValidation';

class MotorcycleRouter {
  public router: Router;

  private motorcycleController = new MotorcycleController();

  private motorcycleRouter = this.motorcycleController.route;

  constructor() {
    this.router = Router();
    this.addRoute();
  }

  private addRoute() {
    this.router.post(this.motorcycleRouter, this.motorcycleController.create);
    this.router.get(this.motorcycleRouter, this.motorcycleController.read);
    this.router.get(
      `${this.motorcycleRouter}/:id`,
      idValidation,
      this.motorcycleController.readOne,
    );
    this.router.put(
      `${this.motorcycleRouter}/:id`,
      idValidation,
      this.motorcycleController.update,
    );
    this.router.delete(
      `${this.motorcycleRouter}/:id`,
      idValidation,
      this.motorcycleController.delete,
    );
  }
}

export default MotorcycleRouter;