"use client";

import { useAllOrders } from "@/api-hooks/orders/get-all-orders";
import OrderCard from "./order-card";
import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { Loader2 } from "lucide-react";
import NoOrders from "./no-orders";

const OrderOverview = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useAllOrders();

  const lastOrderRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastOrderRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && data?.pages.at(-1)?.orders.length !== 0)
      fetchNextPage();
  }, [entry, data?.pages, fetchNextPage]);

  return (
    <>
      {!data || data.pages.length === 0 || data.pages[0].orders.length === 0 ? (
        <NoOrders />
      ) : (
        data?.pages.map(({ orders }, i) => (
          <div key={i}>
            {orders?.map((order, j) => (
              <div
                key={order.orderId}
                ref={j === orders.length - 1 ? ref : undefined}
              >
                <OrderCard {...order} />
              </div>
            ))}
          </div>
        ))
      )}
      {isFetchingNextPage && (
        <div className="mt-5 flex w-full items-center justify-center">
          <Loader2 className="animate-spin" size={30} />
        </div>
      )}
    </>
  );
};

export default OrderOverview;
