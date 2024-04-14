import { baseApi } from "@/shared/api";
import { ISelectInputOptions } from "@/shared/model/types";
import { IApiResponse } from "@/shared/types";

const tagsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<IApiResponse<ISelectInputOptions[]>, void>({
      query: () => ({
        url: '/tags/',
        method: 'GET'
      })
    }),
    createTag: build.mutation<ISelectInputOptions, string>({
      query: (tagName) => ({
        url: '/tags/',
        method: 'POST',
        body: {
          name: tagName
        }
      })
    })
  })
})

export const { useGetTagsQuery, useCreateTagMutation } = tagsApi;
