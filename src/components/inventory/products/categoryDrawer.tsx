import Drawer from "@/components/drawer";
import { FormikProvider } from "formik";
import React from "react";
import { InitialInventoryState } from "./constants";
import { CloseIcon } from "@/utils/images/icons/closeIcon";
import AddIcon from "@/utils/images/icons/addIcon";
import CreateCategory from "./createCategory";
import CategoryCard from "../cards/categorycard";
import { ToDelete } from ".";

const CategoryDrawer = ({
  show,
  setShow,
  formik,
  initialState,
  setInitialState,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  getProductByCategory,
  title,
}: any) => {
  return (
    <Drawer show={show} setShow={setShow}>
      <FormikProvider value={formik}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <div className="flex justify-between items-center">
            <p className="text-2xl mb-3">Categories</p>
            {initialState.newCategory ? (
              <CloseIcon
                className="w-6 h-6 cursor-pointer"
                onClick={(e: any) => {
                  e.preventDefault();
                  setInitialState((prev: InitialInventoryState) => ({
                    ...prev,
                    newCategory: false,
                  }));
                }}
              />
            ) : (
              <AddIcon
                className="w-6 h-6 cursor-pointer"
                onClick={(e: any) => {
                  e.preventDefault();
                  setInitialState((prev: InitialInventoryState) => ({
                    ...prev,
                    newCategory: true,
                  }));
                }}
              />
            )}
          </div>
          <ul
            role="list"
            className="space-y-4 border-b pb-6 text-sm font-medium text-gray-900"
          >
            <CreateCategory
              initialState={initialState}
              formik={formik}
              deleteCategoryById={() => {
                deleteCategoryById();
                setShow();
              }}
            />
            {initialState.categoryList?.length > 1 ? (
              <>
                <CategoryCard
                  key={`All Category`}
                  category={"All Category"}
                  productCount={initialState.totalproducts}
                  onClick={() => {
                    getAllCategory();
                    setShow();
                  }}
                  id={""}
                  categorySelected={initialState.categorySelected}
                />

                {initialState.categoryList?.map((item: any, index: number) => (
                  <CategoryCard
                    key={`${item.category}-${index}`}
                    id={item.id}
                    categorySelected={initialState.categorySelected}
                    category={item?.categoryName}
                    productCount={item?.productsCount}
                    onClick={() => {
                      getProductByCategory(item.id);
                      setShow();
                    }}
                    onEditClick={() => getCategoryById(item.id)}
                    onDeleteClick={() =>
                      setInitialState((prev: InitialInventoryState) => ({
                        ...prev,
                        categorySelected: item.id,
                        deleteModal: {
                          deleteId: item.id,
                          deleteType: ToDelete.CATEGORY,
                        },
                      }))
                    }
                  />
                ))}
              </>
            ) : null}
          </ul>
        </form>
      </FormikProvider>
    </Drawer>
  );
};

export default CategoryDrawer;
