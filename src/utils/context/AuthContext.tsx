"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { navRoutes } from "@/contants/pageroutes";
import { getCurrentUserApi } from "@/_api/auth";

interface IAuthContext {
  initialAuthState: IInitialAuthState;
  loginUser: (token: string) => void;
  logoutUser: () => void;
  setInitialAuthState: (prev: IInitialAuthState) => void;
}

const AuthContext = createContext<IAuthContext>({
  initialAuthState: {
    isAuthenticated: false,
    companyInfoAvailable: false,
    organizationLogo: "",
    // permittedRoutes: navRoutes,
  },
  loginUser: (token: string) => {}, // Provide a dummy implementation or leave it undefined
  logoutUser: () => {}, // Provide a dummy implementation or leave it undefined
  setInitialAuthState: (prev: IInitialAuthState) => {},
});

export interface IInitialAuthState {
  isAuthenticated: boolean;
  companyInfoAvailable: boolean;
  organizationLogo: string;
  // permittedRoutes: Array<any>;
}

const AuthProvider = ({ children }: any) => {
  const [initialAuthState, setInitialAuthState] = useState<IInitialAuthState>({
    isAuthenticated: false,
    companyInfoAvailable: false,
    organizationLogo: "",
    // permittedRoutes: navRoutes,
  });

  const getUserDetails = async () => {
    const { status, body } = await getCurrentUserApi();
    if (status === 200) {
      setInitialAuthState((prev: IInitialAuthState) => ({
        ...prev,
        isAuthenticated: true,
        companyInfoAvailable: body.profileCompleted,
        organizationLogo: body.organizationLogo,
      }));
    }
  };

  useEffect(() => {
    const hasAccess = Cookie.get("token"); // the name used to store the user’s token in localstorage
    if (hasAccess) {
      getUserDetails();
    }
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
    setInitialAuthState((prev: IInitialAuthState) => ({
      ...prev,
      isAuthenticated: false,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ initialAuthState, loginUser, logoutUser, setInitialAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
