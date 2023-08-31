import React from "react";

interface IProductCard {
  _id: string;
  imageSrc?: string;
  productName: string;
  price?: string;
}

interface IProps {
  product: IProductCard;
  onClick?: () => void;
  categoryName: string;
}

const ProductCard = ({ product, onClick, categoryName }: IProps) => {
  const { _id, imageSrc, productName, price } = product;
  return (
    <>
      <div
        key={_id || ""}
        className="group relative border-black border-2 rounded-lg p-2 cursor-pointer"
        onClick={onClick}
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-52">
          <img
            src={imageSrc || ""}
            alt={productName}
            className="h-full w-full object-contain object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-lg text-gray-700">{productName}</p>
            <p className="text-lg text-gray-700">{categoryName}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{price || ""}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
