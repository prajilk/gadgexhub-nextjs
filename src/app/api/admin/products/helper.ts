import { db } from "@/lib/prisma";

async function createProduct(data: any) {
  return await db.product.create({
    data,
  });
}

export { createProduct };
