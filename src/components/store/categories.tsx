import { getCategoryTree } from "@/lib/api/get-category-tree";
import { SortLg, SortSm } from "./sort";
import { FilterLg, FilterSm } from "./filter";

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
        <SortLg />
      </div>

      {/* Filter For small devices */}
      <div className="navbar-sticky top-24 z-40 col-span-4 flex justify-around border-y bg-white p-3 lg:hidden">
        <FilterSm categories={categories} />
        <div className="border-r border-gray-300" />
        <SortSm />
      </div>
    </>
  );
};

export default Categories;
