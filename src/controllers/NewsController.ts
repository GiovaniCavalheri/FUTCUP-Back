import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";

export default class NewsController {
  async getAllNews(req: FastifyRequest, rep: FastifyReply) {
    const news = await prisma.news.findMany(); 
    return rep.send(news);
  }
}
