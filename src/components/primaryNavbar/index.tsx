import React from "react";
import Image from "next/image";
import Link from "next/link";
import { pageRoutes } from "@/contants/pageroutes";
import SignInButton from "../signIn";

const PrimaryNavbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center p-3 px-5">
        <div className="flex justify-start gap-10">
          <Link href={"/"}>
            <Image src={""} alt="Home" />
          </Link>
        </div>
        <div className="flex justify-center">
          <ul className="xl:flex hidden text-sm gap-7">
            {pageRoutes.map((item: any) => (
              <Link href={item.href} className="px-3" key={item.label}>
                {item.label}
              </Link>
            ))}
          </ul>
          <SignInButton />
        </div>
      </nav>
    </>
  );
};

export default PrimaryNavbar;
