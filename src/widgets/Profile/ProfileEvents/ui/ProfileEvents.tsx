import { ReactElement } from "react";
import { EventsList } from "@/widgets/EventsList";
import {
  useGetProfileCreatedEventsQuery,
  useGetProfilePlannedEventsQuery,
  useGetProfileVisitedEventsQuery,
} from "../api/profileEventsApi";
import { IProfileEvents } from "../model/types";

export function ProfileEvents({ profileId, data, isLoading }: IProfileEvents): ReactElement {
  const {
    data: createdEvents = [],
    isLoading: isCreatedEventsLoading,
    isSuccess: isCreatedEventsSuccess,
    isError: isCreatedEventsError,
    error: eventsCreatedError,
  } = useGetProfileCreatedEventsQuery({ userId: profileId });
  const {
    data: plannedEvents = [],
    isLoading: isPlannedEventsLoading,
    isSuccess: isPlannedEventsSuccess,
    isError: isPlannedEventsError,
    error: eventsPlannedError,
  } = useGetProfilePlannedEventsQuery({ userId: profileId });
  const {
    data: visitedEvents = [],
    isLoading: isVisitedEventsLoading,
    isSuccess: isVisitedEventsSuccess,
    isError: isVisitedEventsError,
    error: eventsVisitedError,
  } = useGetProfileVisitedEventsQuery({ userId: profileId });

  return (
    <div className="flex flex-col flex-wrap">
      <EventsList
        listTitle="Созданные"
        isLoading={isLoading}
        data={data}
        extraClasses="mt-50"
      />

      {/* <EventsList
        listTitle="Планируется к посещению"
        isLoading={isLoading}
        data={data}
        extraClasses="mt-50"
      />

      <EventsList
        listTitle="Посещенные"
        isLoading={isLoading}
        data={data}
        extraClasses="mt-50"
      /> */}
    </div>
  );
}
