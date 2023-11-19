import { getCategoryTree } from "@/lib/api/get-category-tree";
import { SortLg, SortSm } from "./sort";
import { FilterLg, FilterSm } from "./filter";
import { ArrowDownUp } from "lucide-react";

const Categories = async ({
  categoryParamsArray,
}: {
  categoryParamsArray?: string[];
}) => {
  const categories = await getCategoryTree(categoryParamsArray?.at(-1));

  return (
    <>
      {/* Filter For large devices */}
      <div>
        <FilterLg categories={categories} />
        {categoryParamsArray && <SortLg />}
      </div>

      {/* Filter For small devices */}
      <div className="navbar-sticky top-24 z-40 col-span-4 flex justify-around border-y bg-white p-3 md:top-[6.75rem] lg:hidden">
        {categoryParamsArray ? (
          <SortSm />
        ) : (
          <div className="flex items-center gap-2 tracking-widest text-gray-400">
            <ArrowDownUp size={15} />
            Sort
          </div>
        )}
        <div className="border-r border-gray-300" />
        <FilterSm categories={categories} />
      </div>
    </>
  );
};

export default Categories;
