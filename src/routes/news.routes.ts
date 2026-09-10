import { FastifyInstance } from "fastify";
import NewsController from "../controllers/NewsController.js";

const controller = new NewsController();

export async function newsRoutes(app: FastifyInstance) {
  app.get("/noticias", controller.getAllNews);
}
