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
    profileFollowing: build.query<ProfileFollowing, ProfileId>({
      query: ({userId}) => ({
        url: `/users/${userId}/following/`,
      }),
      transformResponse: (response: ProfileFollowingDto) =>
        mapProfileFollowing(response),
    }),

}),
})

export const {
  useProfileDetailsQuery,
  useMyDetailsQuery,
  useProfileFollowingQuery,
} = profileApi
 