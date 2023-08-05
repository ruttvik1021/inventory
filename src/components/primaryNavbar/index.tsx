"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { dropDownOptions, navRoutes, pageRoutes } from "@/contants/pageroutes";
import SignInButton from "../signIn";
import useAuth from "@/utils/context/useAuth";
import PrimaryButton from "../primaryButton";
import NavLinks from "./navLinks";
import LoginModal from "../forms/loginModal";
import NavDropDown from "../navbarDropdown";
import { useRouter } from "next/navigation";

const PrimaryNavbar = () => {
  const router = useRouter();
  const { initialAuthState, logoutUser } = useAuth();
  const [modalShow, setModalShow] = useState<boolean>(false);

  const signOutOption = { label: "Sign Out", onClick: () => logoutUser() };

  const dropDownOptionList = [
    ...navRoutes.map((item: any) => {
      return { label: item.label, onClick: () => router.push(item.href) };
    }),
    ...dropDownOptions.map((item: any) => {
      return { label: item.label, onClick: () => router.push(item.href) };
    }),
    signOutOption,
  ];

  return (
    <>
      <nav className="flex justify-between items-center p-3 px-5 bg-gray-800 text-white">
        <div className="flex justify-start gap-10">
          <Link href={"/"}>
            <Image
              src="https://logopond.com/logos/7b91b2efc18361b9f3d67e6102382cd4.png"
              alt="Home"
              width={60}
              height={60}
            />
          </Link>
        </div>
        <div className="flex gap-5">
          <ul className="xl:flex lg:flex md:flex hidden text-sm gap-7 justify-center items-center">
            {initialAuthState.isAuthenticated &&
              initialAuthState.companyInfoAvailable &&
              navRoutes.map(({ label, href }: any, index: number) => (
                <NavLinks
                  label={label}
                  href={href}
                  index={index}
                  key={`${href}-${index}`}
                />
              ))}
          </ul>
          <div>
            {!initialAuthState.isAuthenticated ? (
              <PrimaryButton
                text={"Sign In"}
                onClick={() => setModalShow(true)}
              />
            ) : (
              <>
                <div className="xl:hidden lg:hidden md:hidden block">
                  <NavDropDown
                    options={dropDownOptionList}
                    orgLogo={initialAuthState.organizationLogo}
                  />
                </div>
                <div className="xl:block lg:block md:block hidden">
                  <NavDropDown
                    options={[
                      ...dropDownOptions.map((item: any) => {
                        return {
                          label: item.label,
                          onClick: () => router.push(item.href),
                        };
                      }),
                      signOutOption,
                    ]}
                    orgLogo={initialAuthState.organizationLogo}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      <LoginModal show={modalShow} setShow={setModalShow} onBlur={true} />
    </>
  );
};

export default PrimaryNavbar;
