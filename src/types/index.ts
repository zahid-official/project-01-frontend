export type { IRegister, ILogin, ISendOtp, IVerifyOtp } from "./auth.types";
export type { RegisterResponse, LoginResponse } from "./auth.types";

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
