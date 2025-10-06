import type { ComponentType } from "react";
export type { RegisterResponse, LoginResponse } from "./auth.types";
export type { IRegister, ILogin, ISendOtp, IVerifyOtp } from "./auth.types";
export type { TourTypeResponse } from "./tour.types";
export type { ITourType } from "./tour.types";

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

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "GUIDE";
