import { IModules } from "@/contants/interceptorModules";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrls } from "../_urls";

// const handleLogout = () => {
//   Cookies.remove("token");
//   window.location.href = "/#/login";
// };

const gettingBaseUrl = (module: IModules) => {
  if (module === IModules.AUTH) {
    return baseUrls.auth;
  } else if (module === IModules.INVENTORY) {
    return baseUrls.inventory;
  }
};
// export const authorizedAxiosInstance = ""
// Create an Axios instance for authorized APIs

const settingBaseUrl = (module: IModules) => {
  const authorizedAxiosInstance = axios.create({
    baseURL: gettingBaseUrl(module),
  });

  // Request interceptor for authorized APIs
  authorizedAxiosInstance.interceptors.request.use(
    function (config) {
      const token = Cookies.get("token");
      if (token !== "undefined" && token !== null && token !== undefined) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for authorized APIs
  authorizedAxiosInstance.interceptors.response.use(
    (response) => {
      // Handle successful responses for authorized APIs
      // You can do common data processing here for authorized APIs
      return response;
    },
    (error) => {
      if (!error.response || error.response.status === 401) {
        // handleLogout();
      } else {
        return Promise.reject(error);
      }
    }
  );

  // Create an Axios instance for unauthorized APIs
  const unauthorizedAxiosInstance = axios.create({
    baseURL: gettingBaseUrl(module),
  });

  // Request interceptor for unauthorized APIs (if needed)
  unauthorizedAxiosInstance.interceptors.request.use(
    (config) => {
      // Modify request headers or perform other tasks specific to unauthorized APIs
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for unauthorized APIs (if needed)
  unauthorizedAxiosInstance.interceptors.response.use(
    (response) => {
      if (response.data?.token) {
        Cookies.set("token", response.data?.token);
      }
      // Handle successful responses for unauthorized APIs (if needed)
      return response;
    },
    (error) => {
      // Handle errors for unauthorized APIs (if needed)
      // You can customize the error handling based on the status code for unauthorized APIs
      return Promise.reject(error);
    }
  );

  return { authorizedAxiosInstance, unauthorizedAxiosInstance };
};

export { settingBaseUrl };
