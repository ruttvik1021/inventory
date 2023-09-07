import Link from "next/link";
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
    <Link
      href={href}
      tabIndex={0}
      className={`cursor-pointer hover:text-blue-700 ${
        pathName.includes(label.toLowerCase())
          ? "text-indigo-700 border-b-2 border-indigo-700 font-bold"
          : ""
      }`}
      onKeyDown={(e) => e.key === "Enter" && router.replace(href)}
    >
      {label}
    </Link>
  );
};

export default NavLinks;
