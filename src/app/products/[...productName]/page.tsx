import Container from "@/components/Container";

const ProductPage = ({ params }: { params: { productName: string } }) => {
  return (
    <Container>
      <h1>{params.productName}</h1>
    </Container>
  );
};

export default ProductPage;
