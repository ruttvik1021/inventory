import TextField from "@/components/textfield";
import { IMessage, formTypes, messageEnums } from "@/contants";
import React from "react";

interface ICompanyForm {
  formik: any;
  formType: string;
  setFormType: any;
  message: IMessage | null;
}

const CompanyInfoForm = ({
  formik,
  formType,
  setFormType,
  message,
}: ICompanyForm) => {
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
      {message && (
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
      )}
      <div className="flex-col lg-flex-row">
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
        <button
          type="button"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={setFormType(formTypes.LOGIN)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CompanyInfoForm;
