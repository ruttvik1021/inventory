"use client";
import PrimaryButton from "@/components/primaryButton";
import TextField from "@/components/textfield";
import React, { useState } from "react";
import { discountTypes, productFormKeys } from "./constants";
import SelectField from "@/components/selectField";
import ArrowIcon from "@/utils/images/icons/arrowIcon";
import Datepicker from "@/components/datePicker";
import Checkbox from "@/components/checkbox";
import ImagePicker from "../organizationForm/imagePicker";
import { CloseIcon } from "@/utils/images/icons/closeIcon";

const ProductForm = ({ formik, close, initialState, editMode }: any) => {
  const removeImage = (index: number) => {
    formik.values.images.splice(index, 1);
    formik.setFieldValue(productFormKeys.images, formik.values.images);
  };

  return (
    <>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                options={initialState.categoryList}
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
                label={"Purchase Price"}
                name={productFormKeys.purchasePrice}
                placeholder={"Purchase Price"}
                disabled={!editMode}
              />
            </div>

            <div className="sm:col-span-2">
              <TextField
                type={"text"}
                label={"Price"}
                name={productFormKeys.price}
                placeholder={"Price"}
                disabled={!editMode}
              />
            </div>

            <div className="sm:col-span-2">
              <SelectField
                label={"Discount Type"}
                options={discountTypes}
                labelKey={"value"}
                valueKey={"value"}
                name={productFormKeys.discountType}
                isClearable
                onChange={(e) =>
                  formik.setFieldValue(productFormKeys.discountType, e)
                }
                isDisabled={!editMode}
              />
            </div>

            <div className="sm:col-span-2">
              <TextField
                type={"text"}
                label={"Discount"}
                name={productFormKeys.discount}
                placeholder={"Discount"}
                disabled={!editMode}
              />
            </div>

            <div className="sm:col-span-2">
              <TextField
                type={"text"}
                label={"Opening Stock"}
                name={productFormKeys.openingStock}
                placeholder={"Opening Stock"}
                disabled={!editMode}
              />
            </div>
            <div className="sm:col-span-2">
              <TextField
                type={"text"}
                label={"Low Quantity"}
                name={productFormKeys.lowQuantity}
                placeholder={"Opening Stock"}
                disabled={!editMode}
              />
            </div>
            <div className="sm:col-span-2">
              <Datepicker
                label={"As of Date"}
                name={productFormKeys.stockDate}
                disabled={!editMode}
                value={formik.values.stockDate}
              />
            </div>
            {editMode ? (
              <div className="sm:col-span-4">
                <ImagePicker
                  name={productFormKeys.images}
                  formik={formik}
                  multiple={true}
                />
              </div>
            ) : null}
          </div>
          <div className="flex flex-wrap mt-4 gap-5">
            {formik.values.images.map((item: any, index: number) => (
              <div>
                {editMode ? (
                  <div className="flex justify-end gap-3">
                    <CloseIcon
                      onClick={() => removeImage(index)}
                      className="cursor-pointer w-8"
                    />
                  </div>
                ) : null}
                <img src={item} alt="Product Image" width={"200px"} />
              </div>
            ))}
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
              formik.handleSubmit();
            }}
          />
        )}
      </div>
    </>
  );
};

export default ProductForm;
