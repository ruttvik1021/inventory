"use client";

import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FormikProvider, useFormik } from "formik";
import TextField from "@/components/textfield";
import * as Yup from "yup";
import { forgotPassword, userLogin, userSignUp } from "@/_api/unauthAPIs";
import { IMessage, formTypes, messageEnums } from "@/contants";
import LoginForm from "./loginForm";
import CompanyInfoForm from "./companyInfoForm";
import useAuth from "@/utils/useAuth";
import { IInitialAuthState } from "@/utils/AuthContext";
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
  const cancelButtonRef = useRef(null);
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
      if (!body?.companyInfo) {
        setInitialAuthState({
          ...initialAuthState,
          companyInfoAvailable: false,
        });
        router.push("/organization-info");
      }
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
      console.log("error");
    }
  };

  useEffect(() => {
    if (show === false) {
      loginFormik.resetForm();
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
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as={"div"}
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onBlur ? () => setShow(false) : () => setShow(true)} // This ensures the modal is closed only when this function is called
      >
        <div className="flex min-h-screen items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="p-10 bg-white rounded-3xl sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="flex justify-end">
                <span
                  className="font-semibold text-lg  cursor-pointer"
                  onClick={() => setShow(false)}
                >
                  X
                </span>
              </div>
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
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoginModal;
