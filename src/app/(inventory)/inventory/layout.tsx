import InventoryNavbar from "@/components/inventoryNavbar";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InventoryNavbar />
      {/* <main>{children}</main> */}
      <main>{children}</main>
    </>
  );
}
