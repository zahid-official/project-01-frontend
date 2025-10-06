import type { ComponentType } from "react";

// Auth types
export type {
  RegisterResponse,
  LoginResponse,
  IRegister,
  ILogin,
  ISendOtp,
  IVerifyOtp,
} from "./auth.types";

// TourType types
export type { TourTypeResponse, ITourType } from "./tourType.types";

// Division types
export type { DivisionResponse, IDivision } from "./division.types";

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
