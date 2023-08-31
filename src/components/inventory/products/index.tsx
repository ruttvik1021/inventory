"use client";
import {
  createCategoryApi,
  deleteCategoryByIdApi,
  getAllCategoriesApi,
  getAllProductsApi,
  getCategoryByIdApi,
  updateCategoryByIdApi,
} from "@/_api/inventory";
import DeleteButton from "@/components/deleteButton";
import PrimaryButton from "@/components/primaryButton";
import TextField from "@/components/textfield";
import AddIcon from "@/utils/images/icons/addIcon";
import { CloseIcon } from "@/utils/images/icons/closeIcon";
import { Dialog, Transition } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FormikProvider, useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import CategoryCard from "../cards/categorycard";
import ProductCard from "../cards/productcard";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import CreateCategory from "./createCategory";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    imageSrc:
      "https://d19hn3jcfcdeky.cloudfront.net/1ada7049ce009cb9e2715fd84744c362-6eff17b0faa34db388bbe96d156be13d.png?o=4592119&r=savemartdpn&trackingId=b07a224bfc04d798ac445704d550b1b2&pid=f1f6a172b994ba77b08db6d4909978679286fa45d04419955d1939001c77e13d",
    price: "$35",
    color: "Black",
    category: "Totes",
  },
  {
    id: 2,
    name: "Basic TShirt",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Shirt",
    href: "#",
    imageSrc:
      "https://img.swiftlycontent.net/images/789d3a15-318c-44fd-9ee0-9e11f48c13d5/presized/dt_1x.png",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic TShirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Shirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic TShirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Shirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

export default function Products() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [initialState, setInitialState] = useState({
    editMode: false,
    newCategory: false,
    categorySelected: "",
    categoryList: [
      {
        categoryName: "",
        id: null,
        productsCount: 0,
      },
    ],
    productList: [
      {
        productName: "",
        categoryId: "",
      },
    ],
  });

  const getAllCategory = async () => {
    const { status, body } = await getAllCategoriesApi();
    if (status > 199 && status < 299) {
      setInitialState((prev) => ({
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
      setInitialState((prev) => ({
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
      setInitialState((prev) => ({
        ...prev,
        editMode: true,
        categorySelected: id,
        newCategory: true,
      }));
      categoryFormik.setValues(body.category);
    } else {
      toast.error(body.message);
    }
  };
  const deleteCategoryById = async (id: string) => {
    const { status, body } = await deleteCategoryByIdApi(id);
    if (status > 199 && status < 299) {
      setInitialState((prev) => ({
        ...prev,
        editMode: false,
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
      setInitialState((prev) => ({
        ...prev,
        editMode: false,
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
      setInitialState((prev) => ({
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
      initialState.editMode ? updateCategoryById(values) : createCat(values),
  });

  useEffect(() => {
    getAllCategory();
    getAllProduct();
  }, []);

  const resetCategoryModes = () => {
    setInitialState((prev: any) => ({
      ...prev,
      editMode: false,
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
      <FormikProvider value={categoryFormik}>
        <div className="bg-white">
          <div>
            <main>
              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
                  <form onSubmit={categoryFormik.handleSubmit}>
                    <div className="flex justify-between items-center">
                      <p className="text-2xl mb-3">Categories</p>
                      {initialState.newCategory ? (
                        <CloseIcon
                          className="cursor-pointer"
                          onClick={(e: any) => {
                            e.preventDefault();
                            setInitialState((prev) => ({
                              ...prev,
                              newCategory: false,
                            }));
                          }}
                        />
                      ) : (
                        <AddIcon
                          className="cursor-pointer"
                          onClick={(e: any) => {
                            e.preventDefault();
                            setInitialState((prev) => ({
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
                      {initialState.categoryList?.length &&
                        initialState.categoryList?.map(
                          (item: any, index: number) => (
                            <CategoryCard
                              key={`${item.category}-${index}`}
                              category={item?.categoryName}
                              productCount={item?.productsCount}
                              onClick={() => getCategoryById(item.id)}
                            />
                          )
                        )}
                    </ul>
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3 ">
                    {/* Your content */}

                    <div className="bg-white">
                      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                          {initialState.productList.map((item: any) => (
                            <ProductCard
                              product={item}
                              categoryName={
                                initialState.categoryList?.find(
                                  (e) => item.categoryId === e.id
                                )?.categoryName || ""
                              }
                              onClick={() => alert(item.name)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </FormikProvider>
    </>
  );
}
