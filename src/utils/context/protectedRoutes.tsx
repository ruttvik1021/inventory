"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

export const ProtectedRoutes = ({ children }: any) => {
  // const pathname = usePathname();
  const router = useRouter();
  const { initialAuthState } = useAuth();
  if (
    !initialAuthState.isAuthenticated ||
    !initialAuthState.companyInfoAvailable
  ) {
    // if (
    //   !Cookies.get("token") &&
    //   pageRoutes.find((item: any) => item.href === pathname || "/home")
    // ) {
    //   router.push("/inventory");
    // }
    if (
      initialAuthState.isAuthenticated &&
      Cookies.get("token") &&
      !initialAuthState.companyInfoAvailable
    ) {
      router.push("/organization-info");
    }
  }
  return children;
};
