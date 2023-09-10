export enum formTypes {
  LOGIN = "login",
  SIGNUP = "signup",
  FORGOT_PASSWORD = "forgotPassword",
  COMPANY_INFO = "companyInformation",
}

export enum messageEnums {
  SUCCESS = "success",
  ERROR = "error",
}

export interface IMessage {
  style: "success" | "error";
  message: string;
}
