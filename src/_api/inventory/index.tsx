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
