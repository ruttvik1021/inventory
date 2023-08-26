import InventoryNavbar from "@/components/inventory/inventoryNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InventoryNavbar />
      <main className="p-5">{children}</main>
    </>
  );
}
