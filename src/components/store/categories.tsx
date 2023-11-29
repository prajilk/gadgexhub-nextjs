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
      <div className="sticky top-0 z-20 col-span-4 flex justify-around border-y bg-white p-3 lg:hidden">
        <SortSm />
        <div className="border-r border-gray-300" />
        <FilterSm categories={categories} />
      </div>
    </>
  );
};

export default Categories;
