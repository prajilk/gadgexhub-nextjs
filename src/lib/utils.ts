import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ColorVariantRes, MakeColorVariant } from "./types/types";
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

function error400(message: string, data: { [key: string]: any }) {
  const json = {
    success: false,
    message,
  };
  const resJson = Object.assign({}, json, data);
  return NextResponse.json(resJson, { status: 400 });
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
  error400,
  error500,
  success200,
};
