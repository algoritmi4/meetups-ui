import {useGetEventQuery, useGetTopEventsQuery} from '@/entities/event/api/eventApi';
import {ReactElement,  useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { CreatorDetails, EventDescription, EventHeader, EventLoader, Location, ReviewsRow, TagRow } from '@/widgets/eventPage';
import { ParticipantsPopup } from '@/features/eventPage/ui/ParticipantsPopup';
import { EventsList } from '@/widgets/EventsList';
import { useMyDetailsQuery } from '@/entities/profile/api/profileApi';
import { isFavoriteSetted, isParticipantSetted } from './model/eventInfoSlice';
import { useAppDispatch } from '@/shared/model';
import { EventPageContext } from './model/EventPageContext';
import { mockParticipants, mockReviews } from './model/consts';
import { useGetReviewsQuery } from '@/entities/review/api/reviewApi';

export function EventPage(): ReactElement {
  const [isPageReady, setIsPageReady] = useState(false);
  const dispatch = useAppDispatch();
  const [isParticipantPopupOpen, setIsParticipantPopupOpen] = useState(false);
  const { eventId } = useParams<{eventId: string}>();

  const { data: profile, isLoading: isProfileLoading, isError: isProfileError, error: profileError, isSuccess: isProfileSuccess } = useMyDetailsQuery();
  const { data: event, isFetching: isEventFetching, isError: isEventError, error: eventError, isSuccess: isEventSuccess } = useGetEventQuery(Number(eventId));
  const { data: topEvents = {results: []}, isLoading: isTopEventsLoading, isError: isTopEventsError, error: topEventsError } = useGetTopEventsQuery();
  const { error: reviewsError, isLoading: isReviwesLoading, isError: isReviewsError } = useGetReviewsQuery(Number(eventId));

  isTopEventsError && console.log(`Ошибка при получении ивентов - ${JSON.stringify(topEventsError)}`);
  isProfileError && console.log(`Ошибка при получении профиля - ${JSON.stringify(profileError)}`);
  isReviewsError && console.log(`Ошибка при получении отзывов - ${JSON.stringify(reviewsError)}`);

  const isOwner = event?.created_by.id === profile?.id;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (isEventSuccess && isProfileSuccess) {
      dispatch(isParticipantSetted(event?.participants.some((el) => el.id === profile?.id)));
      dispatch(isFavoriteSetted(event?.is_favorite));
      setIsPageReady(true);
    }
  }, [event, profile, dispatch, isEventSuccess, isProfileSuccess]);

  if (isEventFetching || isProfileLoading || isReviwesLoading || !isPageReady) {
    return <EventLoader />;
  }

  if (isEventError) {
    if ('status' in eventError) {
      const errMsg = 'error' in eventError ? eventError.error : JSON.stringify(eventError.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    } else {
      return <div>{eventError.message}</div>
    }
  }

  if (isEventSuccess) {
    return (
      <EventPageContext.Provider value={isOwner}>
        <main className="bg-white w-full flex flex-col pt-[60px] pb-[66px]">
          <ParticipantsPopup participants={[event.created_by, ...mockParticipants]} isOpen={isParticipantPopupOpen} handleClose={() => setIsParticipantPopupOpen(false)}/>
          <EventHeader event={event} handleOpenParticipantsPopup={() => setIsParticipantPopupOpen(true)} />
          <TagRow tags={event.tags}/>
          <EventDescription event={event}/>
          <CreatorDetails creator={event.created_by}/>
          <Location event={event}/>
          <ReviewsRow reviews={mockReviews} rating={event.average_rating}/>
          <EventsList listTitle="Рекомендации для Вас" isLoading={isTopEventsLoading} data={topEvents.results} extraClasses="mt-[50px]" />
        </main>
      </EventPageContext.Provider>
    )
  }

  return <div>Event not found</div>;
}
