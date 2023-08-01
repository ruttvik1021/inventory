"use client";
import React, { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";

type AuthContextValue = {
  isAuthenticated: boolean;
  loginUser: any;
  logoutUser: any;
};

const AuthContext = createContext<any>({
  isAuthenticated: false,
  loginUser: null,
  logoutUser: null,
}); // create context here

const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasAccess = Cookie.get("token"); // the name used to store the user’s token in localstorage

    if (hasAccess) {
      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = (token: any) => {
    Cookie.set("token", token, {
      expires: 14,
      secure: true,
      sameSite: "strict",
    }); // to secure the token
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    Cookie.remove("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
