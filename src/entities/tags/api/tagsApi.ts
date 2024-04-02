import { baseApi } from "@/shared/api";
import { IApiResponse } from "@/shared/types";
import { ITag } from "../model/types";

const tagsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<IApiResponse<ITag[]>, void>({
      query: () => ({
        url: '/tags/',
        method: 'GET'
      })
    })
  })
})

export const { useGetTagsQuery } = tagsApi;
