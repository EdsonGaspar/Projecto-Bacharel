import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prisma } from "../lib/prisma";

export async function partyRoutes(app: FastifyInstance) {
  app.post("/party/create", async (request, response) => {
    const bodyshema = z.object({
      name: z.string().min(3),
      proposal: z.string()
    });

    const data = bodyshema.parse(request.body);

    const party = await prisma.party.create({
      data: {
        nome: data.name,
        proposal: data.proposal
      },
    });

    return party;
  });


  app.put("/party/change", async (request, response) => {
    const bodyshema = z.object({
      id: z.string(),
      name: z.string().min(3),
      proposal: z.string()
    });

    const data = bodyshema.parse(request.body);

    const party = await prisma.party.update({
      where:{
        id:data.id
      },
      data: {
        nome: data.name,
        proposal: data.proposal
      },
    });

    return response.status(200).send(party);
  });

  app.get("/parties", async (request, response) => {
    const parties = await prisma.party.findMany({
      select: {
        id: true,
        nome: true,
        proposal: true,
        voters: true
      },
    });

    return parties;
  });

}
