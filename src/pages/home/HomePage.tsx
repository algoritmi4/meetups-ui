import {useGetEventsQuery, useGetTopEventsQuery} from '@/entities/event/api/eventApi';
import {DateSlider} from '@/features/calendarFilter';
import { useGetCategoriesQuery } from '@/features/searchFilter/api/categoriesApi';
import { FilterPopup } from '@/features/searchFilter/ui/FilterPopup';
import {HomePageTitle} from '@/features/townFilter';
import { useAppSelector } from '@/shared/model';
import { EventsList } from '@/widgets/EventsList';
import { MapWidget } from '@/widgets/mapWidget';
import { useGetMarkersQuery } from '@/widgets/mapWidget/api/markersApi';
import { ReactElement } from 'react';

export function HomePage(): ReactElement {
  const { search, checkedCategories } = useAppSelector(state => state.searchFilter);

  const {
    data: events = {results: []},
    isFetching: isEventsFetching,
    isError: isEventsError,
    error: eventsError
  } = useGetEventsQuery({ search, categories: checkedCategories });

  const {
    data: topEvents = {results: []},
    isFetching: isTopEventsFetching,
    isError: isTopEventsError,
    error: topEventsError
  } = useGetTopEventsQuery();

  const {
    data: categories = {results: []},
    isError: isCategoriesError,
    error: categoriesError
  } = useGetCategoriesQuery();

  const {
    data: markers = {features: []},
    isLoading: isMarkersLoading,
    isError: isMarkersError,
    error: markersError
  } = useGetMarkersQuery();

  isMarkersError && console.log(`Ошибка при получении mapMarkers - ${JSON.stringify(markersError)}`);
  isEventsError && console.log(`Ошибка при получении ивентов - ${JSON.stringify(eventsError)}`);
  isTopEventsError && console.log(`Ошибка при получении ивентов - ${JSON.stringify(topEventsError)}`);
  isCategoriesError && console.log(`Ошибка при получении категорий - ${JSON.stringify(categoriesError)}`);

  return (
    <main className="w-full">
      <FilterPopup categories={categories.results}/>
      <HomePageTitle />
      <DateSlider />
      <EventsList listTitle="Ближайшие" isLoading={isEventsFetching} data={events.results} extraClasses="mt-14 mb-[50px]" />
      <MapWidget position={{ lat: 53.9, lng: 27.56667 }} zoom={14} markers={markers.features} isLoading={isMarkersLoading} />
      <EventsList listTitle="Рекомендации для Вас" isLoading={isTopEventsFetching} data={topEvents.results} extraClasses="mt-[50px]" />
      <EventsList listTitle="Топ мероприятий" isLoading={isTopEventsFetching} data={topEvents.results} extraClasses="mt-[50px]" />
    </main>
  );
}
