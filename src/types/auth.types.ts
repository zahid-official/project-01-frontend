/*--------------------------
      Result Types
--------------------------*/
export interface Auth {
  provider: string;
  providerId: string;
}

export interface RegisterResponse {
  name: string;
  email: string;
  accountStatus: string;
  isDeleted: boolean;
  isVerified: boolean;
  role: string;
  auths: Auth[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// login response
export interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  accountStatus: string;
  isDeleted: boolean;
  isVerified: boolean;
  role: string;
  auths: Auth[];
  createdAt: string;
  updatedAt: string;
}

/*--------------------------
      QueryArg Types
--------------------------*/
export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}
