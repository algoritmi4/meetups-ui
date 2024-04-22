import { baseApi } from "@/shared/api";
import { IEvent, IGetEventRequest } from "../model/types";
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
    })
  })
})

export const { useGetEventsQuery, useCreateEventMutation, useGetTopEventsQuery } = eventApi;
