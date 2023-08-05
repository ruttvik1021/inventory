import React from "react";
import { Formik, Field, ErrorMessage } from "formik";

interface ITextField {
  type: "text" | "number" | "password";
  required?: boolean;
  label: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  maxLength?: number;
}

const TextField = ({
  type,
  required,
  label,
  name,
  placeholder,
  disabled,
  maxLength,
}: ITextField) => {
  return (
    <>
      <label>{label}</label>
      {required && <span className="text-red-600 ml-1">*</span>}
      <Field name={name}>
        {({ field, meta }: any) => (
          <div>
            <input
              type={type}
              {...field}
              disabled={disabled}
              maxLength={maxLength}
              autoComplete="false"
              placeholder={placeholder}
              className={`mt-2 block w-full rounded-md border-0 py-1.5 px-3 ${
                meta.touched && meta.error && "ring-red-600"
              } text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6 `}
            />
            {meta.touched && meta.error && (
              <div className="text-sm text-red-600">{meta.error}</div>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default TextField;
