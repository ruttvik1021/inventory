import DeleteButton from "@/components/deleteButton";
import PrimaryButton from "@/components/primaryButton";
import TextField from "@/components/textfield";
import { InitialInventoryState } from "./constants";

interface IProps {
  initialState: InitialInventoryState;
  formik: any;
  deleteCategoryById: (id: string) => void;
}

const CreateCategory = ({
  initialState,
  formik,
  deleteCategoryById,
}: IProps) => {
  return (
    initialState.newCategory && (
      <div>
        <div>
          <TextField
            type={"text"}
            label={"Category Name"}
            name={"categoryName"}
            placeholder={"Category Name"}
          />
        </div>
        <div className="flex justify-between mt-2 p-1 gap-2">
          <PrimaryButton
            text={initialState.editCategory ? "Update" : "Create"}
            onClick={(e: any) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="w-full"
          />
        </div>
      </div>
    )
  );
};

export default CreateCategory;
