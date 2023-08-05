"use client";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "./useAuth";
import { pageRoutes } from "@/contants/pageroutes";

export const ProtectedRoutes = ({ children }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const { initialAuthState } = useAuth();
  if (
    !initialAuthState.isAuthenticated ||
    !initialAuthState.companyInfoAvailable
  ) {
    if (
      !initialAuthState.isAuthenticated &&
      pageRoutes.find((item: any) => item.href === pathname || "/home")
    ) {
      router.push("/");
    }
    if (
      initialAuthState.isAuthenticated &&
      !initialAuthState.companyInfoAvailable
    ) {
      router.push("/organization-info");
    }
  }
  return children;
};
