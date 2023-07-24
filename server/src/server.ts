import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { voterRoutes } from "./routes/voter.routes";

const app = fastify();

app.register(cors, {
  origin: true,
});
app.register(jwt, {
  secret: "api-util-user-usefull",
});

app.register(voterRoutes);
app.register(voterRoutes);

app.listen({ port: 3003 }).then(() => {
  console.log("rodando na porta 3003");
});
