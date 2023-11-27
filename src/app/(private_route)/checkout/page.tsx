import DeliveryAddress from "@/components/checkout/delivery-address";
import ItemSummary from "@/components/checkout/item-summary";
import PriceDetails from "@/components/checkout/price-details";
import Container from "@/components/container";
import { getAddressServer } from "@/lib/api/address/get-address";
import { getCheckout } from "@/lib/api/checkout/get-checkout";
import { Hydrate, QueryClient, dehydrate } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const Checkout = async () => {
  revalidatePath("/checkout", "layout");
  const data = await getCheckout();
  if (!data) redirect("/");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["user", "address"], getAddressServer);
  const dehydratedState = dehydrate(queryClient);

  const subtotal =
    data.products?.reduce((acc, curr) => acc + curr.basePrice, 0) || 0;
  const total =
    data.products?.reduce((acc, curr) => acc + curr.offerPrice, 0) || 0;

  return (
    <Container className="py-0 md:py-0">
      <h1 className="text-center text-3xl">Checkout</h1>
      <div className="mx-auto max-w-3xl py-5">
        <Hydrate state={dehydratedState}>
          <DeliveryAddress />
        </Hydrate>
        <div className="w-full bg-white pb-7 shadow">
          <div className="border-b px-5 py-3">
            <h2 className="text-muted-foreground">Order summary</h2>
          </div>
          {data?.products?.map((product, i) => (
            <ItemSummary
              key={i}
              imageUrl={product.image}
              basePrice={product.basePrice}
              quantity={product.quantity}
              title={product.title}
            />
          ))}
          <div className="mt-10 grid grid-cols-2 px-5">
            <PriceDetails total={total} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
