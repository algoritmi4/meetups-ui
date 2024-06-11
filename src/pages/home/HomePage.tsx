import {useGetEventsQuery} from '@/entities/event/api/eventApi';
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
  const { search, checkedCategories, startDate, endDate, startDateGTE } = useAppSelector(state => state.searchFilter);

  const category_in = checkedCategories.join(',');

  const {
    data: events = {results: []},
    isLoading: isEventsLoading,
    isError: isEventsError,
    error: eventsError
  } = useGetEventsQuery({ search, start_date: startDate, start_date_gte: startDateGTE, start_date_lte: endDate, category_in, ordering: 'start_date' });

  const {
    data: topEvents = {results: []},
    isLoading: isTopEventsLoading,
    isError: isTopEventsError,
    error: topEventsError
  } = useGetEventsQuery({ ordering: '-average_rating' });

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
    <main className="w-full pb-[174px]">
      <FilterPopup categories={categories.results}/>
      <HomePageTitle />
      <DateSlider />
      <EventsList listTitle="Ближайшие" isLoading={isEventsLoading} data={events.results} extraClasses="mt-14 mb-[50px]" />
      <MapWidget position={{ lat: 53.9, lng: 27.56667 }} zoom={14} markers={markers.features} isLoading={isMarkersLoading} />
      <EventsList listTitle="Рекомендации для Вас" isLoading={isTopEventsLoading} data={topEvents.results} extraClasses="mt-[50px]" />
      <EventsList listTitle="Топ мероприятий" isLoading={isTopEventsLoading} data={topEvents.results} extraClasses="mt-[50px]" />
    </main>
  );
}
 