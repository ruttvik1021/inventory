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
      key={`${label}-${href}${index && `-${index}`}`}
      onClick={() => router.push(href)}
    >
      {label}
    </p>
  );
};

export default NavLinks;
