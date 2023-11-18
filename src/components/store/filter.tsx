import { CategoryStructure } from "@/lib/types/types";
import { makeCategoryUrl } from "@/lib/utils";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export const FilterSm = ({
  categories,
}: {
  categories: CategoryStructure | null;
}) => {
  return (
    <div>
      <input type="checkbox" id="filter-bottom" className="drawer-toggle" />

      <label
        htmlFor="filter-bottom"
        className="flex items-center gap-2 tracking-widest"
      >
        <SlidersHorizontal size={15} />
        Filter
      </label>
      <label
        style={{ height: "100vh" }}
        className="overlay"
        htmlFor="filter-bottom"
      ></label>
      <div className="drawer drawer-bottom">
        <div className="flex h-full flex-col pb-10">
          <div className="border-b p-2">
            <h2 className="uppercase tracking-wider text-muted-foreground">
              Filter
            </h2>
          </div>
          <ul className="m-3 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            <li>
              <Link href={"/store"}>All</Link>
            </li>
            {categories?.parents.map((parent, i) => (
              <Fragment key={i}>
                <ChevronRight size={13} />
                <li>
                  <Link href={makeCategoryUrl(categories?.parents, parent)}>
                    {parent}
                  </Link>
                </li>
              </Fragment>
            ))}
          </ul>
          <ul className="scrollbar-thin max-h-[350px] overflow-y-scroll text-sm">
            <CategoryList categories={categories} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export const FilterLg = ({
  categories,
}: {
  categories: CategoryStructure | null;
}) => {
  return (
    <div className="col-span-1 mt-2 hidden h-fit w-full rounded-lg bg-white p-3 lg:block">
      <ul className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <li>
          <Link href={"/store"}>All</Link>
        </li>
        {categories?.parents.map((parent, i) => (
          <Fragment key={i}>
            <ChevronRight size={13} />
            <li>
              <Link href={makeCategoryUrl(categories?.parents, parent)}>
                {parent}
              </Link>
            </li>
          </Fragment>
        ))}
      </ul>
      <h1 className="mt-4 text-sm font-semibold">Categories</h1>
      <hr className="my-1" />
      <ul className="text-sm">
        <CategoryList categories={categories} />
      </ul>
    </div>
  );
};

function CategoryList({
  categories,
}: {
  categories: CategoryStructure | null;
}) {
  return categories?.child.length !== 0 ? (
    categories?.child.map((item, i) => (
      <li key={i}>
        <Link
          href={
            makeCategoryUrl(
              categories?.parents,
              categories.parents.at(-1) || "",
            ) + `/${item.toLowerCase().replace(/[\/. ]/g, "-")}`
          }
          className="menu-item"
        >
          {item}
        </Link>
      </li>
    ))
  ) : (
    <li>
      <Link
        href={makeCategoryUrl(
          categories?.parents,
          categories.parents.at(-1) || "",
        )}
        className="menu-item"
      >
        {categories.parents.at(-1)}
      </Link>
    </li>
  );
}
