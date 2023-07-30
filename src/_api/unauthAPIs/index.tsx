import { authUrls } from "../_urls";
import { settingBaseUrl } from "../interceptors";
import { IModules } from "@/contants/interceptorModules";

interface ILogin {
  email: string;
  password: string;
}

interface IForgotPassword {
  email: string;
}

const UnAuthorizedAxiosInstance = settingBaseUrl(
  IModules.AUTH
)?.unauthorizedAxiosInstance;

export const userLogin = async (payload: ILogin) => {
  try {
    return await UnAuthorizedAxiosInstance.post(authUrls.signIn, payload)
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

export const userSignUp = async (payload: ILogin) => {
  try {
    return await UnAuthorizedAxiosInstance.post(authUrls.signUp, payload)
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

export const forgotPassword = async (payload: IForgotPassword) => {
  try {
    return await UnAuthorizedAxiosInstance.post(
      authUrls.forgotPassword,
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
