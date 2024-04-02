import { baseApi } from "@/shared/api";
import { IEvent, IGetEventRequest } from "../model/types";
import { IApiResponse } from "@/shared/types";
import { AddEventValidationSchema } from "@/features/addEvent/model/addEventFormSchema";

export const eventApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<IApiResponse<IEvent[]>, IGetEventRequest>({
      query: ({ search, categories }) => ({
        url: '/events/',
        method: 'GET',
        params: {
          search,
          category__name__in: categories
        }
      })
    }),
    createEvent: build.mutation<void, AddEventValidationSchema>({
      query: (eventInfo) => ({
        url: '/events/',
        method: 'POST',
        body: eventInfo
      })
    })
  })
})

export const { useGetEventsQuery, useCreateEventMutation } = eventApi;
