import { FastifyInstance } from "fastify";
import LoginController from "../controllers/LoginController.js";

const controller = new LoginController();

export async function loginRoutes(app: FastifyInstance) {
  app.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    controller.loginUser,
  );
}
