"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface INavLinks {
  label: string;
  href: string;
  index?: number;
}

const NavLinks = ({ label, href, index }: INavLinks) => {
  const router = useRouter();
  return (
    <p
      className="cursor-pointer hover:text-indigo-400"
      key={`${label}-${href}${index && `-${index}`}`}
      onClick={() => router.push(href)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && router.push(href)}
    >
      {label}
    </p>
  );
};

export default NavLinks;
