export enum DiscountType {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
}

export interface InitialInventoryState {
  editCategory: boolean;
  newCategory: boolean;
  categorySelected: string;
  categoryList: {
    categoryName: string;
    id: null | string;
    productsCount: number;
  }[];
  productList: {
    productName: string;
    categoryId: string;
    _id: string;
  }[];
  editProduct: boolean;
}
