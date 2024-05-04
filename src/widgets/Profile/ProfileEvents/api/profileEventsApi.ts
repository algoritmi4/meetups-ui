import { baseApi } from "@/shared/api";
import { IEvent } from "@/entities/event/model/types";
import { ProfileId } from "@/entities/profile/model/types";

export const profileEventsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileCreatedEvents: build.query<IEvent[], ProfileId>({
      query: ({ userId }) => ({
        url: `/users/${userId}/events/created/`,
        method: 'GET',
      })
    }),
    getProfilePlannedEvents: build.query<IEvent[], ProfileId>({
        query: ({ userId }) => ({
          url: `/users/${userId}/events/planned/`,
          method: 'GET',
        })
      }),
      getProfileVisitedEvents: build.query<IEvent[], ProfileId>({
        query: ({ userId }) => ({
          url: `/users/${userId}/events/finished/`,
          method: 'GET',
        })
      }),
  })
})

export const { useGetProfileCreatedEventsQuery, useGetProfilePlannedEventsQuery, useGetProfileVisitedEventsQuery } = profileEventsApi;
