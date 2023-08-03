"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

export interface IOrganizationInformation {
  organizationName: string;
  industry: string;
  firstName: string;
  lastName: string;
  organizationLogo: string;
  mobileNumber: string;
  address: string;
}

export const OrganizationInitialValues: IOrganizationInformation = {
  organizationName: "",
  industry: "",
  firstName: "",
  lastName: "",
  organizationLogo: "",
  mobileNumber: "",
  address: "",
};

export const OrganizationYup = Yup.object().shape({
  organizationName: Yup.string().required("Required"),
  industry: Yup.string().required("Required"),
  firstName: Yup.string().max(15, "Max 15 characters").required("Required"),
  lastName: Yup.string().max(15, "Max 15 characters").required("Required"),
  organizationLogo: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});
