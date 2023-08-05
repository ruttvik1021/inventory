"use client";
import { Field } from "formik";
import React, { useRef, useState } from "react";
import { IOrganizationInformation } from "./constants";
import CloseIcon from "@/utils/images/icons/closeIcon";

interface IImagePicker {
  label?: string;
  required?: boolean;
  name: string;
  formik: any;
}

export const imageFileTypes = [
  "image/png",
  "image/PNG",
  "image/jpg",
  "image/JGP",
  "image/jpeg",
  "image/JPEG",
];

const ImagePicker = ({ label, required, name, formik }: IImagePicker) => {
  const convertImagetoURI = (e: any) => {
    const file = e.target?.files[0];
    if (imageFileTypes.find((item: any) => item === e.target.files[0]?.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue(name, reader.result);
      };
      reader.readAsDataURL(file);
    } else formik.setFieldError(name, "Only Jpg, Jpeg & Png formats supported");
  };
  return (
    <>
      <label>{label ? label : null}</label>
      {required && <span className="text-red-600 ml-1">*</span>}
      <Field name={name}>
        {({ field, meta }: any) => (
          <div>
            {!formik.values[name] ? (
              <>
                <input
                  type="file"
                  {...field}
                  autoComplete="false"
                  onChange={(e) => convertImagetoURI(e)}
                  value={null}
                  className={`block w-full rounded-md border-0 py-1.5 px-3 ${
                    meta.touched && meta.error && "ring-red-600"
                  } text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6 `}
                />
                {meta.touched && meta.error && (
                  <div className="text-sm text-red-600">{meta.error}</div>
                )}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    src={formik.values[name]}
                    alt=""
                    width={"100px"}
                    className="border-2 p-1 rounded-full border-red-500"
                  />{" "}
                  <div>
                    <CloseIcon
                      onClick={() => formik.setFieldValue(name, "")}
                      className="cursor-pointer w-8"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default ImagePicker;
