import InventoryNavbar from "@/components/inventory/inventoryNavbar";
import CheckAuth from "@/utils/checkAuth";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InventoryNavbar />
      <main className="px-5 py-2">{children}</main>
    </>
  );
}
