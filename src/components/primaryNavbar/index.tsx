"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { pageRoutes } from "@/contants/pageroutes";
import SignInButton from "../signIn";
// import { useRouter } from "next/navigation";
import useAuth from "@/utils/useAuth";
import PrimaryButton from "../primaryButton";
import NavLinks from "./navLinks";
import { ProtectedRoutes } from "@/utils/protectedRoutes";

const PrimaryNavbar = () => {
  const { isAuthenticated, logoutUser } = useAuth();
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
            <ProtectedRoutes>
              {isAuthenticated &&
                pageRoutes.map(({ label, href }: any, index: number) => (
                  <NavLinks label={label} href={href} index={index} />
                ))}
            </ProtectedRoutes>
          </ul>
          {!isAuthenticated ? (
            <SignInButton />
          ) : (
            <PrimaryButton text={"Sign Out"} onClick={() => logoutUser()} />
          )}
        </div>
      </nav>
    </>
  );
};

export default PrimaryNavbar;
