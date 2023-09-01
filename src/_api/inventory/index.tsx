import { inventoryUrls } from "../_urls";
import { settingBaseUrl } from "../interceptors";
import { IModules } from "@/contants/interceptorModules";

const AuthorizedAxiosInstance = settingBaseUrl(
  IModules.INVENTORY
)?.authorizedAxiosInstance;

export const createCategoryApi = async (payload: { categoryName: string }) => {
  try {
    return await AuthorizedAxiosInstance.post(
      inventoryUrls.createCategory,
      payload
    )
      .then((response: any) => {
        return { status: response.status, body: response.data };
      })
      .catch((err: any) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Error" };
  }
};

export const getAllCategoriesApi = async () => {
  try {
    return await AuthorizedAxiosInstance.get(inventoryUrls.getAllCategories)
      .then((response: any) => {
        return { status: response.status, body: response.data };
      })
      .catch((err: any) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Error" };
  }
};

export const getCategoryByIdApi = async (id: string) => {
  try {
    return await AuthorizedAxiosInstance.get(
      `${inventoryUrls.getCategoryByID}/${id}`
    )
      .then((response: any) => {
        return { status: response.status, body: response.data };
      })
      .catch((err: any) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Error" };
  }
};
export const deleteCategoryByIdApi = async (id: string) => {
  try {
    return await AuthorizedAxiosInstance.delete(
      `${inventoryUrls.deleteCategory}/${id}`
    )
      .then((response: any) => {
        return { status: response.status, body: response.data };
      })
      .catch((err: any) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Error" };
  }
};
export const updateCategoryByIdApi = async (payload: {
  categoryName: string;
  id: string;
}) => {
  try {
    return await AuthorizedAxiosInstance.put(
      inventoryUrls.updateCategory,
      payload
    )
      .then((response: any) => {
        return { status: response.status, body: response.data };
      })
      .catch((err: any) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Error" };
  }
};

export const getAllProductsApi = async () => {
  try {
    return await AuthorizedAxiosInstance.get(inventoryUrls.getAllProducts)
      .then((response: any) => {
        return { status: response.status, body: response.data };
      })
      .catch((err: any) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Error" };
  }
};

export const getProductByIdApi = async (id: string) => {
  try {
    return await AuthorizedAxiosInstance.get(
      `${inventoryUrls.getProductById}/${id}`
    )
      .then((response: any) => {
        return { status: response.status, body: response.data };
      })
      .catch((err: any) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Error" };
  }
};
export const getProductByCategoryApi = async (id: string) => {
  try {
    return await AuthorizedAxiosInstance.get(
      `${inventoryUrls.getProductByCategory}/${id}`
    )
      .then((response: any) => {
        return { status: response.status, body: response.data };
      })
      .catch((err: any) => {
        return { status: err.response.status, body: err.response.data };
      });
  } catch (err) {
    return { status: 500, body: "Error" };
  }
};
