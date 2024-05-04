import { baseApi } from "@/shared/api";
import { IChangePasswordInfo } from "../model/types";

const securityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation<void, IChangePasswordInfo>({
      query: ({ password, old_password }) => ({
        url: '/password/change/',
        method: 'POST',
        body: {
          password,
          old_password
        }
      })
    })
  })
})

export const { useChangePasswordMutation } = securityApi;
