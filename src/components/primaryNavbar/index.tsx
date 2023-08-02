"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { pageRoutes } from "@/contants/pageroutes";
import SignInButton from "../signIn";
import useAuth from "@/utils/useAuth";
import PrimaryButton from "../primaryButton";
import NavLinks from "./navLinks";

const PrimaryNavbar = () => {
  const { initialAuthState, logoutUser } = useAuth();

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
            {initialAuthState.isAuthenticated &&
              initialAuthState.companyInfoAvailable &&
              pageRoutes.map(({ label, href }: any, index: number) => (
                <NavLinks label={label} href={href} index={index} />
              ))}
          </ul>
          {!initialAuthState.isAuthenticated ? (
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
