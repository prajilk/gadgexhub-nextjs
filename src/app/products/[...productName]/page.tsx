const ProductPage = ({ params }: { params: { productName: string } }) => {
    return (
        <div className="mt-40">
            <h1>{params.productName}</h1>
        </div>
    );
};

export default ProductPage;
