import type {
  ILogin,
  IRegister,
  IResponse,
  ISendOtp,
  IVerifyOtp,
  LoginResponse,
  RegisterResponse,
} from "@/types";
import baseApi from "../../baseApi";

// redux toolkit query for authentication
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Register user
    register: builder.mutation<IResponse<RegisterResponse>, IRegister>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    // Login user
    login: builder.mutation<IResponse<LoginResponse>, ILogin>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["USER"],
    }),

    // Logout user
    logout: builder.mutation<IResponse<null>, null>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // Send OTP
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (payload) => ({
        url: "/otp/send",
        method: "POST",
        data: payload,
      }),
    }),

    // Verify OTP
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (payload) => ({
        url: "/otp/verify",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
