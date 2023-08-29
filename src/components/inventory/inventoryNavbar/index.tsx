"use client";
import NavLinks from "@/components/primaryNavbar/navLinks";
import { inventorySubRoutes } from "@/contants/pageroutes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const InventoryNavbar = () => {
  const router = useRouter();
  const plans = [{ label: "Products" }];
  const [view, setView] = useState(
    plans.find((item) => item.label === "Products")
  );
  return (
    <nav className="sm:hidden flex md:flex justify-center md:justify-between lg:justify-between xl:justify-between items-center text-black px-7 mt-3 border-b border-gray-200 pb-6">
      <p className="hidden md:block lg:block xl:block font-bold text-2xl text-indigo-700">
        Inventory
      </p>
      <ul className="flex gap-5">
        {inventorySubRoutes.map((item: any, index: number) => (
          <NavLinks label={item.label} href={item.href} index={index} />
        ))}
      </ul>
    </nav>
  );
};

export default InventoryNavbar;
