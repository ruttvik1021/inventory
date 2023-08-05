"use client";
import TextField from "@/components/textfield";
import ImagePicker from "./imagePicker";
import MobileInput from "@/components/mobileNumber/Index";

const OrgForm = ({ formik }: any) => {
  return (
    <>
      {/* <form> */}
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-1">
              <ImagePicker name={"organizationLogo"} formik={formik} />
            </div>
            <div className="sm:col-span-5">
              <TextField
                type={"text"}
                label={"Organization Name"}
                name={"organizationName"}
                placeholder={"Organization Name"}
              />
            </div>
            <div className="sm:col-span-3">
              <TextField
                type={"text"}
                label={"Name"}
                name={"name"}
                placeholder={"Name"}
              />
            </div>

            <div className="sm:col-span-3">
              <TextField
                type={"text"}
                label={"Email address"}
                name={"email"}
                placeholder={"Email address"}
                disabled={true}
              />
            </div>

            <div className="sm:col-span-3">
              <TextField
                type={"text"}
                label={"Address"}
                name={"address"}
                placeholder={"Address"}
              />
            </div>
            <div className="sm:col-span-3">
              <TextField
                type={"number"}
                label={"Mobile Number"}
                name={"mobileNumber"}
                placeholder={"Mobile Number"}
              />
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <TextField
                type={"text"}
                label={"Retail Type"}
                name={"retailType"}
                placeholder={"Retail Type (Hardware, Spares, etc)"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
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
      </div>
      {/* </form> */}
    </>
  );
};

export default OrgForm;
