import InventoryNavbar from "@/components/inventory/inventoryNavbar";

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
