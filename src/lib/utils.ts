import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export {
  cn,
  formatCurrency,
  fetcher,
  repeat,
  textTruncate,
  capitalizeSearchParam,
};
