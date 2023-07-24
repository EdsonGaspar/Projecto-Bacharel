import { FastifyInstance } from "fastify";
import { string, z } from "zod";
import { prisma } from "../lib/prisma";

export async function voterRoutes(app: FastifyInstance) {
  app.post("/voter/register", async (request, response) => {
    const bodyshema = z.object({
      email: z.string().email(),
      name: z.string().min(3),
      password: z.string().min(8),
      bi: z.string(),
      dateOfBirth: z.date()
    });

    const data = bodyshema.parse(request.body);

    const voter = await prisma.voter.create({
      data: {
        ...data,
      },
    });

    return response.status(201).send({
      id: voter.id,
      email: voter.email
    });
  });

  app.get("/voters", async (request, response) => {
    const voters = await prisma.voter.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        dateOfBirth: true,
      },
    });

    return voters;
  });

  app.get("/voter/:email", async (request, response) => {
    const paramsSchema = z.object({
      email: string().email(),
    });

    const { email } = paramsSchema.parse(request.params);

    const voter = await prisma.voter.findUniqueOrThrow({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!voter) {
      return response.status(404).send("Não Encotrado!");
    }

    return response.status(200).send(voter);
  });

  app.post("/voter/login", async (request, response) => {
    const bodyshema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    });

    const { email, password } = bodyshema.parse(request.body);

    const voter = await prisma.voter.findUnique({
      where: {
        email,
      },
    });

    if (!voter) {
      return response.status(404).send({ msg: "Email or Password is Wrong!" });
    }

    if (voter.password !== password) {
      return response.status(404).send({ msg: "Email or Password is Wrong!" });
    }

    const token = app.jwt.sign(
      {
        name: voter.name,
        email: voter.email,
      },
      {
        sub: voter.id,
        expiresIn: "7 days",
      }
    );

    return { token };
  });

  app.put("/party", async (request, response) => {
    const bodyshema = z.object({
      partyId: z.string(),
      voterId: z.string(),
    });
  
    const {partyId, voterId} = bodyshema.parse(request.body);
  
    const isparty = await prisma.party.findFirst({
      where: {
        id: partyId,
      },
    });
  
    const isvoter = await prisma.voter.findFirst({
      where: {
        id: voterId,
      },
    });
  
    if (!isparty && !isvoter) {
      return response.status(404).send("O partido ou eleitor não existem!");
    }
  
    const party = await prisma.voter.update({
      where:{
        id: voterId
      },
      data: {
        partyId,
      },
    });
  
    return response.status(201).send(party);
  
  });
}
