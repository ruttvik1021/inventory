import Image from "next/image";

interface IProductCard {
  id: string;
  openingStock?: string;
  productName: string;
  price?: string;
  currentStock?: number;
  lowQuantity?: number;
}

interface IProps {
  product: IProductCard;
  onClick?: () => void;
  categoryName: string;
}

const ProductCard = ({ product, onClick, categoryName }: IProps) => {
  const { id, productName, price, openingStock, currentStock, lowQuantity } =
    product;
  return (
    <>
      <div
        key={id || ""}
        className="group relative border-black border-2 rounded-md p-2 cursor-pointer bg-gray-200"
        onClick={onClick}
      >
        <div className="flex-col items-baseline">
          <div className="mb-2">
            <p className="text-xl font-bold text-gray-700">{productName}</p>
            <p className="text-lg text-gray-700">{categoryName}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{price || ""}</p>
          <div>
            <p className="font-bold">
              Opening Stock:{" "}
              <span className="font-normal">{openingStock || 0}</span>
            </p>
            <p className="font-bold">
              Current Stock:{" "}
              <span className="font-normal">{currentStock || 0}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
