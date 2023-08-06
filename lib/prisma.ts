import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

async function generateUsername(name: string) {
  // Convert the user's name to lowercase and remove spaces
  const lowercaseName = name.toLowerCase().replace(/\s+/g, "");

  let username = lowercaseName;
  let usernameExists = true;
  let counter = 1;

  while (usernameExists) {
    const existingUser = await client.user.findUnique({ where: { username } });

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

const xclient = client.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const { data } = params.args;
    data.username = await generateUsername(data.name);
  }
  return next(params);
});

export default client;
