import {baseApi, SESSION_TAG} from '@/shared/api'
import {mapSession} from '@/shared/lib/mapSession'
import {RefreshToken, Session, SessionDto} from "@/shared/model/types";
import {IConfirmEmailRequest, RequestEmailCheckBody, RequestLoginBody, RequestRegistrationBody} from '../model/types';


export const sessionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<Session, RequestLoginBody>({
            query: (body) => ({
                url: `/login/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
            transformResponse: (response: SessionDto) => mapSession(response),
        }),
        logout: build.mutation<void, RefreshToken>({
            query: (body) => ({
                url: `/logout/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [SESSION_TAG],
        }),
        register: build.mutation<void, RequestRegistrationBody>({
            query: (body) => ({
              url: `/signup/`,
              method: 'POST',
              body,
            }),
            invalidatesTags: [SESSION_TAG]
        }),
        checkEmail: build.mutation<void | null, RequestEmailCheckBody>({
            query: (body) => ({
              url: `/email-exists/`,
              method: 'POST',
              body,
            })
        }),
        confirmEmail: build.query<Session, IConfirmEmailRequest>({
          query: (params) => ({
            url: `/verify/email/`,
            method: 'GET',
            params
          })
      }),
    }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useCheckEmailMutation,
  useLazyConfirmEmailQuery
} = sessionApi
