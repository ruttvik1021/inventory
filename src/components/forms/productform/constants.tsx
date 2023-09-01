import { DiscountType } from "@/components/inventory/products/constants";
import * as Yup from "yup";

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
};

export const ProductYup = Yup.object({
  productName: Yup.string().required("Required"),
  categoryId: Yup.string(),
  // .when("newCategory", {
  //   is: false,
  //   then: Yup.string().required("Required"),
  //   otherwise: Yup.string(),
  // }),
  price: Yup.number(),
  discount: Yup.number(),
  purchasePrice: Yup.number(),
  openingStock: Yup.number(),
  lowQuantity: Yup.number(),
  // .when("notifyWhenLow", {
  //   is: true,
  //   then: Yup.number().min(1).typeError("Invalid Stock"),
  //   otherwise: Yup.number(),
  // }),
  discountType: Yup.string().oneOf([
    DiscountType.AMOUNT,
    DiscountType.PERCENTAGE,
  ]),
  notifyWhenLow: Yup.boolean(),
  newCategory: Yup.boolean(),
  images: Yup.array()
    .of(Yup.string())
    .test("is-strings-array", "Invalid Images", (value) => {
      if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "string")
      ) {
        return true;
      }
      return false;
    }),
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
};
