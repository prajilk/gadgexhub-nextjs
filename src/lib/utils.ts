import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Category,
  CategoryStructure,
  ColorVariantRes,
  MakeColorVariant,
  ProductProps,
} from "./types/types";
import { NextResponse } from "next/server";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatCurrency(amount: number) {
  const currencyFormatter = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const price = currencyFormatter.format(amount);
  return price.toString().split(".")[0];
}

function calculatePercentage(basePrice: number, offerPrice: number) {
  const decrease = basePrice - offerPrice;
  const percentageDecrease = (decrease / basePrice) * 100;
  return `${percentageDecrease.toFixed(0)}%`;
}

function textTruncate(text: string, length: number) {
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
}

const repeat = (times: number) => {
  return Array.from(Array(times).keys());
};

interface SWRError extends Error {
  status: number;
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.text();
    const err = new Error(error) as SWRError;
    err.status = res.status;
    throw err;
  }

  return res.json();
}

function capitalizeSearchParam(text: string) {
  if (!text) return null;

  const words = text.split(" ");
  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together with hyphens
  const capitalizedText = capitalizedWords.join(" ");

  return capitalizedText;
}

function makeColorVariant({ colors, images }: MakeColorVariant) {
  const output: ColorVariantRes[] = [];
  if (colors !== null) {
    const colorNames = colors.split(",");

    colorNames.forEach((colorName) => {
      const colorImages = images.filter((img) =>
        img.imagePublicId.includes(colorName),
      );

      // Create the output object for the color
      const colorObject = {
        color: colorName,
        images: colorImages
          .map((img) => ({
            id: img.id,
            url: img.imagePublicId,
          }))
          .reverse(),
      };

      output.push(colorObject);
    });
  } else {
    const noColorVariantObject = {
      color: null,
      images: images
        .map((img) => ({
          id: img.id,
          url: img.imagePublicId,
        }))
        .reverse(),
    };
    output.push(noColorVariantObject);
  }

  return output.reverse();
}

function getExpireDate() {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // Set expiration for 30 days from now
  return expirationDate;
}

function formateDateString(date: Date) {
  const DATE = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(DATE);
  return formattedDate;
}

function error400(message: string, data: { [key: string]: any }) {
  const json = {
    success: false,
    message,
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 400 });
}

function error404(message: string, data: { [key: string]: any }) {
  const json = {
    success: false,
    message,
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 404 });
}

function error429(message: string, data: { [key: string]: any }) {
  const json = {
    success: false,
    message,
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 429 });
}

function error500(data: { [key: string]: any }) {
  const json = {
    success: false,
    message: "Something went wrong. SVR",
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 500 });
}

function success200(data: { [key: string]: any }) {
  const json = {
    success: true,
    message: "Success",
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 200 });
}

function generateCategoryStructure(
  data: Category[],
  selectedCategory: string,
): CategoryStructure | null {
  const selectedCategoryData = data.find(
    (category) =>
      category.name.toLowerCase().replace(/[\/. ]/g, "-") === selectedCategory,
  );

  if (!selectedCategoryData) {
    const childCategories = data
      .filter((category) => category.parentId === null)
      .map((item) => item.name);
    return {
      parents: [],
      selected: "",
      child: childCategories,
    };
  }

  const parents: string[] = [];
  let currentParent: number | null = selectedCategoryData.id;

  while (currentParent !== null) {
    const parentCategory = data.find(
      (category) => category.id === currentParent,
    );

    if (parentCategory) {
      parents.unshift(parentCategory.name);
      currentParent = parentCategory.parentId;
    } else {
      break; // Break if parent category not found
    }
  }

  const childCategories = data
    .filter((category) => category.parentId === selectedCategoryData.id)
    .map((category) => category.name);

  return {
    parents,
    selected: selectedCategory,
    child: childCategories,
  };
}

function findParentAndEndChildIds(data: Category[], categoryId?: number) {
  let parentIds: Category[] = [];
  let endChildIds: number[] = [];

  function findParents(categoryId?: number) {
    const parents = data.filter((item) => item.parentId === categoryId);
    parentIds.push(...parents);

    if (!parentIds.length && data.some((item) => item.id === categoryId)) {
      endChildIds.push(data.find((item) => item.id === categoryId)!.id);
    }

    parents.forEach((parent) => findParents(parent.id));
  }

  findParents(categoryId);

  parentIds.forEach((parent) => {
    const children = data.filter((item) => item.parentId === parent.id);
    if (children.length === 0) {
      endChildIds.push(parent.id);
    }
  });

  return endChildIds;
}

function makeCategoryUrl(categoryArray: string[], currentValue: string) {
  if (categoryArray.length === 0) {
    return "/store/c";
  }
  const index = categoryArray.indexOf(currentValue);
  const modifiedArray = categoryArray.map((element) =>
    element.toLowerCase().replace(/[\/. ]/g, "-"),
  );
  return index !== -1
    ? "/store/c/" + modifiedArray.slice(0, index + 1).join("/")
    : "/store";
}

function sortProduct(
  products: (Omit<ProductProps, "colorVariants"> &
    Omit<MakeColorVariant, "colors">)[],
  sort: string | null,
) {
  if (sort === "l2h")
    return products.sort((a, b) => {
      if (a.stock > 0 && b.stock === 0) return -1;
      else if (a.stock === 0 && b.stock > 0) return 1;
      else return a.offerPrice - b.offerPrice;
    });
  else if (sort === "h2l")
    return products.sort((a, b) => {
      if (a.stock > 0 && b.stock === 0) return -1;
      else if (a.stock === 0 && b.stock > 0) return 1;
      else return b.offerPrice - a.offerPrice;
    });
  else if (sort === "latest")
    return products.sort((a, b) => {
      if (a.stock > 0 && b.stock === 0) return -1;
      else if (a.stock === 0 && b.stock > 0) return 1;
      else
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    });
  else return products;
}

export {
  cn,
  formatCurrency,
  fetcher,
  repeat,
  textTruncate,
  capitalizeSearchParam,
  calculatePercentage,
  makeColorVariant,
  getExpireDate,
  formateDateString,
  error400,
  error404,
  error429,
  error500,
  success200,
  generateCategoryStructure,
  findParentAndEndChildIds,
  makeCategoryUrl,
  sortProduct,
};
