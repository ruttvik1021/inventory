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
}

const CategoryCard = ({
  category,
  productCount,
  onClick,
  onEditClick,
  onDeleteClick,
  id,
}: ICategoryCard) => {
  return (
    <>
      <div className="rounded-lg border-indigo-200 grid grid-cols-1 sm:grid-cols-6 border-2 items-center">
        <div
          className="sm:col-span-4 hover:text-indigo-700 hover:font-bold p-4 cursor-pointer flex gap-2"
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
