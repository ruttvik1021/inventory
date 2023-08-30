import DeleteButton from "@/components/deleteButton";
import PrimaryButton from "@/components/primaryButton";
import TextField from "@/components/textfield";

interface IProps {
  initialState: any;
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
          {initialState.editMode && (
            <DeleteButton
              text={"Delete"}
              onClick={() => deleteCategoryById(initialState.categorySelected)}
            />
          )}
          <PrimaryButton
            text={initialState.editMode ? "Update" : "Create"}
            onClick={(e: any) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          />
        </div>
      </div>
    )
  );
};

export default CreateCategory;
