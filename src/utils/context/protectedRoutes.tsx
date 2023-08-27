"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

export const ProtectedRoutes = ({ children }: any) => {
  // const pathname = usePathname();
  const router = useRouter();
  const { initialAuthState } = useAuth();
  if (
    initialAuthState.isAuthenticated &&
    Cookies.get("token") &&
    !initialAuthState.companyInfoAvailable
  ) {
    router.push("/organization-info");
  } else if (!Cookies.get("token") || !initialAuthState.isAuthenticated) {
    router.push("/");
  }
  return children;
};
