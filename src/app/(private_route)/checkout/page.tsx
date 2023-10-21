import DeliveryAddress from "@/components/checkout/delivery-address";
import ItemSummary from "@/components/checkout/item-summary";
import PaymentOptions from "@/components/checkout/payment-options";
import PriceDetails from "@/components/checkout/price-details";
import Container from "@/components/container";

const Checkout = () => {
  return (
    <Container className="py-0 md:py-0">
      <h1 className="text-center text-3xl">Checkout</h1>
      <div className="grid grid-cols-1 gap-3 py-5 md:grid-cols-5">
        <div className="col-span-3 mx-auto bg-white shadow">
          <div className="border-b px-5 py-3">
            <h2 className="text-muted-foreground">Order summary</h2>
          </div>
          <ItemSummary />
          <ItemSummary />
          <ItemSummary />
          <div className="mt-10 grid grid-cols-2 px-5">
            <PriceDetails />
          </div>
        </div>
        <div className="col-span-2">
          <DeliveryAddress />
          <PaymentOptions />
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
