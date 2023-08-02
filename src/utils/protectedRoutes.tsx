"use client";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "./useAuth";
import { pageRoutes } from "@/contants/pageroutes";

export const ProtectedRoutes = ({ children }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const { initialAuthState } = useAuth(); // remember where we got this

  if (
    (!initialAuthState.isAuthenticated &&
      pageRoutes.find((item: any) => item.href === pathname || "/home")) ||
    !initialAuthState.isAuthenticated
  ) {
    router.push("/");
  } else if (
    initialAuthState.isAuthenticated &&
    !initialAuthState.companyInfoAvailable
  ) {
    router.push("/organization-info");
  }
  return children;
};
