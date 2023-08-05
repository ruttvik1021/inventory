"use client";

import { forgotPassword, userLogin, userSignUp } from "@/_api/unauthAPIs";
import { IMessage, formTypes, messageEnums } from "@/contants";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import LoginForm from "./loginForm";
// import CompanyInfoForm from "./companyInfoForm";
import Modal from "@/components/modalTemplate/Modal";
import useAuth from "@/utils/context/useAuth";
import { useRouter } from "next/navigation";

interface IModal {
  show: boolean;
  setShow: (state: boolean) => void;
  onBlur?: boolean;
}

interface IInitialValues {
  email: string;
  password: string;
}

const LoginModal = ({ show, setShow, onBlur }: IModal) => {
  const router = useRouter();

  const { initialAuthState, setInitialAuthState, loginUser } = useAuth();
  const [formType, setFormType] = useState(formTypes.LOGIN);
  const [message, setMessage] = useState<IMessage | null>({
    style: messageEnums.SUCCESS,
    message: "",
  });

  const userLoginApi = async (values: IInitialValues) => {
    const { status, body } = await userLogin(values);
    if (status > 199 && status < 299) {
      loginFormik.resetForm();
      setInitialAuthState({
        ...initialAuthState,
        isAuthenticated: true,
        companyInfoAvailable: body?.companyInfo,
      });
      setShow(false);
      loginUser(body?.token || null);
    } else {
      setMessage({
        style: messageEnums.ERROR,
        message: body.message,
      });
    }
  };

  const userSignUpApi = async (values: IInitialValues) => {
    const { status, body } = await userSignUp(values);
    if (status > 199 && status < 299) {
      loginFormik.resetForm();
      setFormType(formTypes.LOGIN);
      setMessage({
        style: messageEnums.SUCCESS,
        message: body.message,
      });
    } else {
      setMessage({
        style: messageEnums.ERROR,
        message: body.message,
      });
    }
  };

  const forgotPasswordApi = async (values: any) => {
    delete values.password;
    const { status, body } = await forgotPassword(values);
    if (status > 199 && status < 299) {
      loginFormik.resetForm();
      setFormType(formTypes.LOGIN);
    } else {
      setMessage({
        style: messageEnums.ERROR,
        message: body.message,
      });
    }
  };

  useEffect(() => {
    if (show === false) {
      loginFormik.resetForm();
      setFormType(formTypes.LOGIN);
    }
  }, [show]);

  const setPasswordYup = () => {
    switch (formType) {
      case formTypes.LOGIN:
        return Yup.string().required("Required");
      case formTypes.SIGNUP:
        return Yup.string()
          .required("Required")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          );
      default:
        return Yup.string().nullable();
    }
  };

  const apiCall = (values: IInitialValues) => {
    switch (formType) {
      case formTypes.LOGIN:
        userLoginApi(values);
        break;
      case formTypes.SIGNUP:
        userSignUpApi(values);
        break;
      case formTypes.FORGOT_PASSWORD:
        forgotPasswordApi(values);
        break;
    }
  };

  const getTitle = () => {
    switch (formType) {
      case formTypes.LOGIN:
        return "Sign In";
      case formTypes.SIGNUP:
        return "Sign Up";
      case formTypes.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Required"),
      password: setPasswordYup(),
    }),
    onSubmit: (values) => {
      setMessage(null);
      apiCall(values);
    },
  });

  return (
    <Modal show={show} setShow={setShow} onBlur={false}>
      <div>
        <p className="font-semibold text-lg text-indigo-600 hover:text-indigo-500">
          {getTitle()}
        </p>
      </div>
      <FormikProvider value={loginFormik}>
        <LoginForm
          formik={loginFormik}
          formType={formType}
          setFormType={setFormType}
          message={message}
        />
      </FormikProvider>
    </Modal>
  );
};

export default LoginModal;
