import Skeleton from "./skeleton";

const SkeletonDeliveryAddress = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <Skeleton className="my-3 h-4 w-[90%]" />
      <div className="flex gap-3">
        <Skeleton className="h-4 w-[30%]" />
        <Skeleton className="h-4 w-[30%]" />
      </div>
    </div>
  );
};

export default SkeletonDeliveryAddress;
