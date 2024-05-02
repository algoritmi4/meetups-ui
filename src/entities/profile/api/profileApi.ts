import {baseApi} from '@/shared/api'
import {ProfileDetailsDto, ProfileFollowingDto} from "@/entities/profile/api/types";
import {ProfileDetails, ProfileId, ProfileFollowing} from "@/entities/profile/model/types";
import {mapProfileDetails, mapProfileFollowing} from "@/entities/profile/lib/mapProfileDetails";


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
      query: () => ({
        url: `/me`,
      }),
      transformResponse: (response: ProfileDetailsDto) =>
          mapProfileDetails(response),
    }),
    getProfileFollowing: build.query<ProfileFollowing[], ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/following/`,
      }),
    }),
    getProfileFollowers: build.query<ProfileFollowing[], ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/followers/`,
      }),
    }),
    postProfileFollow: build.mutation<void, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/follow/`,
        method: 'POST',
      }),
    }),
    delProfileFollow: build.mutation<void, ProfileId>({
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
  useGetProfileFollowingQuery,
  useGetProfileFollowersQuery,
  usePostProfileFollowMutation,
  useDelProfileFollowMutation
} = profileApi
 