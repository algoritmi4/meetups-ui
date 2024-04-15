import { baseApi } from "@/shared/api";
import { IReview } from "../model/types";
import { IApiResponse } from "@/shared/types";


export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query<IApiResponse<IReview[]>, number>({
      query: (event_id) => ({
        url: `/review/${event_id}/`,
        method: 'GET'
      })
    })
  })
})

export const { useGetReviewsQuery } = reviewApi;
