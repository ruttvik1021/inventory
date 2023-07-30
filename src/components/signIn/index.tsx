"use client";

import React, { useState, useTransition } from "react";
import PrimaryButton from "../primaryButton";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import LoginModal from "../modals/loginModal";

const SignInButton = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const { t } = useTranslation();
  const router = useRouter();
  const navigateToLigin = () => {
    setModalShow(true);
  };
  return (
    <>
      <div>
        <PrimaryButton text={"Sign In"} onClick={navigateToLigin} />
      </div>
      <LoginModal show={modalShow} setShow={setModalShow} onBlur={true} />
    </>
  );
};

export default SignInButton;
