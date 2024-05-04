import { ReactElement } from "react";
import { ProfileInfo } from "@/widgets/Profile/ProfileInfo";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { Button } from "@/shared/ui/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { Preloader } from "@/shared/ui/Preloader";
import {
  useGetProfileCreatedEventsQuery,
  useGetProfilePlannedEventsQuery,
  useGetProfileVisitedEventsQuery,
} from "@/widgets/Profile/ProfileEvents/api/profileEventsApi";
import { EventsList } from "@/widgets/EventsList";

function CurrentProfileView(): ReactElement {
  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    isSuccess: isProfileDataSuccess,
  } = useMyDetailsQuery();
  const navigate = useNavigate();
  const onEditProfile = () => {
    navigate("/profile/edit");
  };
  const {
    data: createdEvents = [],
    isLoading: isCreatedEventsLoading,
    isSuccess: isCreatedEventsSuccess,
    isError: isCreatedEventsError,
    error: eventsCreatedError,
  } = useGetProfileCreatedEventsQuery(
    { userId: String(profileData?.id) },
    { skip: !isProfileDataSuccess }
  );
  const {
    data: plannedEvents = [],
    isLoading: isPlannedEventsLoading,
    isSuccess: isPlannedEventsSuccess,
    isError: isPlannedEventsError,
    error: eventsPlannedError,
  } = useGetProfilePlannedEventsQuery(
    { userId: String(profileData?.id) },
    { skip: !isProfileDataSuccess }
  );
  const {
    data: visitedEvents = [],
    isLoading: isVisitedEventsLoading,
    isSuccess: isVisitedEventsSuccess,
    isError: isVisitedEventsError,
    error: eventsVisitedError,
  } = useGetProfileVisitedEventsQuery(
    { userId: String(profileData?.id) },
    { skip: !isProfileDataSuccess }
  );

  return (
    <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-nowrap min-h-[1000px]">
      {isProfileDataLoading ? (
        <div className="m-auto">
          <Preloader />
        </div>
      ) : (
        isProfileDataSuccess && (
          <>
            <ProfileInfo profileData={profileData}>
              <Button onClick={onEditProfile} size="lg" importance="primary">
                Редактировать
              </Button>
            </ProfileInfo>
            <div className="flex-auto flex flex-col basis-6/12">
              <EventsList
                listTitle="Созданные"
                isLoading={isCreatedEventsLoading}
                data={createdEvents}
                extraClasses="mt-50"
              />
              <EventsList
                listTitle="Планируется к посещению"
                isLoading={isPlannedEventsLoading}
                data={plannedEvents}
                extraClasses="mt-50"
              />
              <EventsList
                listTitle="Посещенные"
                isLoading={isVisitedEventsLoading}
                data={visitedEvents}
                extraClasses="mt-50"
              />
            </div>
          </>
        )
      )}
    </section>
  );
}

export default CurrentProfileView;
