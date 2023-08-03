"use client";
import {
  IOrganizationInformation,
  OrganizationInitialValues,
  OrganizationYup,
} from "@/components/forms/organizationForm/constants";
import ImagePicker from "@/components/forms/organizationForm/imagePicker";
import { FormikProvider, useFormik } from "formik";

const OrgInfo = () => {
  const organizationFormik = useFormik<IOrganizationInformation>({
    initialValues: OrganizationInitialValues,
    validationSchema: OrganizationYup,
    onSubmit: (values: any) => {
      console.log(values);
    },
  });
  return (
    <>
      <form className="space-y-6" onSubmit={organizationFormik.handleSubmit}>
        <FormikProvider value={organizationFormik}>
          <div className="flex">
            <ImagePicker
              label={"Organization Logo"}
              name={"organizationLogo"}
              formik={organizationFormik}
            />
          </div>
        </FormikProvider>
      </form>
    </>
  );
};

export default OrgInfo;
