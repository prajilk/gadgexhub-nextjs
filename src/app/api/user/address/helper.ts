import { db } from "@/lib/prisma";

async function getAllAddresses(userId: string) {
  return await db.user
    .findUnique({
      where: {
        id: userId,
      },
      select: {
        addresses: true,
      },
    })
    .addresses();
}

export { getAllAddresses };
