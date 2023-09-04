interface IProductCard {
  id: string;
  images?: string;
  productName: string;
  price?: string;
}

interface IProps {
  product: IProductCard;
  onClick?: () => void;
  categoryName: string;
}

const ProductCard = ({ product, onClick, categoryName }: IProps) => {
  const { id, images, productName, price } = product;
  return (
    <>
      <div
        key={id || ""}
        className="group relative border-black border-2 rounded-lg p-2 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-bold text-gray-700">{productName}</p>
            <p className="text-lg text-gray-700">{categoryName}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{price || ""}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
