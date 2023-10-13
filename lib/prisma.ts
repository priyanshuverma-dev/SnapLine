import { API_URL } from "@/utils/base";
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

async function sendAchievementEmail(
  userEmail: string,
  achievementImage: string,
  achievementName: string,
  userName: string,
  achievementId: string
) {
  const response = await fetch(`${API_URL}/api/achievements`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail,
      achievementImage,
      achievementName,
      userName,
      achievementId,
    }),
  });

  if (response.ok) {
    console.log("Email sent successfully");
    return;
  } else {
    console.error("Email sending failed");
    return;
  }
  return;
}

async function addAIAchievement(userId: string) {
  // Check the count of AI resources associated with the user (You need to implement this)

  const existingAchievement = await prisma.achievement.findFirst({
    where: {
      userId: userId,
      type: "5 AI Register Achievement",
    },
  });

  if (existingAchievement) {
    // The user already has this achievement, so we don't need to add it again.
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return;
  }

  const ais = await prisma.aIService.findMany({
    where: {
      registeredBy: userId,
    },
  });

  // If the count reaches 5, add the achievement
  if (ais.length === 0) {
    const achievement = await prisma.achievement.create({
      data: {
        name: "AI Pioneer",
        type: "5 AI Register Achievement",
        description: "Registered with AI 5 times.",
        userId: userId,
        image:
          "https://res.cloudinary.com/pvserver/image/upload/v1697178622/achievements/ai-pioneer.jpg",
        priority: 10,
        emailSent: false,
      },
    });

    if (achievement) {
      await sendAchievementEmail(
        user.email,
        achievement.image,
        achievement.name,
        user.name,
        achievement.id
      );
      return;
    }
  }
}

const xclient = prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const { data } = params.args;
    data.username = await generateUsername(data.name);
  }

  if (params.model === "AIService" && params.action === "create") {
    const { data } = params.args;

    await addAIAchievement(data.registeredBy);
  }

  return next(params);
});

export default prisma;
export { xclient };
