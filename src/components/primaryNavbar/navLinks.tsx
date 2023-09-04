"use client";

import { useRouter, usePathname } from "next/navigation";

interface INavLinks {
  label: string;
  href: string;
  index?: number;
}

const NavLinks = ({ label, href, index }: INavLinks) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <p
      className={`cursor-pointer hover:text-blue-700 ${
        pathName.includes(label.toLowerCase())
          ? "text-indigo-700 border-b-2 border-indigo-700 font-bold"
          : ""
      }`}
      key={`${label}-${href}${index && `-${index}`}`}
      onClick={() => router.replace(href)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && router.replace(href)}
    >
      {label}
    </p>
  );
};

export default NavLinks;
