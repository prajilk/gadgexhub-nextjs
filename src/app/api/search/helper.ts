import { db } from "@/lib/prisma";

async function getSearchItems(search: string, limit = 5, page: number) {
  return await db.product.findMany({
    where: {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          keywords: {
            hasSome: search.toLowerCase().split(" "),
          },
        },
      ],
    },
    skip: page === 1 || limit === 5 ? 0 : (page - 1) * 10,
    take: limit,
    include: {
      images: true,
    },
  });
}

async function getCategorySearchItems(search: string, page: number) {
  return await db.category.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      Product: {
        include: {
          images: true,
        },
      },
    },
    skip: page === 1 ? 0 : (page - 1) * 10,
    take: 10,
  });
}

async function makeSearchResult(search: string, page: number) {
  const products = await getSearchItems(search, 10, page);
  const categories = await getCategorySearchItems(search, page);

  const mergedCategories = categories
    .filter((category) => category.Product.length > 0)
    .map((category) => category.Product[0]);

  const finalArray = [...products, ...mergedCategories];

  const finalResult = finalArray.filter((obj, index, array) => {
    return array.findIndex((innerObj) => innerObj.id === obj.id) === index;
  });

  return finalResult;
}

export { getSearchItems, getCategorySearchItems, makeSearchResult };
