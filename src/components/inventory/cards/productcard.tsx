import React from "react";

interface IProductCard {
  id: string;
  imageSrc: string;
  name: string;
  category: string;
  price: string;
}

interface IProps {
  product: IProductCard;
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: IProps) => {
  const { id, imageSrc, name, category, price } = product;
  return (
    <>
      <div
        key={id}
        className="group relative border-black border-2 rounded-lg p-2 cursor-pointer"
        onClick={onClick}
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-52">
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-contain object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <p className="text-lg text-gray-700">{name}</p>
            <p className="text-lg text-gray-700">{category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
