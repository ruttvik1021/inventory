import React from "react";

interface ICategoryCard {
  category: string;
  productCount: number;
  onClick?: () => void;
  index?: number;
}

const CategoryCard = ({
  category,
  productCount,
  onClick,
  index,
}: ICategoryCard) => {
  return (
    <div className="rounded-full border-indigo-200 hover:bg-indigo-100 cursor-pointer border-2 p-4 text-md">
      <p className="flex justify-between">
        <span>{category}</span>
        <span>{`(${productCount})`}</span>
      </p>
    </div>
  );
};

export default CategoryCard;
