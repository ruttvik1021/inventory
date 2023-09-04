"use client";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "./useAuth";

export const ProtectedRoutes = ({ children }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const { initialAuthState } = useAuth();
  if (
    initialAuthState &&
    initialAuthState.isAuthenticated &&
    !initialAuthState.companyInfoAvailable
  ) {
    router.push("/organization-info");
    // window.location.href = "/organization-info";
  } else if (initialAuthState && !initialAuthState.isAuthenticated) {
    router.push("/");
    // window.location.href = "/";
  }
  return children;
};

const getServerSideProps = () => {};
