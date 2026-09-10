import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class LoginController {
  async loginUser(
    req: FastifyRequest<{ Body: { email: string; password: string } }>,
    rep: FastifyReply,
  ) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await prisma.usuario.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return rep.code(401).send({ message: "Credenciais inválidas" });
    }

    const payload = {
      idUser: user.idUser,
      roleUser: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return rep.send({ token });
  }
}
