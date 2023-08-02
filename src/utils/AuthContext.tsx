"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

interface IAuthContext {
  initialAuthState: IInitialAuthState;
  loginUser: (token: string) => void;
  logoutUser: () => void;
  setInitialAuthState: (prev: IInitialAuthState) => void;
}

const AuthContext = createContext<IAuthContext>({
  initialAuthState: { isAuthenticated: false, companyInfoAvailable: false },
  loginUser: (token: string) => {}, // Provide a dummy implementation or leave it undefined
  logoutUser: () => {}, // Provide a dummy implementation or leave it undefined
  setInitialAuthState: (prev: IInitialAuthState) => {},
});

export interface IInitialAuthState {
  isAuthenticated: boolean;
  companyInfoAvailable: boolean;
}

const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [initialAuthState, setInitialAuthState] = useState<IInitialAuthState>({
    isAuthenticated: false,
    companyInfoAvailable: false,
  });

  useEffect(() => {
    const hasAccess = Cookie.get("token"); // the name used to store the user’s token in localstorage
    if (hasAccess) {
      setInitialAuthState((prev: IInitialAuthState) => ({
        ...prev,
        isAuthenticated: true,
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
