import { fastify } from "fastify";
import { teamRoutes } from "./routes/teamRoutes.js";
import { matchRoutes } from "./routes/match.routes.js";
import { newsRoutes } from "./routes/news.routes.js";

const server = fastify({ logger: true });
const PORT = process.env.PORT || 3333;

server.register(teamRoutes);
server.register(matchRoutes);
server.register(newsRoutes);

server.listen({ port: Number(PORT), host: "0.0.0.0" }, () => {
  console.log(`Server is Running in http://localhost:${PORT}`);
});
