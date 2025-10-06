import type { IResponse, ITourType, TourTypeResponse } from "@/types";
import baseApi from "../../baseApi";

export const tourTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create tour-type
    createTourType: builder.mutation<IResponse<TourTypeResponse>, ITourType>({
      query: (payload) => ({
        url: "/tour-type/create",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["TOURTYPE"],
    }),

    // delete tour-type
    deleteTourType: builder.mutation<IResponse<TourTypeResponse>, string>({
      query: (id) => ({
        url: `/tour-type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOURTYPE"],
    }),

    // Get all tour-types
    getAllTourTypes: builder.query({
      query: () => ({
        url: "tour-type",
        method: "GET",
      }),
      providesTags: ["TOURTYPE"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const {
  useCreateTourTypeMutation,
  useGetAllTourTypesQuery,
  useDeleteTourTypeMutation,
} = tourTypeApi;
