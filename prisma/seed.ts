import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.league.createMany({
    data: [
      {
        name: "ARRD",
        city: "Rouen - Maromme",
        owner: true,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.profile.createMany({
    data: [
      {
        name: "bureau",
      },
      {
        name: "coach",
      },
      {
        name: "développeur",
      },
      {
        name: "communication",
      },
      {
        name: "membre",
      },
      {
        name: "superadmin",
      },
    ],
    skipDuplicates: true,
  });

  const _dev = await prisma.profile.findUnique({
      where: { name: "développeur" },
    }),
    _superAdmin = await prisma.profile.findUnique({
      where: { name: "superadmin" },
    }),
    _league= await prisma.league.findUnique({
      where: { name: "ARRD" },
    });

  if (_dev && _superAdmin) {
    await prisma.user.update({
      where: {
        email: "b@bouteiller.contact",
      },
      data: {
        profiles: {
          create: [
            {
              profile: {
                connect: { id: _dev.id },
              },
            },
            {
              profile: {
                connect: { id: _superAdmin.id },
              },
            },
          ],
        },
        leagues: {
          create: [
            {
              league: {
                connect: { id: _league.id },
              },
            },
          ],
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
