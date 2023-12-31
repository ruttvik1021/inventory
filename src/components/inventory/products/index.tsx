"use client";
import {
  addProductAPI,
  createCategoryApi,
  deleteCategoryByIdApi,
  deleteProductByIdApi,
  getAllCategoriesApi,
  getAllProductsApi,
  getCategoryByIdApi,
  getProductByCategoryApi,
  getProductByIdApi,
  getStocksOfProductApi,
  updateCategoryByIdApi,
  updateProductAPI,
  updateStockApi,
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
import ConfirmationModal from "@/components/confirmationModal";
import PrimaryButton from "@/components/primaryButton";
import ArrowIcon from "@/utils/images/icons/arrowIcon";
import moment from "moment";
import DeleteButton from "@/components/deleteButton";
import CategoryDrawer from "./categoryDrawer";
import Drawer from "@/components/drawer";
import Datepicker from "@/components/datePicker";
import FilterIcon from "@/utils/images/icons/filterIcon";
import { RadioGroup } from "@headlessui/react";

export const ToDelete = {
  CATEGORY: "CATEGORY",
  PRODUCT: "PRODUCT",
};

const Products = () => {
  const initialDeleteState = {
    deleteId: null,
    deleteType: "",
  };
  const [initialState, setInitialState] = useState<InitialInventoryState>({
    editCategory: false,
    newCategory: false,
    categorySelected: "",
    productSelected: "",
    categoryList: [
      {
        categoryName: "All Category",
        id: "All",
        productsCount: 0,
      },
    ],
    productList: [],
    totalproducts: 0,
    editProduct: false,
    viewProduct: false,
    deleteModal: initialDeleteState,
    categoryDrawer: false,
    stocksOfProduct: [],
    stockDates: {
      fromDate: moment().startOf("month").format("YYYY-MM-DD"),
      toDate: moment().endOf("month").format("YYYY-MM-DD"),
    },
    stocksView: false,
    stocksFilter: false,
    currentStock: 0,
    inventoryUpdateType: "REMOVE",
    inventoryQuantity: 0,
  });

  const categoryFormik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Required"),
    }),
    onSubmit: (values: any) =>
      initialState.editCategory
        ? updateCategoryById(values)
        : createCat(values),
  });
  const productFormik = useFormik({
    initialValues: ProductInitialValues,
    validationSchema: ProductYup,
    onSubmit: (values: any) =>
      initialState.productSelected ? updateProduct(values) : addProduct(values),
  });

  const getAllCategory = async () => {
    const { status, body } = await getAllCategoriesApi();
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        categorySelected: "",
        categoryList: body.categories,
      }));
      getAllProduct();
      resetCategoryModes();
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
        totalproducts: body.totalproducts,
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
        editProduct: false,
        viewProduct: true,
        productSelected: id,
      }));
      productFormik.setValues(body.product);
      productFormik.setFieldValue(
        "stockDate",
        moment(body.product.stockDate).format("YYYY-MM-DD")
      );
    } else {
      toast.error(body.message);
    }
  };
  const getStocksOfProduct = async (id: string) => {
    const { status, body } = await getStocksOfProductApi(
      id,
      initialState.stockDates
    );
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        stocksOfProduct: body.history,
        stocksView: true,
      }));
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
        editProduct: false,
        viewProduct: false,
        categorySelected: id,
      }));
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
        deleteModal: initialDeleteState,
      }));
      toast.success(body.message);
      getAllCategory();
    } else {
      toast.error(body.message);
    }
  };
  const deleteProductById = async (id: string) => {
    const { status, body } = await deleteProductByIdApi(id);
    if (status > 199 && status < 299) {
      setInitialState((prev: InitialInventoryState) => ({
        ...prev,
        editCategory: false,
        newCategory: false,
        deleteModal: initialDeleteState,
      }));
      toast.success(body.message);
      productFormik.resetForm();
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
  const addProduct = async (payload: any) => {
    let values = {
      ...payload,
      categoryId: payload.newCategory ? "" : payload.categoryId,
    };
    const { status, body } = await addProductAPI(values);
    if (status === 200) {
      toast.success(body.message);
      await getAllCategory();
      await getProductByCategoryApi(body.product.categoryId);
      productFormik.resetForm();
    } else {
      toast.error(body.message);
    }
  };

  const updateProduct = async (payload: any) => {
    const { status, body } = await updateProductAPI(
      payload,
      initialState.productSelected
    );
    if (status > 199 && status < 299) {
      toast.success(body.message);
      await getAllCategory();
      await getProductByCategoryApi(body.product.categoryId);
    }
  };
  const updateStock = async () => {
    let payload = {};
    if (initialState.inventoryUpdateType === "REMOVE") {
      payload = {
        quantityToRemove: initialState.inventoryQuantity,
      };
    } else {
      payload = {
        quantityToAdd: initialState.inventoryQuantity,
      };
    }
    const { status, body } = await updateStockApi(
      initialState.productSelected,
      payload,
      initialState.inventoryUpdateType
    );
    if (status > 199 && status < 299) {
      getAllProduct();
      getStocksOfProduct(initialState.productSelected);
    } else {
      toast.error(body.message);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const resetCategoryModes = () => {
    setInitialState((prev: InitialInventoryState) => ({
      ...prev,
      editCategory: false,
      editProduct: false,
      viewProduct: false,
      newCategory: false,
    }));
    categoryFormik.resetForm();
  };

  const deleteFunction = () => {
    if (initialState.deleteModal.deleteId) {
      switch (initialState.deleteModal.deleteType) {
        case ToDelete.CATEGORY:
          deleteCategoryById(initialState.deleteModal.deleteId);
          break;
        case ToDelete.PRODUCT:
          deleteProductById(initialState.deleteModal.deleteId);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <div className="bg-white">
        <div>
          <section aria-labelledby="products-heading" className="pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:gap-y-2 lg:grid-cols-4 ">
              <CategoryDrawer
                show={initialState.categoryDrawer}
                setShow={() =>
                  setInitialState((prev: InitialInventoryState) => ({
                    ...prev,
                    categoryDrawer: false,
                  }))
                }
                formik={categoryFormik}
                initialState={initialState}
                setInitialState={setInitialState}
                deleteCategoryById={deleteCategoryById}
                getAllCategory={getAllCategory}
                getCategoryById={getCategoryById}
                getProductByCategory={getProductByCategory}
                title={"Categories"}
              />
              <div className="hidden lg:block bg-gray-100 p-2 rounded-lg">
                <FormikProvider value={categoryFormik}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      categoryFormik.handleSubmit();
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
                        formik={categoryFormik}
                        deleteCategoryById={deleteCategoryById}
                      />
                      {initialState.categoryList?.length > 1 ? (
                        <>
                          <CategoryCard
                            key={`All Category`}
                            category={"All Category"}
                            productCount={initialState.totalproducts}
                            onClick={() => getAllCategory()}
                            id={""}
                            categorySelected={initialState.categorySelected}
                          />

                          {initialState.categoryList?.map(
                            (item: any, index: number) => (
                              <CategoryCard
                                key={`${item.category}-${index}`}
                                id={item.id}
                                categorySelected={initialState.categorySelected}
                                category={item?.categoryName}
                                productCount={item?.productsCount}
                                onClick={() => getProductByCategory(item.id)}
                                onEditClick={() => getCategoryById(item.id)}
                                onDeleteClick={() =>
                                  setInitialState(
                                    (prev: InitialInventoryState) => ({
                                      ...prev,
                                      categorySelected: item.id,
                                      deleteModal: {
                                        deleteId: item.id,
                                        deleteType: ToDelete.CATEGORY,
                                      },
                                    })
                                  )
                                }
                              />
                            )
                          )}
                        </>
                      ) : null}
                    </ul>
                  </form>
                </FormikProvider>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="bg-white">
                  <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    {!initialState.viewProduct && !initialState.editProduct ? (
                      <>
                        <div className="flex justify-between md:justify-end items-center mt-1 sm:gap-2">
                          <PrimaryButton
                            text={"Add Product"}
                            onClick={() =>
                              setInitialState(
                                (prev: InitialInventoryState) => ({
                                  ...prev,
                                  editProduct: true,
                                  viewProduct: false,
                                })
                              )
                            }
                          />
                          <PrimaryButton
                            text={"Categories"}
                            className="lg:hidden"
                            onClick={() =>
                              setInitialState(
                                (prev: InitialInventoryState) => ({
                                  ...prev,
                                  categoryDrawer: true,
                                })
                              )
                            }
                          />
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:gap-y-1 sm:grid-cols-4 lg:grid-cols-4 xl:gap-x-8">
                          {initialState.productList.length
                            ? initialState.productList?.map((item: any) => (
                                <ProductCard
                                  key={`${item.id}`}
                                  product={item}
                                  categoryName={
                                    initialState.categoryList?.find(
                                      (e) => item.categoryId === e.id
                                    )?.categoryName || ""
                                  }
                                  onClick={() => getProductById(item.id)}
                                  onDeleteClick={() =>
                                    setInitialState(
                                      (prev: InitialInventoryState) => ({
                                        ...prev,
                                        productSelected: item.id,
                                        deleteModal: {
                                          deleteId: item.id,
                                          deleteType: ToDelete.PRODUCT,
                                        },
                                      })
                                    )
                                  }
                                  viewStocks={() => {
                                    getStocksOfProduct(item.id);
                                    setInitialState(
                                      (prev: InitialInventoryState) => ({
                                        ...prev,
                                        productSelected: item.id,
                                        currentStock: item.currentStock,
                                      })
                                    );
                                  }}
                                />
                              ))
                            : "No Product to Show"}
                        </div>
                      </>
                    ) : (
                      <>
                        <FormikProvider value={productFormik}>
                          <form onSubmit={productFormik.handleSubmit}>
                            <div className="flex justify-between items-center mt-1">
                              <ArrowIcon
                                direction={"Left"}
                                onClick={() => {
                                  setInitialState(
                                    (prev: InitialInventoryState) => ({
                                      ...prev,
                                      editProduct: false,
                                      viewProduct: false,
                                      productSelected: "",
                                    })
                                  );
                                  productFormik.resetForm();
                                }}
                              />
                              <div className="flex justify-between gap-3">
                                {initialState.productSelected && (
                                  <DeleteButton
                                    text={"Delete"}
                                    onClick={() =>
                                      setInitialState(
                                        (prev: InitialInventoryState) => ({
                                          ...prev,
                                          deleteModal: {
                                            deleteId:
                                              initialState.productSelected,
                                            deleteType: ToDelete.PRODUCT,
                                          },
                                        })
                                      )
                                    }
                                  />
                                )}
                                <PrimaryButton
                                  text={
                                    initialState.editProduct ? "Cancel" : "Edit"
                                  }
                                  onClick={() =>
                                    setInitialState(
                                      (prev: InitialInventoryState) =>
                                        initialState.editProduct
                                          ? {
                                              ...prev,
                                              editProduct: !prev.editProduct,
                                              viewProduct: !prev.viewProduct,
                                            }
                                          : {
                                              ...prev,
                                              editProduct: true,
                                              viewProduct: false,
                                            }
                                    )
                                  }
                                />
                                {initialState.editProduct && (
                                  <PrimaryButton
                                    text={"Save"}
                                    type="submit"
                                    onClick={(e: any) => {
                                      e.preventDefault();
                                      productFormik.handleSubmit();
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                            <ProductForm
                              formik={productFormik}
                              initialState={initialState}
                              editMode={initialState.editProduct}
                              close={() =>
                                setInitialState(
                                  (prev: InitialInventoryState) => ({
                                    ...prev,
                                    editProduct: false,
                                    viewProduct: false,
                                  })
                                )
                              }
                            />
                          </form>
                        </FormikProvider>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ConfirmationModal
        show={initialState.deleteModal.deleteId ? true : false}
        text={initialState.deleteModal.deleteType.toLowerCase()}
        setShow={() =>
          setInitialState((prev: InitialInventoryState) => ({
            ...prev,
            deleteModal: initialDeleteState,
          }))
        }
        onClick={() => deleteFunction()}
      />
      {initialState.stocksView && (
        <Drawer
          show={initialState.stocksView}
          setShow={() =>
            setInitialState((prev: InitialInventoryState) => ({
              ...prev,
              stocksView: false,
              productSelected: "",
            }))
          }
        >
          <div className="p-3">
            <div className="flex justify-between">
              <p className="font-extrabold text-2xl">Stocks</p>
              <FilterIcon
                onClick={() =>
                  setInitialState((prev: InitialInventoryState) => ({
                    ...prev,
                    stocksFilter: !prev.stocksFilter,
                  }))
                }
                className={
                  initialState.stocksFilter
                    ? "bg-gray-200 border-2 border-red-100 p-0.5 rounded-full"
                    : ""
                }
              />
            </div>
            <div className="mb-2 pb-2 border-b-2 border-black">
              <p>Current Stock: {initialState.currentStock}</p>
            </div>
            {initialState.stocksFilter && (
              <>
                <div className="flex justify-between">
                  <div>
                    <Datepicker
                      label={"From Date"}
                      type="Individual"
                      value={initialState.stockDates.fromDate}
                      onChange={(e: any) =>
                        setInitialState((prev: InitialInventoryState) => ({
                          ...prev,
                          stockDates: {
                            fromDate: e.target.value,
                            toDate: prev.stockDates.toDate,
                          },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Datepicker
                      label={"To Date"}
                      type="Individual"
                      value={initialState.stockDates.toDate}
                      onChange={(e: any) =>
                        setInitialState((prev: InitialInventoryState) => ({
                          ...prev,
                          stockDates: {
                            fromDate: prev.stockDates.fromDate,
                            toDate: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
                <div className={`flex justify-end mt-2 `}>
                  <PrimaryButton
                    onClick={() =>
                      getStocksOfProduct(initialState.productSelected)
                    }
                    text={"Filter"}
                  />
                </div>
              </>
            )}
            <div>
              <RadioGroup
                value={initialState.inventoryUpdateType}
                onChange={(e) =>
                  setInitialState((prev: InitialInventoryState) => ({
                    ...prev,
                    inventoryUpdateType: e,
                  }))
                }
                className="border-2 rounded-lg flex w-full"
              >
                <RadioGroup.Option
                  value="REMOVE"
                  className={`w-full cursor-pointer
                      ${
                        initialState.inventoryUpdateType === "REMOVE"
                          ? "bg-red-200 text-red-500"
                          : ""
                      }`}
                >
                  REMOVE
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="ADD"
                  className={`w-full cursor-pointer
                      ${
                        initialState.inventoryUpdateType === "ADD"
                          ? "bg-green-200 text-green-500"
                          : ""
                      }`}
                >
                  ADD
                </RadioGroup.Option>
              </RadioGroup>
              <div>
                <input
                  type="number"
                  onChange={(e) =>
                    setInitialState((prev: InitialInventoryState) => ({
                      ...prev,
                      inventoryQuantity: Number(e.target.value),
                    }))
                  }
                  className={`mt-2 block w-full rounded-md border-1 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6 `}
                />
              </div>
              <PrimaryButton text={"Update"} onClick={updateStock} />
            </div>
            <table className="table-auto w-full text-center">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              {initialState.stocksOfProduct.map((item: any) => (
                <tbody>
                  <tr>
                    <td
                      className={`
                     ${
                       item.actionType === "REMOVE"
                         ? "bg-red-200 text-red-500"
                         : "bg-green-200 text-green-500"
                     }
                  `}
                    >
                      {item.actionType}
                    </td>
                    <td>{item.quantityModified}</td>
                    <td>
                      {moment(item.createdAt).format("DD/MM/YYYY, HH:mm")}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </Drawer>
      )}
    </>
  );
};

export default Products;
