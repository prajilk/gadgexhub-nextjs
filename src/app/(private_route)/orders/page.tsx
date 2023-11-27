import Container from "@/components/container";
import OrderOverview from "@/components/orders/order-overview";
import { getAllOrders } from "@/lib/api/order/get-all-orders";
import Hydrate from "@/lib/query-utils/hydrate-client";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Package } from "lucide-react";

const Orders = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(["orders"], getAllOrders);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Container>
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-5 bg-white p-5">
          <Package size={30} />
          <h1 className="mt-2 text-2xl font-semibold uppercase">My Orders</h1>
        </div>
        <Hydrate state={dehydratedState}>
          <OrderOverview />
        </Hydrate>
      </div>
    </Container>
  );
};

export default Orders;
