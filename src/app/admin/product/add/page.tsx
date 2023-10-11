import Container from "@/components/container";
import AddProductForm from "@/components/form/admin/add-product-form";

const AddProduct = () => {
  return (
    <Container className="py-14 md:py-14">
      <div className="flex w-full flex-col justify-start bg-white">
        <div className="w-full rounded-lg bg-white">
          <h1 className="my-2 text-center text-xl font-semibold">
            Add Product
          </h1>
          <AddProductForm />
        </div>
      </div>
    </Container>
  );
};

export default AddProduct;
