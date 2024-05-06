import { baseApi } from "@/shared/api";
import {IDetailedEvent, IEvent, IGetEventRequest, IParticipant} from "../model/types";
import { IApiResponse } from "@/shared/types";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IApiResponse<IEvent[]>, IGetEventRequest>({
      query: ({ search, categories }) => ({
        url: '/events/',
        method: 'GET',
        params: {
          search,
          category__name__in: categories,
          ordering: 'start_date'
        }
      })
    }),
    getEvent: build.query<IDetailedEvent, number>({
      query: (id) => ({
        url: `/events/${id}/`,
        method: 'GET'
      })
    }),
    getTopEvents: build.query<IApiResponse<IEvent[]>, void>({
        query: () => ({
          url: '/events/',
          method: 'GET',
          params: {
            ordering: '-average_rating'
          }
        })
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
      })
    }),
    unlikeEvent: build.mutation<void, number>({
      query: (event_id) => ({
        url: `/events/${event_id}/favorite/`,
        method: 'DELETE'
      })
    }),
    getEventParticipants: build.query<IParticipant[], number>({
      query: (event_id) => ({
        url: `/events/${event_id}/participants/`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useGetTopEventsQuery,
  useRegisterToEventMutation,
  useLeaveFromEventMutation,
  useLikeEventMutation,
  useUnlikeEventMutation,
  useGetEventParticipantsQuery
} = eventApi;
