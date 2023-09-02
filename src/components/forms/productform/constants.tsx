import { DiscountType } from "@/components/inventory/products/constants";
import * as Yup from "yup";
import moment from "moment";

export interface IProduct {
  productName: string;
  categoryId: string;
  price: number;
  discountType: DiscountType;
  discount: number;
  purchasePrice: number;
  openingStock: number;
  notifyWhenLow: boolean;
  newCategory: boolean;
  lowQuantity: number;
  images: string[];
  stockDate: any;
}

export const ProductInitialValues: IProduct = {
  productName: "",
  categoryId: "",
  price: 0,
  discountType: DiscountType.AMOUNT,
  discount: 0,
  purchasePrice: 0,
  openingStock: 0,
  notifyWhenLow: true,
  newCategory: false,
  lowQuantity: 0,
  images: [""],
  stockDate: moment().format("YYYY-MM-DD"),
};

export const ProductYup = Yup.object({
  productName: Yup.string().required("Required"),
  categoryId: Yup.string().required("Required"),
  price: Yup.number().typeError("Must be a Number"),
  discount: Yup.number().typeError("Must be a Number"),
  purchasePrice: Yup.number().typeError("Must be a Number"),
  openingStock: Yup.number().typeError("Must be a Number"),
  lowQuantity: Yup.number().typeError("Must be a Number"),
  discountType: Yup.string().oneOf([
    DiscountType.AMOUNT,
    DiscountType.PERCENTAGE,
  ]),
  notifyWhenLow: Yup.boolean(),
  stockDate: Yup.string().required("Required"),
  newCategory: Yup.boolean(),
  // images: Yup.array()
  //   .of(Yup.string())
  //   .test("is-strings-array", "Invalid Images", (value) => {
  //     if (
  //       Array.isArray(value) &&
  //       value.every((item) => typeof item === "string")
  //     ) {
  //       return true;
  //     }
  //     return false;
  //   }),
});

export const productFormKeys = {
  productName: "productName",
  categoryId: "categoryId",
  categoryName: "categoryName",
  price: "price",
  discountType: "discountType",
  discount: "discount",
  purchasePrice: "purchasePrice",
  openingStock: "openingStock",
  notifyWhenLow: "notifyWhenLow",
  newCategory: "newCategory",
  lowQuantity: "lowQuantity",
  images: "images",
  stockDate: "stockDate",
  newCategoryName: "newCategoryName",
};

export const discountTypes = [
  {
    value: "AMOUNT",
  },
  {
    value: "PERCENTAGE",
  },
];
