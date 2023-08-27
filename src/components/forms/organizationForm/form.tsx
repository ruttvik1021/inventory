"use client";
import SelectField from "@/components/selectField";
import TextField from "@/components/textfield";
import ImagePicker from "./imagePicker";
import { organizationInfoKeys } from "./constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

const OrgForm = ({ formik, industryList }: any) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex justify-end ml-3 mt-3">
            <button
              onClick={() => setEditMode(!editMode)}
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <ImagePicker
                label={"Organization Logo"}
                name={"organizationLogo"}
                formik={formik}
                disabled={!editMode}
              />
            </div>
            <div className="sm:col-span-5">
              <TextField
                type={"text"}
                label={"Organization Name"}
                name={organizationInfoKeys.organizationName}
                placeholder={"Organization Name"}
                disabled={!editMode}
              />
            </div>
            <div className="sm:col-span-3">
              <TextField
                type={"text"}
                label={"Name"}
                name={organizationInfoKeys.name}
                placeholder={"Name"}
                disabled={!editMode}
              />
            </div>

            <div className="sm:col-span-3">
              <TextField
                type={"text"}
                label={"Email address"}
                name={organizationInfoKeys.email}
                placeholder={"Email address"}
                disabled={true}
              />
            </div>

            <div className="sm:col-span-3">
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
            </div>
          </div>
        </div>
      </div>

      <div className="my-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Back
        </button>
        {editMode && (
          <button
            type="submit"
            onClick={(e: any) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        )}
      </div>
    </>
  );
};

export default OrgForm;
