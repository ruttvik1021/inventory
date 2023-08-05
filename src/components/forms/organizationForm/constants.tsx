"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

export interface IOrganizationInformation {
  organizationName: string;
  retailType: string;
  name: string;
  organizationLogo: string;
  mobileNumber: string;
  address: string;
}

export const OrganizationInitialValues: IOrganizationInformation = {
  organizationName: "",
  retailType: "",
  name: "",
  organizationLogo: "",
  mobileNumber: "",
  address: "",
};

export const OrganizationYup = Yup.object().shape({
  organizationName: Yup.string().required("Required"),
  retailType: Yup.string().required("Required"),
  firstName: Yup.string().max(30, "Max 30 characters").required("Required"),
  organizationLogo: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});
