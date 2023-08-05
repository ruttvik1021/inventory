"use client";
import { getCurrentUserApi } from "@/_api/auth";
import {
  IOrganizationInformation,
  OrganizationInitialValues,
  OrganizationYup,
} from "@/components/forms/organizationForm/constants";
import OrgForm from "@/components/forms/organizationForm/form";
import ImagePicker from "@/components/forms/organizationForm/imagePicker";
import { AuthContext } from "@/utils/context/AuthContext";
import { FormikProvider, useFormik } from "formik";
import { useEffect } from "react";

const OrgInfo = () => {
  const organizationFormik = useFormik<IOrganizationInformation>({
    initialValues: OrganizationInitialValues,
    // validationSchema: OrganizationYup,
    onSubmit: (values: any) => {
      console.log("userDetails", values);
    },
  });

  //   {
  //     organizationName: "",
  //     retailType: "",
  //     name: ""
  //     organizationLogo: "",
  //     mobileNumber: "",
  //     address: "",
  //   };

  //   interface ICompleteForm {
  //     organizationName: string;
  //     organizationLogo: string;
  //     name: string;
  //     profileCompleted: boolean;
  //     termAccepted: boolean;
  //     mobileNumber: string;
  //     retailTypeId: string;
  //     retailType: string;
  //     email: string;
  //     aboutus?: string;
  //   }

  //   {
  //     "_id": "64c5fbf5f819952736bf7db4",
  //     "email": "ruttvik@mail.com",
  //     "name": "",
  //     "organizationLogo": "",
  //     "organizationName": "",
  //     "retailTypeId": "",
  //     "organizationId": "64c5fbeaf819952736bf7db2",
  //     "profileCompleted": false,
  //     "termAccepted": false,
  //     "mobileNumber": "",
  //     "retailType": "",
  //     "__v": 0
  // }

  const getCurrentUser = async () => {
    const { status, body } = await getCurrentUserApi();
    organizationFormik.setFieldValue("organizationName", body.organizationName);
    organizationFormik.setFieldValue("email", body.email);
    organizationFormik.setFieldValue("organizationName", body.organizationName);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <>
      <form className="space-y-6" onSubmit={organizationFormik.handleSubmit}>
        <FormikProvider value={organizationFormik}>
          <div className="px-5">
            <OrgForm formik={organizationFormik} />
          </div>
        </FormikProvider>
      </form>
    </>
  );
};

export default OrgInfo;
