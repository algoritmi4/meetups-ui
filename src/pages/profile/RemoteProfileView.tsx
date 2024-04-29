import { ReactElement } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  useProfileDetailsQuery,
  useMyDetailsQuery,
  useProfileFollowingQuery,
} from "@/entities/profile/api/profileApi";
import { Preloader } from "@/shared/ui/Preloader";
import { ProfileInfo } from "@/widgets/Profile/ProfileInfo";
import { Button } from "@/shared/ui/Buttons/Button";
import isEqual from "lodash/isEqual";
import NonFound from "@/pages/errors/NonFound";

function RemoteProfileView(): ReactElement {
  const { userId = "0" } = useParams();
  const {
    data: profileData,
    isLoading,
    isSuccess,
  } = useProfileDetailsQuery({ userId: userId });
  const { data: currentProfileData } = useMyDetailsQuery();

  const {data: profileFollpwing} = useProfileFollowingQuery({userId: userId})

  console.log(profileFollpwing);

  if (!isLoading && !isSuccess) {
    return <NonFound />;
  }

  if (Number(isEqual(Number(userId), currentProfileData?.id))) {
    return <Navigate to="/profile/me" />;
  }

  return (
    <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-wrap min-h-[1000px]">
      {isLoading ? (
        <div className="m-auto">
          <Preloader />
        </div>
      ) : (
        <ProfileInfo
          profileData={profileData}
          optionButton={
            <div className="flex mt-[80px] ">
              <Button
                size="sm"
                importance="none"
                extraClass="text-but-primary text-red-700 pl-[0] hoverscreen:hover:opacity-70 !bg-white"
              >
                Пожаловаться
              </Button>
            </div>
          }
        >
          {profileData?.is_private ? (
            <div>
              m{" "}
              <Button size="lg" importance="primary">
                Подать заявку
              </Button>
            </div>
          ) : (
            <div className="flex flex-row">
              <Button size="md" importance="primary">
                Подписаться
              </Button>
              <Button size="md" importance="secondary" extraClass="ml-[20px]">
                Написать
              </Button>
            </div>
          )}
        </ProfileInfo>
      )}
    </section>
  );
}

export default RemoteProfileView;
