"use client";
import {
  createCategoryApi,
  deleteCategoryByIdApi,
  getAllCategoriesApi,
  getAllProductsApi,
  getCategoryByIdApi,
  getProductByCategoryApi,
  getProductByIdApi,
  updateCategoryByIdApi,
} from "@/_api/inventory";
import ProductForm from "@/components/forms/productform";
import {
  IProduct,
  ProductInitialValues,
  ProductYup,
} from "@/components/forms/productform/constants";
import AddIcon from "@/utils/images/icons/addIcon";
import { CloseIcon } from "@/utils/images/icons/closeIcon";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import CategoryCard from "../cards/categorycard";
import ProductCard from "../cards/productcard";
import { InitialInventoryState } from "./constants";
import CreateCategory from "./createCategory";

const Products = () => {
  const [initialState, setInitialState] = useState<InitialInventoryState>({
    editCategory: false,
    newCategory: false,
    categorySelected: "",
    categoryList: [
      {
        categoryName: "All Category",
        id: "All",
        productsCount: 0,
      },
    ],
    productList: [
      {
        productName: "",
        categoryId: "",
        _id: "",
      },
    ],
    editProduct: false,
  });

  const getAllCategory = async () => {
    const { status, body } = await getAllCategoriesApi();
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        categoryList: body.categories,
      }));
    } else {
      toast.error(body.message);
    }
  };
  const getAllProduct = async () => {
    const { status, body } = await getAllProductsApi();
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        productList: body.products,
      }));
    } else {
      toast.error(body.message);
    }
  };
  const getCategoryById = async (id: string) => {
    const { status, body } = await getCategoryByIdApi(id);
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        editCategory: true,
        categorySelected: id,
        newCategory: true,
      }));
      categoryFormik.setValues(body.category);
    } else {
      toast.error(body.message);
    }
  };
  const getProductById = async (id: string) => {
    const { status, body } = await getProductByIdApi(id);
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        editProduct: true,
      }));
      productFormik.setValues(body.product);
      console.log(body.product);
    } else {
      toast.error(body.message);
    }
  };
  const getProductByCategory = async (id: string) => {
    const { status, body } =
      id === "All"
        ? await getAllCategoriesApi()
        : await getProductByCategoryApi(id);
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        productList: body.productList,
      }));
      productFormik.setValues(body.product);
      console.log(body.product);
    } else {
      toast.error(body.message);
    }
  };
  const deleteCategoryById = async (id: string) => {
    const { status, body } = await deleteCategoryByIdApi(id);
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        editCategory: false,
        newCategory: false,
      }));
      toast.success(body.message);
      getAllCategory();
    } else {
      toast.error(body.message);
    }
  };
  const updateCategoryById = async (values: any) => {
    const payload = { ...values, id: initialState.categorySelected };
    const { status, body } = await updateCategoryByIdApi(payload);
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        editCategory: false,
        newCategory: false,
      }));
      toast.success(body.message);
      getAllCategory();
    } else {
      toast.error(body.message);
    }
  };
  const createCat = async (payload: any) => {
    const { status, body } = await createCategoryApi(payload);
    if (status > 199 && status < 299) {
      toast.success(body.message);
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        newCategory: !prev.newCategory,
      }));
      getAllCategory();
      categoryFormik.resetForm();
    } else {
      toast.error(body.message);
    }
  };
  const categoryFormik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Required"),
    }),
    onSubmit: (values) =>
      initialState.editCategory
        ? updateCategoryById(values)
        : createCat(values),
  });
  const productFormik = useFormik({
    initialValues: ProductInitialValues,
    validationSchema: ProductYup,
    onSubmit: (values) =>
      initialState.editCategory
        ? updateCategoryById(values)
        : createCat(values),
  });

  useEffect(() => {
    getAllCategory();
    getAllProduct();
  }, []);

  const resetCategoryModes = () => {
    setInitialState((prev: InitialInventoryState) => ({
      ...prev,
      editCategory: false,
      editProduct: false,
      newCategory: false,
      categorySelected: "",
    }));
    categoryFormik.resetForm();
  };

  useEffect(() => {
    if (initialState.newCategory === false) {
      resetCategoryModes();
    }
  }, [initialState.newCategory]);

  return (
    <>
      <div className="bg-white">
        <div>
          <section aria-labelledby="products-heading" className="pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
              <FormikProvider value={categoryFormik}>
                <form onSubmit={categoryFormik.handleSubmit}>
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
                      formik={categoryFormik}
                      deleteCategoryById={deleteCategoryById}
                    />
                    {initialState.categoryList?.length ? (
                      <>
                        <CategoryCard
                          key={`All Category`}
                          category={"All Category"}
                          productCount={initialState.productList?.length || 0}
                          onClick={() => getAllCategory()}
                        />

                        {initialState.categoryList?.map(
                          (item: any, index: number) => (
                            <CategoryCard
                              key={`${item.category}-${index}`}
                              category={item?.categoryName}
                              productCount={item?.productsCount}
                              onClick={() => getProductByCategory(item.id)}
                              onEditClick={() => getCategoryById(item.id)}
                              onDeleteClick={() => deleteCategoryById(item.id)}
                            />
                          )
                        )}
                      </>
                    ) : null}
                  </ul>
                </form>
              </FormikProvider>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                    {!initialState.editProduct ? (
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {initialState.productList.length
                          ? initialState.productList?.map((item: any) => (
                              <ProductCard
                                product={item}
                                categoryName={
                                  initialState.categoryList?.find(
                                    (e) => item.categoryId === e.id
                                  )?.categoryName || ""
                                }
                                onClick={() => getProductById(item._id)}
                              />
                            ))
                          : "No Product to Show"}
                      </div>
                    ) : (
                      <FormikProvider value={productFormik}>
                        <form onSubmit={productFormik.handleSubmit}>
                          <ProductForm
                            categoryList={initialState.categoryList}
                            formik={productFormik}
                            close={() =>
                              setInitialState(
                                (prev: InitialInventoryState) => ({
                                  ...prev,
                                  editProduct: false,
                                })
                              )
                            }
                          />
                        </form>
                      </FormikProvider>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Products;
