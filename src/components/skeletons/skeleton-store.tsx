import Skeleton from "./skeleton";
import { repeat } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Container from "../container";

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
          <Skeleton className="mt-4 h-6 w-40" />
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
              <div className="aspect-square w-full space-y-2 p-2" key={i}>
                <div className="aspect-square w-full">
                  <Skeleton className="h-full w-full rounded-2xl" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-12" />
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
