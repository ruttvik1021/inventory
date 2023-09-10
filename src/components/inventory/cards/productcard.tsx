import PrimaryButton from "@/components/primaryButton";
import DeleteIcon from "@/utils/images/icons/deleteIcon";
import ViewIcon from "@/utils/images/icons/viewIcon";

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
  onDeleteClick?: any;
  viewStocks?: any;
}

const ProductCard = ({
  product,
  onClick,
  categoryName,
  onDeleteClick,
  viewStocks,
}: IProps) => {
  const { productName, price, openingStock, currentStock } = product;
  return (
    <>
      <div className="group relative border-black border-2 rounded-md p-2 bg-gray-200">
        <div
          className="flex-col items-baseline cursor-pointer"
          onClick={onClick}
        >
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
        <div className="flex justify-between items-center border-t-2 border-indigo-500 pt-2 mt-1">
          <DeleteIcon onClick={onDeleteClick} />
          <PrimaryButton onClick={viewStocks} text={"Stocks"} />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
