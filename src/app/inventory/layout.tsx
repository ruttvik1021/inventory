"use client";
import InventoryNavbar from "@/components/inventory/inventoryNavbar";
import useAuth from "@/utils/context/useAuth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initialAuthState } = useAuth();
  const router = useRouter();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!initialAuthState.isAuthenticated || !token) router.push("/");
    if (!initialAuthState.companyInfoAvailable)
      router.push("/organization-info");
  }, []);
  return (
    <>
      <InventoryNavbar />
      <main className="px-5 py-2">{children}</main>
    </>
  );
}
