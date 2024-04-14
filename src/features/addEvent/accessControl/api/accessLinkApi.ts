import { baseApi } from "@/shared/api";

const accessLinkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAccessLink: build.query<string, void>({
      query: () => ({
        url: '/events/private-url/',
        method: 'GET'
      })
    })
  })
})

export const { useLazyGetAccessLinkQuery } = accessLinkApi;
