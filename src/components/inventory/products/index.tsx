"use client";
import {
  createCategoryApi,
  deleteCategoryByIdApi,
  getAllCategoriesApi,
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

  const [initialCategory, setInitialCategory] = useState({
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
  });

  const getAllCategory = async () => {
    const { status, body } = await getAllCategoriesApi();
    if (status > 199 && status < 299) {
      setInitialCategory((prev) => ({
        ...prev,
        categoryList: body.categories,
      }));
    }
  };
  const getCategoryById = async (id: string) => {
    const { status, body } = await getCategoryByIdApi(id);
    if (status > 199 && status < 299) {
      setInitialCategory((prev) => ({
        ...prev,
        editMode: true,
        categorySelected: id,
        newCategory: true,
      }));
      categoryFormik.setValues(body.category);
    }
  };
  const deleteCategoryById = async (id: string) => {
    const { status, body } = await deleteCategoryByIdApi(id);
    if (status > 199 && status < 299) {
      setInitialCategory((prev) => ({
        ...prev,
        editMode: false,
        newCategory: false,
      }));
      toast.success(body.message);
      getAllCategory();
    }
  };
  const updateCategoryById = async (values: any) => {
    const payload = { ...values, id: initialCategory.categorySelected };
    const { status, body } = await updateCategoryByIdApi(payload);
    if (status > 199 && status < 299) {
      setInitialCategory((prev) => ({
        ...prev,
        editMode: false,
        newCategory: false,
      }));
      toast.success(body.message);
      getAllCategory();
    }
  };
  const createCat = async (payload: any) => {
    const { status, body } = await createCategoryApi(payload);
    if (status > 199 && status < 299) {
      toast.success(body.message);
      setInitialCategory((prev) => ({
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
      initialCategory.editMode ? updateCategoryById(values) : createCat(values),
  });

  useEffect(() => {
    getAllCategory();
  }, []);

  const resetCategoryModes = () => {
    setInitialCategory((prev: any) => ({
      ...prev,
      editMode: false,
      newCategory: false,
      categorySelected: "",
    }));
    categoryFormik.resetForm();
  };

  useEffect(() => {
    if (initialCategory.newCategory === false) {
      resetCategoryModes();
    }
  }, [initialCategory.newCategory]);

  const createCategory = () => {
    return (
      initialCategory.newCategory && (
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
            {initialCategory.editMode && (
              <DeleteButton
                text={"Delete"}
                onClick={() =>
                  deleteCategoryById(initialCategory.categorySelected)
                }
              />
            )}
            <PrimaryButton
              text={initialCategory.editMode ? "Update" : "Create"}
              onClick={(e: any) => {
                e.preventDefault();
                categoryFormik.handleSubmit();
              }}
            />
            {/* )} */}
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <FormikProvider value={categoryFormik}>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-40 lg:hidden"
                onClose={setMobileFiltersOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                      <div className="flex items-center justify-between px-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Filters
                        </h2>
                        <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                          onClick={() => setMobileFiltersOpen(false)}
                        >
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Filters */}
                      <form className="mt-4 border-t border-gray-200">
                        <ul
                          role="list"
                          className="px-2 py-3 font-medium text-gray-900 "
                        >
                          <div className="flex justify-between items-center">
                            <p className="text-2xl mb-3">Categories</p>
                          </div>
                          {createCategory()}
                          {initialCategory.categoryList?.length &&
                            initialCategory.categoryList?.map((item, index) => (
                              <li className="my-3">
                                <CategoryCard
                                  key={`${item.categoryName}-${index}`}
                                  category={item.categoryName}
                                  productCount={item.productsCount}
                                  onClick={() => getCategoryById(item.id || "")}
                                />
                              </li>
                            ))}
                        </ul>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <main>
              <div className="flex items-baseline justify-end">
                <div className="flex items-center">
                  {/* <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu> */}

                  {/* <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button> */}
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 ">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <div className="flex justify-between items-center">
                      <p className="text-2xl mb-3">Categories</p>
                      {initialCategory.newCategory ? (
                        <CloseIcon
                          className="cursor-pointer"
                          onClick={(e: any) => {
                            e.preventDefault();
                            setInitialCategory((prev) => ({
                              ...prev,
                              newCategory: false,
                            }));
                          }}
                          tooltip={true}
                        />
                      ) : (
                        <AddIcon
                          className="cursor-pointer"
                          onClick={(e: any) => {
                            e.preventDefault();
                            setInitialCategory((prev) => ({
                              ...prev,
                              newCategory: true,
                            }));
                          }}
                          tooltip={true}
                        />
                      )}
                    </div>
                    <ul
                      role="list"
                      className="space-y-4 border-b pb-6 text-sm font-medium text-gray-900"
                    >
                      {createCategory()}
                      {initialCategory.categoryList?.length &&
                        initialCategory.categoryList?.map(
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
                          {products.map((item: any) => (
                            <ProductCard
                              product={item}
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
