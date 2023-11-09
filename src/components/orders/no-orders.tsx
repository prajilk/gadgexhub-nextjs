import Image from "next/image";
import LinkButton from "../shared/link-button";

const NoOrders = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-white p-5 text-center">
      <Image src="/NoOrder.gif" alt="" width={150} height={150} />
      <h1 className="text-xl font-medium">
        You haven&apos;t placed any order yet.
      </h1>
      <p className="my-3 text-sm text-muted-foreground">
        When you do, their status will appear here.
      </p>
      <LinkButton href="/store" className="mb-3 rounded-md">
        Explore our products
      </LinkButton>
    </div>
  );
};

export default NoOrders;
