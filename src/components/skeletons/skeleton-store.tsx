import Container from "@/components/container";
import Skeleton from "@/components/skeletons/skeleton";
import { repeat } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const SkeletonStore = () => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-4 pt-7 lg:pt-0">
        <div className="col-span-1 hidden h-fit w-full rounded-lg bg-white p-3 lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <Skeleton className="h-4 w-7" />
            </li>
            <ChevronRight size={13} />
            <li>
              <Skeleton className="h-4 w-20" />
            </li>
          </ul>
          <Skeleton className="mt-4 h-5 w-40" />
          <hr className="my-2" />
          <ul className="space-y-2">
            {repeat(3).map((_, i) => (
              <li key={i}>
                <Skeleton className="ms-4 h-5 w-36" />
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-4 lg:col-span-3">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {repeat(8).map((_, i) => (
              <div
                className="flex aspect-square w-full flex-col space-y-2 p-0.5"
                key={i}
              >
                <div className="flex flex-1 flex-col rounded-lg bg-white p-2">
                  <div className="aspect-square w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="mt-5 flex flex-1 flex-col justify-between gap-1">
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SkeletonStore;
