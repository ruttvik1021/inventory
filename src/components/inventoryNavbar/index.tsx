"use client";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/navigation";

const InventoryNavbar = () => {
  const router = useRouter();
  const plans = [
    { label: "Category", href: "category" },
    { label: "Products", href: "products" },
    { label: "Locations", href: "locations" },
  ];
  const [plan, setPlan] = useState(plans[0]);
  return (
    <nav className="flex justify-center md:justify-between lg:justify-between xl:justify-between items-center text-black px-7 mt-3">
      <p className="hidden md:block lg:block xl:block font-bold text-2xl text-indigo-700">
        Inventory
      </p>
      <ul>
        <RadioGroup
          value={plan}
          onChange={setPlan}
          name="plan"
          className="flex text-md gap-7"
        >
          {plans.map((item) => (
            <RadioGroup.Option key={item.label} value={item}>
              <p
                className={`cursor-pointer hover:text-indigo-700 ${
                  item.href === plan.href
                    ? "text-indigo-700 border-b-2 border-indigo-700 font-bold "
                    : ""
                }`}
                onClick={() => router.push(`/inventory/${item.href}`)}
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
