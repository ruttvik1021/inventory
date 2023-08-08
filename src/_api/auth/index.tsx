import { authUrls } from "../_urls";
import { settingBaseUrl } from "../interceptors";
import { IModules } from "@/contants/interceptorModules";

const AuthorizedAxiosInstance = settingBaseUrl(
  IModules.AUTH
)?.authorizedAxiosInstance;

export const getCurrentUserApi = async () => {
  try {
    return await AuthorizedAxiosInstance.get(authUrls.currentUser)
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
export const getAllIndustriesListAPI = async () => {
  try {
    return await AuthorizedAxiosInstance.get(authUrls.indutryList)
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

export const updateOrgInfoAPI = async (values: any) => {
  try {
    return await AuthorizedAxiosInstance.put(authUrls.completeProfile, values)
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
