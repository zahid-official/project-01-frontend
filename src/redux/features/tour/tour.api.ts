import type { IResponse, ITourType, TourTypeResponse } from "@/types";
import baseApi from "../../baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create tour-type
    createTourType: builder.mutation<IResponse<TourTypeResponse>, ITourType>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        data: payload,
      }),
    }),

    // Get all tour-types
    getAllTourTypes: builder.query({
      query: () => ({
        url: "tour-type",
        method: "GET",
      }),
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const { useCreateTourTypeMutation, useGetAllTourTypesQuery } = tourApi;
