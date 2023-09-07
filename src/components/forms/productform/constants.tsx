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
  description: string;
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
  images: [],
  stockDate: moment().format("YYYY-MM-DD"),
  description: "",
};

export const ProductYup = Yup.object({
  productName: Yup.string().required("Required"),
  categoryId: Yup.string().required("Required"),
  price: Yup.number().typeError("Must be a Number").required("Required"),
  discount: Yup.number().typeError("Must be a Number").required("Required"),
  purchasePrice: Yup.number()
    .typeError("Must be a Number")
    .required("Required"),
  openingStock: Yup.number().typeError("Must be a Number").required("Required"),
  lowQuantity: Yup.number().typeError("Must be a Number").required("Required"),
  discountType: Yup.string()
    .oneOf([DiscountType.AMOUNT, DiscountType.PERCENTAGE])
    .required("Required"),
  notifyWhenLow: Yup.boolean(),
  stockDate: Yup.string().required("Required"),
  newCategory: Yup.boolean(),
  description: Yup.string().nullable(),
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
  description: "description",
};

export const discountTypes = [
  {
    value: "AMOUNT",
  },
  {
    value: "PERCENTAGE",
  },
];
