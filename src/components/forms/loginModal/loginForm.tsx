import PrimaryButton from "@/components/primaryButton";
import TextField from "@/components/textfield";
import { IMessage, formTypes, messageEnums } from "@/contants";
import React from "react";

interface ILoginForm {
  formik: any;
  formType: string;
  setFormType: any;
  message?: IMessage | null;
}
const LoginForm = ({ formik, formType, setFormType, message }: ILoginForm) => {
  return (
    <form className="space-y-6" onSubmit={formik.handleSubmit}>
      <div>
        <div className="mt-2">
          <TextField
            type={"text"}
            required
            label={"Email"}
            name={"email"}
            placeholder={"Email"}
          />
        </div>
      </div>
      {formType !== formTypes.FORGOT_PASSWORD && (
        <div>
          <div className="mt-2">
            <TextField
              type={"password"}
              required
              label={"Password"}
              name={"password"}
              placeholder={"Password"}
            />
          </div>
          {formType === formTypes.LOGIN && (
            <p
              className="font-semibold text-sm mt-1 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => setFormType(formTypes.FORGOT_PASSWORD)}
            >
              Forgot Password
            </p>
          )}
        </div>
      )}
      {message ? (
        <div className=" text-center mt-1">
          <p
            className={`font-semibold text-sm ${
              message.style === messageEnums.ERROR
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message.message}
          </p>
        </div>
      ) : null}
      <div>
        <div className="flex justify-between">
          <p className="font-light text-lg text-black">
            {formType === formTypes.LOGIN
              ? "Not a member ?"
              : formType === formTypes.SIGNUP
              ? "Already a member ?"
              : "Back to"}
            <span
              className="font-light text-sm ml-2 text-indigo-600 hover:text-indigo-500 cursor-pointer"
              onClick={() => {
                setFormType(
                  formType === formTypes.LOGIN
                    ? formTypes.SIGNUP
                    : formTypes.LOGIN
                );
                formik.resetForm();
              }}
            >
              {formType === formTypes.LOGIN ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
        <PrimaryButton
          text={
            formType === formTypes.LOGIN
              ? "Sign In"
              : formType === formTypes.SIGNUP
              ? "Sign Up"
              : "Send Email"
          }
          className="w-full mt-2"
          onClick={formik.handleSubmit}
        />
      </div>
    </form>
  );
};

export default LoginForm;
