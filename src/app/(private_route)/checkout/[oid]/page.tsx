import LinkButton from "@/components/shared/link-button";
import { getOrder } from "@/lib/api/order/get-order";
import { ItemSummary } from "@/lib/types/types";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

const OrderConfirmed = async ({ params }: { params: { oid: string } }) => {
  const orderId = params.oid;
  if (!orderId) return notFound();

  const order = await getOrder(orderId);
  if (!order || !order.order?.orderItems || !order.order.address)
    return notFound();

  return (
    <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center rounded-xl bg-white p-5 md:p-10">
      <Image src="/check.png" alt="check icon" width={30} height={30} />
      <h1 className="mb-1 mt-5 text-xl font-semibold">
        We received your order!
      </h1>
      <p className="text-center text-xs md:text-sm">
        Your order <b>{params.oid}</b> is completed and ready to ship
      </p>
      <hr className="my-5 w-full border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-1 mt-5 md:mt-0">
          <h1 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Payment
          </h1>
          <p className="mt-3 text-sm">{order.order.method}</p>
          <p className="text-sm">{order.order.via}</p>
        </div>
        <div className="-order-1 md:order-2">
          <h1 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
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
      <hr className="my-5 w-full border-gray-300" />
      <div className="w-full">
        <h1 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Order items
        </h1>
        <div className="py-4">
          {order.order.orderItems.map((orderItem, i) => (
            <OrderItem {...orderItem} key={i} />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <p className="text-sm font-medium tracking-widest">Total</p>
        <span className="font-Roboto font-medium">
          {formatCurrency(
            order.order.orderItems.reduce(
              (acc, curr) => acc + curr.offerPrice,
              0,
            ),
          )}
        </span>
      </div>
      <hr className="my-5 w-full border-gray-300" />
      <LinkButton href="/orders" className="rounded-lg font-normal">
        Go to order
      </LinkButton>
    </div>
  );
};
export default OrderConfirmed;

function OrderItem(orderItem: ItemSummary) {
  return (
    <>
      <div className="flex items-center gap-4">
        <Image
          src={process.env.NEXT_PUBLIC_IMAGE_URL + orderItem.imageUrl}
          alt="product image"
          className="rounded-md border border-gray-300 bg-gray-100"
          width={60}
          height={60}
        />
        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
          <h3 className="max-w-md truncate text-sm">{orderItem.title}</h3>
          <div className="grid grid-cols-2">
            <p className="flex items-center gap-0.5 md:justify-center">
              <span className="text-xs">&#x2716;</span>
              {orderItem.quantity}
            </p>
            <h1 className="text-right font-Roboto font-medium">
              {formatCurrency(orderItem.offerPrice)}
            </h1>
          </div>
        </div>
      </div>
      <hr className="my-5 w-full border-gray-300" />
    </>
  );
}
