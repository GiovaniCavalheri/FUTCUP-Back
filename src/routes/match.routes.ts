import { FastifyInstance } from "fastify";
import MatchController from "../controllers/MatchController.js";

const controller = new MatchController();

export async function matchRoutes(app: FastifyInstance) {
  app.get("/partidas", controller.findMatchs);

  app.get(
    "/partidas/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: { id: { type: "integer" } },
          required: ["id"],
        },
      },
    },
    controller.findMatchById,
  );

  app.get("/classificacao", controller.classificationTeams);
}
