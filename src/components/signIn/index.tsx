"use client";

import React, { useState, useTransition } from "react";
import PrimaryButton from "../primaryButton";
import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";
import LoginModal from "../forms/loginModal";

const SignInButton = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <>
      <div>
        <PrimaryButton text={"Sign In"} onClick={() => setModalShow(true)} />
      </div>
      <LoginModal show={modalShow} setShow={setModalShow} onBlur={true} />
    </>
  );
};

export default SignInButton;
