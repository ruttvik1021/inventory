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
