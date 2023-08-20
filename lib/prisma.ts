import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

async function generateUsername(name: string) {
  // Convert the user's name to lowercase and remove spaces
  const lowercaseName = name.toLowerCase().replace(/\s+/g, "");

  let username = lowercaseName;
  let usernameExists = true;
  let counter = 1;

  while (usernameExists) {
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (existingUser) {
      // If the username already exists, append a counter to it
      username = `${lowercaseName}${counter}`;
      counter++;
    } else {
      usernameExists = false;
    }
  }

  return username;
}

const xclient = prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const { data } = params.args;
    data.username = await generateUsername(data.name);
  }
  return next(params);
});

export default prisma;
export { xclient };
