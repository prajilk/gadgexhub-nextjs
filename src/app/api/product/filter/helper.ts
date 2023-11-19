import { db } from "@/lib/prisma";

async function getAllProducts(page: number) {
  return await db.product.findMany({
    where: {
      stock: { not: 0 },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: page === 1 ? 0 : (page - 1) * 10,
    take: 10,
    include: { images: true },
  });
}

async function getProductsWithCategories(
  categories: Array<number>,
  page: number,
) {
  return await db.category
    .findMany({
      select: {
        Product: {
          include: {
            images: true,
          },
        },
      },
      where: {
        id: {
          in: categories,
        },
      },
      skip: page === 1 ? 0 : (page - 1) * 10,
      take: 10,
    })
    .then((dbProducts) =>
      dbProducts.flatMap((dbProduct) => dbProduct.Product).flat(2),
    );
}

export { getAllProducts, getProductsWithCategories };
