import Container from "../container";
import Categories from "./categories";

const StoreTemplate = ({
  categories,
  children,
}: {
  categories?: string[];
  children: React.ReactNode;
}) => {
  return (
    <Container className="pt-0 lg:pt-10">
      <div className="grid grid-cols-4 gap-1 lg:gap-4">
        <Categories categoryParamsArray={categories} />
        <div className="col-span-4 lg:col-span-3">{children}</div>
      </div>
    </Container>
  );
};

export default StoreTemplate;
