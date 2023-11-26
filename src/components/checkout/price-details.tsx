import { formatCurrency } from "@/lib/utils";
import PlaceOrder from "./place-order";

type PriceDetailsProps = {
  subtotal: number;
  total: number;
};

const PriceDetails = ({ subtotal, total }: PriceDetailsProps) => {
  return (
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
      <PlaceOrder />
    </div>
  );
};

export default PriceDetails;
