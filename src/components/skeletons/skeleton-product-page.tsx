import { repeat } from "@/lib/utils";
import Container from "../container";
import Skeleton from "./skeleton";

const SkeletonProductPage = () => {
  return (
    <Container>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-evenly md:flex-row md:items-start">
        <div className="flex w-full flex-col gap-y-5 md:sticky md:top-28 md:w-[50%]">
          <div className="flex flex-col-reverse items-start gap-5 md:flex-row">
            <div className="sticky top-5 flex gap-x-4 gap-y-4 md:flex-col">
              {repeat(3).map((index) => (
                <Skeleton className="h-14 w-14 flex-shrink-0" key={index} />
              ))}
            </div>
            <div className="mx-auto flex aspect-[29/30] w-full md:sticky md:top-32 md:w-[80%]">
              <Skeleton className="h-full w-full flex-shrink-0 flex-grow-0" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-y-1 py-8 md:sticky md:top-20 md:max-w-[344px] md:py-0 lg:max-w-[500px]">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-5 w-32 rounded-md" />
          <Skeleton className="mt-5 h-7 w-[30%]" />
          <Skeleton className="h-5 w-[50%]" />
          <div className="my-6 space-y-3">
            <Skeleton className="h-7 w-[30%]" />
            <div className="flex gap-3">
              {repeat(2).map((index) => (
                <Skeleton className="h-14 w-14 flex-shrink-0" key={index} />
              ))}
            </div>
            <div className="space-y-3 pt-5">
              {repeat(2).map((index) => (
                <Skeleton className="h-12 w-full rounded-none" key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SkeletonProductPage;
