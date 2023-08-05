"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { navRoutes } from "@/contants/pageroutes";

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
    // permittedRoutes: navRoutes,
  },
  loginUser: (token: string) => {}, // Provide a dummy implementation or leave it undefined
  logoutUser: () => {}, // Provide a dummy implementation or leave it undefined
  setInitialAuthState: (prev: IInitialAuthState) => {},
});

export interface IInitialAuthState {
  isAuthenticated: boolean;
  companyInfoAvailable: boolean;
  // permittedRoutes: Array<any>;
}

const AuthProvider = ({ children }: any) => {
  const [initialAuthState, setInitialAuthState] = useState<IInitialAuthState>({
    isAuthenticated: false,
    companyInfoAvailable: false,
    // permittedRoutes: navRoutes,
  });

  useEffect(() => {
    const hasAccess = Cookie.get("token"); // the name used to store the user’s token in localstorage
    if (hasAccess) {
      const { companyInfo }: any = jwt.decode(hasAccess);
      setInitialAuthState((prev: IInitialAuthState) => ({
        ...prev,
        isAuthenticated: true,
        companyInfoAvailable: companyInfo,
      }));
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
