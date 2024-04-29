import {useGetEventQuery} from '@/entities/event/api/eventApi';
import {ReactElement} from 'react';
import {skipToken} from '@reduxjs/toolkit/query/react'
import {useParams} from 'react-router-dom';
import { CreatorDetails, EventDescription, EventHeader, EventLoader, Location, ReviewsRow, TagRow } from '@/widgets/eventPage';

export function EventPage(): ReactElement {
    const {eventId} = useParams<{eventId: string}>();
    const {data: event, isLoading, isError, error} = useGetEventQuery(Number(eventId) ?? skipToken);

    if (isLoading) {
      return <EventLoader />;
    }

    if (isError) {
        if ('status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

            return (
                <div>
                    <div>An error has occurred:</div>
                    <div>{errMsg}</div>
                </div>
            )
        } else {
            // you can access all properties of `SerializedError` here
            return <div>{error.message}</div>
        }
    }
    // const {search} = useAppSelector(state => state.searchFilter);
    // const {data: events = {results: []}} = useGetEventsQuery({search: search});
    //
    // isError && console.log(`Ошибка при получении ивентов - ${JSON.stringify(error)}`);

    if (event) {
      return (
        <main className="bg-white w-full flex flex-col items-center pt-[60px] pb-[66px]">
          <EventHeader event={event}/>
          <TagRow tags={event.tags}/>
          <EventDescription event={event}/>
          <CreatorDetails creator={event.created_by}/>
          <Location event={event}/>
          <ReviewsRow eventId={event.id} rating={event.average_rating}/>
        </main>
      )
    }

    return <div>Event not found</div>;
}
