"use client";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/navigation";

const InventoryNavbar = () => {
  const router = useRouter();
  const plans = [
    { label: "Category" },
    { label: "Products" },
    { label: "Locations" },
  ];
  const [view, setView] = useState(
    plans.find((item) => item.label === "Products")
  );
  return (
    <nav className="sm:hidden flex md:flex justify-center md:justify-between lg:justify-between xl:justify-between items-center text-black px-7 mt-3">
      <p className="hidden md:block lg:block xl:block font-bold text-2xl text-indigo-700">
        Inventory
      </p>
      <ul>
        <RadioGroup
          value={view}
          onChange={setView}
          name="plan"
          className="flex text-md gap-7"
        >
          {plans.map((item) => (
            <RadioGroup.Option key={item.label} value={item}>
              <p
                className={`cursor-pointer hover:text-indigo-700 ${
                  item.label === (view && view.label)
                    ? "text-indigo-700 border-b-2 border-indigo-700 font-bold "
                    : ""
                }`}
              >
                {item.label}
              </p>
            </RadioGroup.Option>
          ))}
        </RadioGroup>
      </ul>
    </nav>
  );
};

export default InventoryNavbar;
