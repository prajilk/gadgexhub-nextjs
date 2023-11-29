import Skeleton from "./skeleton";

const SkeletonSearchResult = () => {
  return (
    <div className="flex gap-3 border-b px-1 py-2">
      <Skeleton className="h-14 w-20 md:w-16" />
      <div className="w-full space-y-2">
        <Skeleton className="h-5 w-[60%]" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
};

export default SkeletonSearchResult;
