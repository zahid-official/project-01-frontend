import baseApi from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profileInfo: builder.query({
      query: () => ({
        url: "user/profile",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const { useProfileInfoQuery } = userApi;
