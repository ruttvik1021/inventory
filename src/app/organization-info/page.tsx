"use client";
import { getCurrentUserApi, updateOrgInfoAPI } from "@/_api/auth";
import { getCountryListApi } from "@/_api/unauthAPIs";
import {
  IOrganizationInformation,
  OrganizationInitialValues,
  OrganizationYup,
} from "@/components/forms/organizationForm/constants";
import OrgForm from "@/components/forms/organizationForm/form";
import ImagePicker from "@/components/forms/organizationForm/imagePicker";
import { AuthContext } from "@/utils/context/AuthContext";
import useAuth from "@/utils/context/useAuth";
import { FormikProvider, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const OrgInfo = () => {
  const { initialAuthState, setInitialAuthState } = useAuth();
  const router = useRouter();
  const organizationFormik = useFormik<IOrganizationInformation>({
    initialValues: OrganizationInitialValues,
    // validationSchema: OrganizationYup,
    onSubmit: (values: any) => {
      updateOrganizatioInfo(values);
    },
  });

  const updateOrganizatioInfo = async (values: any) => {
    try {
      const { status, body } = await updateOrgInfoAPI(values);
      if (status === 200) {
        setInitialAuthState({
          ...initialAuthState,
          companyInfoAvailable: true,
          organizationLogo: body.body.organizationLogo,
        });
        toast.success("Profile updated Successfully");
        router.push("/home");
      } else {
        toast.error(body?.message ? body?.message : "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUser = async () => {
    const { status, body } = await getCurrentUserApi();
    if (status === 200) {
      const filteredData = Object.keys(organizationFormik.initialValues).reduce(
        (acc: any, key: any) => {
          if (body.hasOwnProperty(key)) {
            acc[key] = body[key];
          }
          return acc;
        },
        {}
      );
      organizationFormik.setValues(filteredData);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div>
      <form className="space-y-6" onSubmit={organizationFormik.handleSubmit}>
        <FormikProvider value={organizationFormik}>
          <div className="px-5">
            <OrgForm formik={organizationFormik} />
          </div>
        </FormikProvider>
      </form>
    </div>
  );
};

export default OrgInfo;
