import { db } from "@/lib/prisma";

async function getUser(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async function updateUser(userId: string, data: any) {
  return await db.user.update({
    data,
    where: {
      id: userId,
    },
  });
}

export { getUser, updateUser };
