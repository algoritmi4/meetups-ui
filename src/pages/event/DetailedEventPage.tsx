import {useGetEventQuery} from '@/entities/event/api/eventApi';
import React, {ReactElement} from 'react';
import {skipToken} from '@reduxjs/toolkit/query/react'

import {useParams} from 'react-router-dom';

import { EventHeader } from './Head';
import { TagRow } from './TagRow';
import { EventDescription } from './EventDescription';
import { CreatorDetails } from './CreatorDetails';
import { LocationCard } from './LocationCard';
import { ReviewsRow } from './ReviewsRow';

type RouteParams = {
    eventId: string;
};

export function EventPage(): ReactElement {
    const {eventId} = useParams<RouteParams>();
    const {data: event, isLoading, isError, error} = useGetEventQuery(Number(eventId) ?? skipToken);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
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
            <main className="event_detail_page bg-white w-full flex flex-col items-center pt-[60px]">
                <EventHeader event={event}/>
                <div className='w-full flex flex-col justify-start space-y-[90px] mb-[100px]'>
                    <TagRow tags={event.tags}/>
                    <EventDescription event={event}/>
                    <CreatorDetails creator={event.created_by}/>
                    <LocationCard event={event}/>
                    <ReviewsRow eventId={event.id} rating={event.rating}/>
                </div>
            </main>
        )
    }

    return <div>Event not found</div>;
}
