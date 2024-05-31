import {baseApi} from '@/shared/api'
import {ProfileDetails, ProfileId, ProfileFollowing, IFollowResponse, ProfileDetailsDto} from "@/entities/profile/model/types";
import {mapProfileDetails} from "@/entities/profile/lib/mapProfileDetails";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profileDetails: build.query<ProfileDetails, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/`,
      }),
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
    }),
    myDetails: build.query<ProfileDetails, void>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: `/me`,
          method: 'GET'
        });

        if (result.error?.status === 401) {
          return { error: result.error.data as FetchBaseQueryError };
        }

        const mappedData = mapProfileDetails(result.data as ProfileDetailsDto);

        return { data: mappedData };
      },
      providesTags: ['SESSION_TAG']
    }),
    getFollowing: build.query<ProfileFollowing[], ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/following/`,
      }),
    }),
    getFollowers: build.query<ProfileFollowing[], ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/followers/`,
      }),
    }),
    follow: build.mutation<IFollowResponse, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/follow/`,
        method: 'POST',
      }),
    }),
    unFollow: build.mutation<void, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/unfollow/`,
        method: 'DELETE',
      }),
    }),
}),
})

export const {
  useProfileDetailsQuery,
  useMyDetailsQuery,
  useLazyMyDetailsQuery,
  useGetFollowingQuery,
  useGetFollowersQuery,
  useFollowMutation,
  useUnFollowMutation
} = profileApi
