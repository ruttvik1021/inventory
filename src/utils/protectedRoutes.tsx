import { useRouter } from "next/navigation";
import useAuth from "./useAuth";

export const ProtectedRoutes = ({ children }: any) => {
  const navigate = useRouter();
  const router = window.location;
  const { isAuthenticated } = useAuth(); // remember where we got this

  if (
    !isAuthenticated &&
    (router.pathname.startsWith("/inventory") ||
      router.pathname.startsWith("/finance") ||
      router.pathname.startsWith("/credit"))
  ) {
    navigate.push("/");
  }
  return children;
};
