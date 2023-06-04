import { getTest } from "../controllers/logger.controller.js";
import CustomRouter from "./router.router.js";

export default class LoggerRouter extends CustomRouter {
  init() {
    this.get("/", ["PUBLIC"], getTest);
  }
}
