import { Application } from "express";

/**
 *  Middleware interface
 */
interface IMiddleware {
  collection: any[];
  load(middlewares: any): void;
  apply(app: Application): void;
}

/**
 *  Middleware instance
 */
class Middleware implements IMiddleware {
  public collection: any[];

  /**
   *  Load middleware
   */
  public load(middlewares: any) {
    this.collection = middlewares;
  }

  /**
   *  Apply middleware
   */
  public apply(app: Application) {
    for (const middleware of this.collection) {
      app.use(middleware);
    }
  }
}

/* Export */
export default new Middleware();
