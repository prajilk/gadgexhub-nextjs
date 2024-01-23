import Container from "@/components/container";
import ItemSummary from "@/components/orders/item-summary";
import { getOrder } from "@/lib/api/order/get-order";
import { formatCurrency, formateDateString } from "@/lib/utils";
import { Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const Order = async ({ params }: { params: { oid: string } }) => {
  const orderId = params.oid;
  if (!orderId) return notFound();

  const order = await getOrder(orderId);
  if (!order || !order.order?.orderItems || !order.order.address)
    return notFound();

  const subtotal =
    order.order.orderItems.reduce((acc, curr) => acc + curr.basePrice, 0) || 0;
  const total =
    order.order.orderItems.reduce((acc, curr) => acc + curr.offerPrice, 0) || 0;

  return (
    <Container>
      <div className="mx-auto w-full max-w-3xl rounded-md bg-white p-5">
        <h1 className="text-lg font-medium md:text-2xl">Order ID: {orderId}</h1>
        <p className="mt-1 text-xs text-muted-foreground md:text-sm">
          Ordered on:{" "}
          <span className="font-medium text-black">
            {formateDateString(order.order.orderDate)}
          </span>
        </p>
        <hr className="my-5" />
        {order.order.orderItems.map((orderItem, i) => (
          <Link
            href={`/store/${orderItem.slug}?pid=${orderItem.productId}${
              orderItem.color !== null
                ? "&" + new URLSearchParams({ color: orderItem.color })
                : ""
            }`}
            key={i}
          >
            <ItemSummary
              color={orderItem.color}
              imageUrl={orderItem.imageUrl}
              offerPrice={orderItem.offerPrice}
              quantity={orderItem.quantity}
              title={orderItem.title}
            />
          </Link>
        ))}
        <hr className="my-5" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="order-1 mt-5 md:mt-0">
            <h1 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Payment
            </h1>
            {order.order.payment_verified ? (
              <>
                <p className="mt-3 text-sm">{order.order.method}</p>
                <p className="text-sm">{order.order.via}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-red-500">
                  Payment Failed!
                </p>
              </>
            )}
          </div>
          <div className="-order-1 md:order-2">
            <h1 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Shipping address
            </h1>
            <div className="space-y-1 py-3 text-sm">
              <h2 className="flex-shrink-0 font-medium">
                {order.order.address.name}
              </h2>
              <div className="flex flex-wrap items-center gap-1">
                <p className="flex-shrink-0">{order.order.address.address},</p>
                <p className="flex-shrink-0">{order.order.address.locality},</p>
                <p className="flex-shrink-0">{order.order.address.district},</p>
                <p className="flex-shrink-0">
                  {order.order.address.state} - {order.order.address.pincode}
                </p>
              </div>
              <p className="me-2 inline-block">{order.order.address.phone},</p>
              <p className="inline-block">
                {order.order.address.alternate_phone}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="order-1 mt-3 md:mt-0">
            <hr className="py-3 md:hidden" />
            <h1 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Need Help?
            </h1>
            <Link
              href="https://mail.google.com/mail/?view=cm&fs=1&to=gadgexhub.store@gmail.com"
              target="_blank"
              className="my-2 flex items-center gap-1.5"
            >
              <Mail size={15} />
              <span className="text-sm font-medium text-gray-400">
                Contact us
              </span>
            </Link>
          </div>
          <div className="-order-1 md:order-2">
            <h1 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Order Summary
            </h1>
            <div className="col-span-2 md:col-start-2">
              <div className="my-2 grid grid-cols-2 text-[.9rem]">
                <p className="text-muted-foreground">Item Subtotal</p>
                <span className="text-right font-Roboto font-medium">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="my-2 grid grid-cols-2 text-[.9rem]">
                <p className="text-muted-foreground">Item Discount</p>
                <span className="text-right font-Roboto font-medium">
                  &#8722; {formatCurrency(subtotal - total)}
                </span>
              </div>
              <div className="my-2 grid grid-cols-2 text-[.9rem]">
                <p className="text-muted-foreground">Shipping Fee</p>
                <span className="text-right font-Roboto font-medium">
                  {formatCurrency(0)}
                </span>
              </div>
              <hr className="my-5" />
              <div className="my-2 grid grid-cols-2 items-center text-[.9rem]">
                <p className="text-muted-foreground">Total</p>
                <span className="font-roboto text-right font-Roboto text-xl font-medium">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Order;
