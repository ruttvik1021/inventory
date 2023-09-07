import Image from "next/image";

interface IProductCard {
  id: string;
  image?: string;
  productName: string;
  price?: string;
}

interface IProps {
  product: IProductCard;
  onClick?: () => void;
  categoryName: string;
}

const ProductCard = ({ product, onClick, categoryName }: IProps) => {
  const { id, image, productName, price } = product;
  return (
    <>
      <div
        key={id || ""}
        className="group relative border-black border-2 rounded-md p-2 cursor-pointer bg-gray-200"
        onClick={onClick}
      >
        <div className="flex-col items-baseline">
          {/* <div>
            <Image src={image || ""} alt={"Image"} width={100} height={100} />
          </div> */}
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
