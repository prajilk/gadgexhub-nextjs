"use client";

import { CategoryStructure } from "@/lib/types/types";
import { makeCategoryUrl } from "@/lib/utils";
import { ArrowDownUp, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

export const SortSm = () => {
  const sortParam = useSearchParams().get("sort");
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [sortParam]);

  return (
    <div>
      {isLoading && (
        <div className="absolute inset-0 z-[999] flex h-screen w-full items-center justify-center bg-[rgba(0,0,0,0.4)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white">
            <Loader2 className="animate-spin" />
          </div>
        </div>
      )}
      <input type="checkbox" id="sort-bottom" className="drawer-toggle" />

      <label
        htmlFor="sort-bottom"
        className="flex items-center gap-2 tracking-widest"
      >
        <ArrowDownUp size={15} />
        Sort
      </label>
      <label
        style={{ height: "100vh" }}
        className="overlay"
        htmlFor="sort-bottom"
      ></label>
      <div className="drawer drawer-bottom">
        <div className="flex h-full flex-col pb-10">
          <div className="border-b p-2">
            <h2 className="uppercase tracking-wider text-muted-foreground">
              Sort
            </h2>
          </div>
          <ul className="scrollbar-thin max-h-[350px] overflow-y-scroll text-sm">
            <li>
              <label
                className="menu-item flex w-full items-center justify-between"
                htmlFor="sort-bottom"
                onClick={() => {
                  router.push(
                    pathname ? pathname + "?sort=l2h" : `/store?sort=l2h`,
                  );
                  sortParam !== "l2h" && setLoading(true);
                }}
              >
                Price -- Low to High
                <input
                  type="radio"
                  defaultChecked={sortParam === "l2h"}
                  className="accent-black"
                />
              </label>
            </li>
            <li>
              <label
                className="menu-item flex w-full items-center justify-between"
                htmlFor="sort-bottom"
                onClick={() => {
                  router.push(
                    pathname ? pathname + "?sort=h2l" : `/store?sort=h2l`,
                  );
                  sortParam !== "h2l" && setLoading(true);
                }}
              >
                Price -- High to Low
                <input
                  type="radio"
                  defaultChecked={sortParam === "h2l"}
                  className="accent-black"
                />
              </label>
            </li>
            <li>
              <label
                className="menu-item flex w-full items-center justify-between"
                htmlFor="sort-bottom"
                onClick={() => {
                  router.push(
                    pathname ? pathname + "?sort=latest" : `/store?sort=latest`,
                  );
                  sortParam !== "latest" && setLoading(true);
                }}
              >
                Latest First
                <input
                  type="radio"
                  defaultChecked={sortParam === "latest"}
                  className="accent-black"
                />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const SortLg = () => {
  const sortParam = useSearchParams().get("sort");
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setLoading] = useState("");

  useEffect(() => {
    setLoading("");
  }, [sortParam]);

  return (
    <div>
      <div className="col-span-1 mt-2 hidden h-fit w-full rounded-lg bg-white p-3 lg:block">
        <h1 className="text-sm font-semibold">Sort</h1>
        <hr className="my-1" />
        <ul className="text-sm">
          <ul className="scrollbar-thin max-h-[350px] overflow-y-scroll text-sm">
            <li>
              <button
                className="menu-item flex w-full items-center justify-between"
                onClick={() => {
                  router.push(
                    pathname ? pathname + "?sort=l2h" : `/store?sort=l2h`,
                  );
                  sortParam !== "l2h" && setLoading("l2h");
                }}
              >
                Price -- Low to High{" "}
                {isLoading === "l2h" && (
                  <Loader2 className="animate-spin" size={15} />
                )}
              </button>
            </li>
            <li>
              <button
                className="menu-item flex w-full items-center justify-between"
                onClick={() => {
                  router.push(
                    pathname ? pathname + "?sort=h2l" : `/store?sort=h2l`,
                  );
                  sortParam !== "h2l" && setLoading("h2l");
                }}
              >
                Price -- High to Low
                {isLoading === "h2l" && (
                  <Loader2 className="animate-spin" size={15} />
                )}
              </button>
            </li>
            <li>
              <button
                className="menu-item flex w-full items-center justify-between"
                onClick={() => {
                  router.push(
                    pathname ? pathname + "?sort=latest" : `/store?sort=latest`,
                  );
                  sortParam !== "latest" && setLoading("latest");
                }}
              >
                Latest First
                {isLoading === "latest" && (
                  <Loader2 className="animate-spin" size={15} />
                )}
              </button>
            </li>
          </ul>
        </ul>
      </div>
    </div>
  );
};
