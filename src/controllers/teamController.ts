import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";

export default class TeamController {
  async getAllTeams(req: FastifyRequest, reply: FastifyReply) {
    const teams = await prisma.team.findMany();
    return reply.send(teams);
  }

  async getTeamById(
    req: FastifyRequest<{ Params: { id: number } }>,
    rep: FastifyReply,
  ) {
    const team = await prisma.team.findUnique({
      where: { teamId: req.params.id },
      include: { players: true },
    });

    if (!team) {
      return rep.status(404).send({
        message: "Time não encontrado / não existe",
      });
    }
    return rep.send(team);
  }
}
