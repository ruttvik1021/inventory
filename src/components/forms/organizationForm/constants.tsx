"use client";
import * as Yup from "yup";

export interface IOrganizationInformation {
  organizationName: string;
  industryId: string;
  name: string;
  organizationLogo: string;
  mobileNumber: string;
  address: string;
  email: string;
  options: string;
  aboutus?: string;
}

export const OrganizationInitialValues: IOrganizationInformation = {
  organizationName: "",
  industryId: "",
  name: "",
  organizationLogo: "",
  mobileNumber: "",
  address: "",
  email: "",
  options: "",
  aboutus: "",
};

export const organizationInfoKeys = {
  organizationName: "organizationName",
  industryId: "industryId",
  name: "name",
  organizationLogo: "organizationLogo",
  mobileNumber: "mobileNumber",
  address: "address",
  email: "email",
  options: "options",
  aboutus: "aboutus",
};

export const OrganizationYup = Yup.object().shape({
  organizationName: Yup.string().required("Required"),
  industryId: Yup.string().required("Required"),
  name: Yup.string().max(30, "Max 30 characters").required("Required"),
  organizationLogo: Yup.string(),
  address: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});
