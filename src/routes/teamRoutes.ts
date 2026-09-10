import { FastifyInstance } from "fastify";
import TeamController from "../controllers/teamController.js";

const controller = new TeamController();

export async function teamRoutes(app: FastifyInstance) {
  app.get("/times", controller.getAllTeams);

  app.get(
    "/times/:id",
    {
      schema: {
        params: {
          type: "object",
          properties: { id: { type: "integer" } },
          required: ["id"],
        },
      },
    },
    controller.getTeamById,
  );
}
