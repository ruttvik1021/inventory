"use client";
import PrimaryButton from "@/components/primaryButton";
import TextField from "@/components/textfield";
import React, { useState } from "react";
import { productFormKeys } from "./constants";
import SelectField from "@/components/selectField";
import ArrowIcon from "@/utils/images/icons/arrowIcon";

const ProductForm = ({ categoryList, formik, close }: any) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex justify-between ml-3 mt-3">
            <ArrowIcon direction={"Left"} onClick={close} />
            {/* <PrimaryButton text={"Back"} onClick={close} /> */}
            <PrimaryButton
              text={editMode ? "Cancel" : "Edit"}
              onClick={() => setEditMode(!editMode)}
            />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <TextField
                type={"text"}
                label={"Product Name"}
                name={productFormKeys.productName}
                placeholder={"Product Name"}
                disabled={!editMode}
              />
            </div>
            <div className="sm:col-span-2">
              <SelectField
                label={"Category"}
                options={categoryList}
                labelKey={"categoryName"}
                valueKey={"id"}
                name={productFormKeys.categoryId}
                isClearable
                onChange={(e) =>
                  formik.setFieldValue(productFormKeys.categoryId, e)
                }
                isDisabled={!editMode}
              />
            </div>

            <div className="sm:col-span-2">
              <TextField
                type={"text"}
                label={"Product Name"}
                name={productFormKeys.productName}
                placeholder={"Product Name"}
                disabled={!editMode}
              />
            </div>

            {/* <div className="sm:col-span-3">
              <TextField
                type={"text"}
                label={"Address"}
                name={organizationInfoKeys.address}
                placeholder={"Address"}
                disabled={!editMode}
              />
            </div>
            <div className="sm:col-span-3">
              <TextField
                type={"text"}
                label={"Mobile Number"}
                name={organizationInfoKeys.mobileNumber}
                placeholder={"Mobile Number"}
                disabled={!editMode}
              />
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <SelectField
                label={"Industry"}
                options={industryList}
                labelKey={"industryName"}
                valueKey={"id"}
                name={organizationInfoKeys.industryId}
                isClearable
                onChange={(e) => formik.setFieldValue("industryId", e)}
                isDisabled={!editMode}
              />
            </div>

            <div className="sm:col-span-4">
              <TextField
                type={"text"}
                label={"About Organization"}
                name={organizationInfoKeys.aboutus}
                placeholder={"About Organization"}
                disabled={!editMode}
              />
            </div> */}
          </div>
        </div>
      </div>

      <div className="my-6 flex items-center justify-end gap-x-6">
        {/* <PrimaryButton text={"Back"} onClick={() => router.back()} /> */}
        {editMode && (
          <PrimaryButton
            text={"Save"}
            onClick={(e: any) => {
              e.preventDefault();
              console.log("save", formik.values);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ProductForm;
