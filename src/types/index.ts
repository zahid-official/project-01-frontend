import type { ComponentType } from "react";

export type { IRegister, ILogin, ISendOtp, IVerifyOtp } from "./auth.types";
export type { RegisterResponse, LoginResponse } from "./auth.types";

// IResponse for baseApi queries and mutations
export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ISidebar for dashboard
export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
