import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";
import { Status } from "../generated/prisma/enums.js";

export default class MatchController {
  async findMatchs(
    req: FastifyRequest<{ Querystring: { status?: Status } }>,
    rep: FastifyReply,
  ) {
    const status = req.query.status;
    const matches = await prisma.match.findMany({
      where: status ? { status } : {},
    });
    return rep.send(matches);
  }

  async findMatchById(
    req: FastifyRequest<{ Params: { id: number } }>,
    rep: FastifyReply,
  ) {
    const match = await prisma.match.findUnique({
      where: { matchId: req.params.id },
    });

    if (!match) {
      return rep.status(404).send({ message: "Partida não encontrada" });
    }
    return rep.send(match);
  }

  async classificationTeams(req: FastifyRequest, rep: FastifyReply) {
    const teams = await prisma.team.findMany();

    const tabela = new Map<
      number,
      {
        teamId: number;
        nameTeam: string;
        pontos: number;
        vitorias: number;
        empates: number;
        derrotas: number;
        golsPro: number;
        golsContra: number;
        jogos: number;
      }
    >();

    for (const time of teams) {
      tabela.set(time.teamId, {
        teamId: time.teamId,
        nameTeam: time.nameTeam,
        pontos: 0,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        golsPro: 0,
        golsContra: 0,
        jogos: 0,
      });
    }

    const matches = await prisma.match.findMany({
      where: { status: "Finalizado" },
    });

    for (const match of matches) {
      const mandante = tabela.get(match.homeTeamId)!;
      const visitante = tabela.get(match.awayTeamId)!;

      mandante.jogos++;
      visitante.jogos++;
      mandante.golsPro += match.homeTeamsGoals;
      mandante.golsContra += match.awayTeamsGoals;
      visitante.golsPro += match.awayTeamsGoals;
      visitante.golsContra += match.homeTeamsGoals;

      if (match.homeTeamsGoals > match.awayTeamsGoals) {
        mandante.vitorias++;
        mandante.pontos += 3;
        visitante.derrotas++;
      } else if (match.awayTeamsGoals > match.homeTeamsGoals) {
        visitante.vitorias++;
        visitante.pontos += 3;
        mandante.derrotas++;
      } else {
        mandante.empates++;
        visitante.empates++;
        mandante.pontos += 1;
        visitante.pontos += 1;
      }
    }

    const classificacao = Array.from(tabela.values()).sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      const saldoA = a.golsPro - a.golsContra;
      const saldoB = b.golsPro - b.golsContra;
      return saldoB - saldoA;
    });

    return rep.send(classificacao);
  }
}