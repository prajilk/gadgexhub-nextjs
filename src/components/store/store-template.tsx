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
    <Container>
      <div className="grid grid-cols-4 gap-4 pt-7 lg:pt-0">
        <Categories categoryParamsArray={categories} />
        <div className="col-span-4 lg:col-span-3">{children}</div>
      </div>
    </Container>
  );
};

export default StoreTemplate;
