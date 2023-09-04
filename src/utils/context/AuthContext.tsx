"use client";
import { getCurrentUserApi } from "@/_api/signin";
import { getCountryListApi } from "@/_api/unauthAPIs";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

interface IAuthContext {
  initialAuthState: IInitialAuthState;
  loginUser: (token: string) => void;
  logoutUser: () => void;
  setInitialAuthState: (prev: IInitialAuthState) => void;
  darkTheme: boolean;
  setDarkTheme: (theme: boolean) => void;
}

const AuthContext = createContext<IAuthContext>({
  initialAuthState: {
    isAuthenticated: false,
    companyInfoAvailable: false,
    organizationLogo: "",
  },
  loginUser: (token: string) => {}, // Provide a dummy implementation or leave it undefined
  logoutUser: () => {}, // Provide a dummy implementation or leave it undefined
  setInitialAuthState: (prev: IInitialAuthState) => {},
  darkTheme: false,
  setDarkTheme: (theme: boolean) => {},
});

export interface IInitialAuthState {
  isAuthenticated: boolean;
  companyInfoAvailable: boolean;
  organizationLogo: string;
  // permittedRoutes: Array<any>;
}

const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [darkTheme, setDarkTheme] = useState<boolean>(false);
  const [initialAuthState, setInitialAuthState] = useState<IInitialAuthState>({
    isAuthenticated: false,
    companyInfoAvailable: false,
    organizationLogo: "",
    // permittedRoutes: navRoutes,
  });

  const getCountryList = async () => {
    const { status, body } = await getCountryListApi();
    if (status > 199 && status < 299) {
      const modifiedArray = body?.countries?.countries.map((item: any) => {
        return {
          label: item.name,
          value: item.countryCallingCode,
        };
      });
      localStorage.setItem("countryList", JSON.stringify(modifiedArray));
    }
  };

  const getUserDetails = async () => {
    const { status, body } = await getCurrentUserApi();
    if (status === 200) {
      setInitialAuthState((prev: IInitialAuthState) => ({
        ...prev,
        isAuthenticated: true,
        companyInfoAvailable: body.profileCompleted,
        organizationLogo: body.organizationLogo,
      }));
      if (!body.profileCompleted) router.push("/organization-info");
    }
  };

  useEffect(() => {
    const hasAccess = Cookie.get("token"); // the name used to store the user’s token in localstorage
    if (hasAccess) {
      getUserDetails();
    } else router.push("/");
    getCountryList();
  }, []);

  const loginUser = (token: any) => {
    Cookie.set("token", token, {
      expires: 12,
      secure: true,
      sameSite: "strict",
    }); // to secure the token
    setInitialAuthState((prev: IInitialAuthState) => ({
      ...prev,
      isAuthenticated: true,
    }));
  };

  const logoutUser = () => {
    Cookie.remove("token");
    router.push("/");
    setInitialAuthState((prev: IInitialAuthState) => ({
      ...prev,
      isAuthenticated: false,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        initialAuthState,
        loginUser,
        logoutUser,
        setInitialAuthState,
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
