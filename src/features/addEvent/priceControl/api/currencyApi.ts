import { baseApi } from "@/shared/api";
import { IApiResponse } from "@/shared/types";

interface ICurrency {
  name: string;
  id: number;
}

const currencyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query<IApiResponse<ICurrency[]>, void>({
      query: () => ({
        url: '/currencies/',
        method: 'GET'
      })
    })
  })
})

export const { useGetCurrenciesQuery } = currencyApi;
