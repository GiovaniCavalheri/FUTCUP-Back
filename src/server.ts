import { fastify } from "fastify";

const server = fastify({ logger: true });
const PORT = process.env.PORT || 3333;

server.get("/", async () => {
  return {
    message: "API do campeonato funcionando!",
  };
});

server.listen((PORT) => {
  console.log(`Server is Running in http://localhost:${PORT}`);
});
