import { ReactElement } from "react";
import { ProfileInfo, ProfileLoader } from "@/widgets/Profile/ProfileInfo";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { Button } from "@/shared/ui/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useGetEventsQuery } from "@/entities/event/api/eventApi";
import { EventsList } from "@/widgets/EventsList";
import { EventCard } from "@/entities/event";

function CurrentProfileView(): ReactElement {
  const navigate = useNavigate();

  const {
    data = {results: []},
    isLoading: isEventsLoading
  } = useGetEventsQuery({ search: '' });

  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    isError,
    error,
    isSuccess: isProfileDataSuccess,
  } = useMyDetailsQuery();

  isError && console.log(`Ошибка при получении профиля - ${JSON.stringify(error)}`);

  const eventsList = data.results.map((el) => <EventCard key={el.id} size="sm" event={el} />);

  const onEditProfile = () => {
    navigate("/profile/edit");
  };

  if (isProfileDataLoading) {
    return (
      <div className="m-auto">
        <ProfileLoader />
      </div>
    )
  }

  if (isProfileDataSuccess) {
    return (
      <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-nowrap min-h-[1000px] overflow-x-hidden">
        <ProfileInfo
          profileData={profileData}
        >
          <Button onClick={onEditProfile} size="lg" importance="primary">
            Редактировать
          </Button>
        </ProfileInfo>
        <div className="w-[65%]">
          <EventsList
            listTitle="Созданные"
            isLoading={isEventsLoading}
            extraClasses="mt-[60px] before:!bg-slider-fade-out-xl before:!w-[450px]"
            slidesLength={3}
            arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
          >{eventsList}</EventsList>
          <EventsList
            listTitle="Созданные"
            isLoading={isEventsLoading}
            extraClasses="mt-[50px] before:!bg-slider-fade-out-xl before:!w-[450px]"
            slidesLength={3}
            arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
          >{eventsList}</EventsList>
          <EventsList
            listTitle="Созданные"
            isLoading={isEventsLoading}
            extraClasses="mt-[50px] before:!bg-slider-fade-out-xl before:!w-[450px]"
            slidesLength={3}
            arrowsExtraClasses={{rightArrow: 'right-[90px] top-[110px]', leftArrow: 'left-[-42px] top-[110px]'}}
          >{eventsList}</EventsList>
        </div>
      </section>
    );
  }

  return <p>Ошибка сервера. Попробуйте перезагрузить страницу</p>
}

export default CurrentProfileView;
