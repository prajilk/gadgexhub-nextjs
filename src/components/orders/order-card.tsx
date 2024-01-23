import Image from "next/image";
import LinkButton from "../shared/link-button";
import { formateDateString } from "@/lib/utils";

type OrderCardProps = {
  imageUrl: string[];
  orderId: string;
  orderDate: Date;
  status: string;
  payment_verified: boolean;
};

const statusColor = (status: string, payment_verified: boolean) => {
  if (status === "pending") {
    if (!payment_verified) return "text-danger-500";
    else return "text-warning";
  }
  return "text-success";
};

const OrderCard = ({
  imageUrl,
  orderId,
  orderDate,
  status,
  payment_verified,
}: OrderCardProps) => {
  return (
    <div className="mt-5 bg-white p-5">
      <div className="grid w-full grid-cols-3">
        <h1
          className={`mb-1 text-xs font-semibold uppercase tracking-widest ${statusColor(
            status,
            payment_verified,
          )} md:text-sm`}
        >
          ORDER {payment_verified ? status : "FAILED"}
        </h1>
        <div>
          <h1 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 md:text-sm">
            ORDER NO.:
          </h1>
          <p className="text-xs md:text-sm">{orderId}</p>
        </div>
        <div className="text-right">
          <h1 className="mb-1 text-xs font-semibold tracking-widest text-gray-400 md:text-sm">
            ORDER DATE:
          </h1>
          <p className="text-xs md:text-sm">{formateDateString(orderDate)}</p>
        </div>
      </div>
      <hr className="my-3" />
      <div className="relative mt-5 flex gap-2">
        <div className="relative z-30 flex-shrink-0 flex-grow-0 rounded-md shadow-md">
          <Image
            src={process.env.NEXT_PUBLIC_IMAGE_URL + imageUrl[0]}
            alt="product image"
            className="rounded-md border border-gray-300 bg-gray-100"
            width={100}
            height={100}
          />
        </div>
        {imageUrl.slice(1, 3).map((url, index) => (
          <div
            key={index}
            className={`absolute flex-shrink-0 -top-${index + 1 * 1} left-${
              index * 1 + 2
            } z-${20 - index * 10} flex-grow-0 rounded-md shadow-md`}
          >
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE_URL + url}
              alt="product image"
              className="rounded-md border border-gray-300 bg-gray-100"
              width={100}
              height={100}
            />
          </div>
        ))}
        <h2 className="ms-3 self-center text-sm font-semibold tracking-widest md:ms-10 md:text-base">
          {imageUrl.length} items in this order
        </h2>
      </div>
      <div className="mt-3 flex items-center justify-end">
        <LinkButton
          size="sm"
          href={`/orders/${orderId}`}
          variant="bordered"
          radius="sm"
          className="border"
        >
          VIEW ORDER
        </LinkButton>
      </div>
    </div>
  );
};

export default OrderCard;
