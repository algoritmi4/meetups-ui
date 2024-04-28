import { baseApi } from "@/shared/api";
import { ISelectInputOptions } from "@/shared/model/types";
import { IApiResponse } from "@/shared/types";

const currencyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query<IApiResponse<ISelectInputOptions[]>, void>({
      query: () => ({
        url: '/currencies/',
        method: 'GET'
      })
    })
  })
})

export const { useGetCurrenciesQuery } = currencyApi;
