import DeleteIcon from "@/utils/images/icons/deleteIcon";
import EditIcon from "@/utils/images/icons/editIcon";

interface ICategoryCard {
  category: string;
  productCount?: number;
  onClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  index?: number;
  id?: string;
  categorySelected?: string;
}

const CategoryCard = ({
  category,
  productCount,
  onClick,
  onEditClick,
  onDeleteClick,
  categorySelected,
  id,
}: ICategoryCard) => {
  return (
    <>
      <div
        className={`flex justify-between rounded-lg border-indigo-200 border-2 items-center ${
          categorySelected === id ? "bg-indigo-300" : ""
        }`}
      >
        <div
          className="over:text-indigo-700 hover:font-bold p-4 cursor-pointer flex gap-2"
          onClick={onClick}
        >
          <p>{category}</p>
          <p>{`(${productCount})`}</p>
        </div>
        {id !== "All" && (
          <div className="sm:col-span-2 flex justify-around gap-1 p-4">
            {onEditClick && <EditIcon onClick={onEditClick} />}
            {onDeleteClick && <DeleteIcon onClick={onDeleteClick} />}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryCard;
