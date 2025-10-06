import type { DivisionResponse, IDivision, IResponse } from "@/types";
import baseApi from "../../baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create division
    createDivision: builder.mutation<IResponse<DivisionResponse>, IDivision>({
      query: (payload) => ({
        url: "/division/create",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    // delete division
    deleteDivision: builder.mutation<IResponse<IDivision>, string>({
      query: (id) => ({
        url: `/division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DIVISION"],
    }),

    // Get all divisions
    getAllDivisions: builder.query({
      query: () => ({
        url: "division",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const {
  useCreateDivisionMutation,
  useDeleteDivisionMutation,
  useGetAllDivisionsQuery,
} = divisionApi;
