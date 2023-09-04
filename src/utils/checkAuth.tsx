"use client";
import React, { useEffect } from "react";
import useAuth from "./context/useAuth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const CheckAuth = ({ children }: any) => {
  const { initialAuthState } = useAuth();
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!initialAuthState.isAuthenticated || !token) router.push("/");
    if (
      token &&
      initialAuthState.isAuthenticated &&
      initialAuthState.companyInfoAvailable
    )
      router.push("/organization-info");
  }, []);

  return <>{children}</>;
};

export default CheckAuth;
