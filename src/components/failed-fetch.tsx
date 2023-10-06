import { Unplug } from "lucide-react";

const FailedFetch = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-fit rounded-full bg-gray-100 p-3">
        <Unplug size={60} className="animate-pulse" />
      </div>
      <span className="text-xl font-medium">Failed to fetch data</span>
    </div>
  );
};

export default FailedFetch;
