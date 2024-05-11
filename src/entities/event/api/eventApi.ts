import { baseApi } from "@/shared/api";
import {IDetailedEvent, IEvent, IGetEventRequest} from "../model/types";
import { IApiResponse } from "@/shared/types";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IApiResponse<IEvent[]>, IGetEventRequest>({
      query: (params) => ({
        url: '/events/',
        method: 'GET',
        params
      }),
      providesTags: ['EVENTS_TAG']
    }),
    getEvent: build.query<IDetailedEvent, number>({
      query: (id) => ({
        url: `/events/${id}/`,
        method: 'GET'
      }),
      providesTags: ['EVENTS_TAG']
    }),
    createEvent: build.mutation<void, AddEventValidationSchema>({
      query: (eventInfo) => ({
        url: '/events/',
        method: 'POST',
        body: eventInfo
      }),
    }),
    registerToEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/register/`,
        method: 'POST'
      }),
    }),
    leaveFromEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/leave/`,
        method: 'POST'
      }),
    }),
    likeEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/favorite/`,
        method: 'POST'
      }),
      invalidatesTags: ['EVENTS_TAG']
    }),
    unlikeEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/favorite/`,
        method: 'DELETE'
      }),
      invalidatesTags: ['EVENTS_TAG']
    }),
  })
})

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useRegisterToEventMutation,
  useLeaveFromEventMutation,
  useLikeEventMutation,
  useUnlikeEventMutation
} = eventApi;
