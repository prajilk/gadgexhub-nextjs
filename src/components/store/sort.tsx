"use client";

import { ArrowDownUp, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const SortSm = () => {
  const sortParam = useSearchParams().get("sort");
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [sortSelected, setSortSelected] = useState({
    l2h: false,
    h2l: false,
    latest: false,
    popular: false,
  });

  useEffect(() => {
    setLoading(false);
    setSortSelected({
      l2h: sortParam === "l2h",
      h2l: sortParam === "h2l",
      latest: sortParam === "latest",
      popular: sortParam === "popular",
    });
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
      <Sheet>
        <SheetTrigger className="flex items-center gap-2 tracking-widest">
          <ArrowDownUp size={15} />
          Sort
        </SheetTrigger>
        <SheetContent side={"bottom"} className="p-1">
          <div className="flex h-full flex-col pb-10">
            <div className="border-b p-2">
              <h2 className="uppercase tracking-wider text-muted-foreground">
                Sort
              </h2>
            </div>
            <ul className="scrollbar-thin max-h-[350px] overflow-y-scroll pt-3 text-sm">
              <li>
                <label
                  className="menu-item flex w-full items-center justify-between"
                  htmlFor="sort-bottom"
                  onClick={() => {
                    router.push(
                      pathname
                        ? pathname + "?sort=popular"
                        : `/store?sort=popular`,
                    );
                    sortParam !== "popular" && setLoading(true);
                  }}
                >
                  Popular
                  <input
                    checked={sortSelected.popular}
                    onChange={() =>
                      setSortSelected((prev) => ({
                        ...prev,
                        popular: !prev.popular,
                      }))
                    }
                    type="radio"
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
                      pathname ? pathname + "?sort=l2h" : `/store?sort=l2h`,
                    );
                    sortParam !== "l2h" && setLoading(true);
                  }}
                >
                  Price -- Low to High
                  <input
                    checked={sortSelected.l2h}
                    onChange={() =>
                      setSortSelected((prev) => ({ ...prev, l2h: !prev.l2h }))
                    }
                    type="radio"
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
                    checked={sortSelected.h2l}
                    onChange={() =>
                      setSortSelected((prev) => ({ ...prev, h2l: !prev.h2l }))
                    }
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
                      pathname
                        ? pathname + "?sort=latest"
                        : `/store?sort=latest`,
                    );
                    sortParam !== "latest" && setLoading(true);
                  }}
                >
                  Latest First
                  <input
                    type="radio"
                    checked={sortSelected.latest}
                    onChange={() =>
                      setSortSelected((prev) => ({
                        ...prev,
                        latest: !prev.latest,
                      }))
                    }
                    className="accent-black"
                  />
                </label>
              </li>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
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
