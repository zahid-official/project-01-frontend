import type { IResponse, TourResponse } from "@/types";
import baseApi from "../../baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create tour-type
    createTour: builder.mutation<IResponse<TourResponse>, FormData>({
      query: (payload) => ({
        url: "/tour/create",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["TOUR"],
    }),

    // delete tour-type
    deleteTour: builder.mutation<IResponse<TourResponse>, string>({
      query: (id) => ({
        url: `/tour/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),

    // Get all tour-types
    getAllTours: builder.query({
      query: () => ({
        url: "tour",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const {
  useCreateTourMutation,
  useGetAllToursQuery,
  useDeleteTourMutation,
} = tourApi;
