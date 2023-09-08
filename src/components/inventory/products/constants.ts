export enum DiscountType {
  AMOUNT = "AMOUNT",
  PERCENTAGE = "PERCENTAGE",
}

export interface InitialInventoryState {
  editCategory: boolean;
  newCategory: boolean;
  categorySelected: string;
  productSelected: string;
  categoryList: {
    categoryName: string;
    id: null | string;
    productsCount?: number;
  }[];
  productList: {
    productName: string;
    categoryId: string;
    id: string;
    openingStock: number;
    currentStock: number;
    lowStock: number;
  }[];
  totalproducts: number;
  editProduct: boolean;
  viewProduct: boolean;
  categoryDrawer: boolean;
  deleteModal: {
    deleteId: null | string;
    deleteType: string;
  };
}
