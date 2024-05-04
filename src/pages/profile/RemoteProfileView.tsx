import { useEffect, useState } from "react";
import { ReactElement } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  useProfileDetailsQuery,
  useMyDetailsQuery,
  useGetFollowingQuery,
  useFollowMutation,
  useUnFollowMutation,
} from "@/entities/profile/api/profileApi";
import { Preloader } from "@/shared/ui/Preloader";
import { ProfileInfo } from "@/widgets/Profile/ProfileInfo";
import { Button } from "@/shared/ui/Buttons/Button";
import isEqual from "lodash/isEqual";
import NonFound from "@/pages/errors/NonFound";
import { ProfileFollowButton } from "@/widgets/ProfileButton";

function RemoteProfileView(): ReactElement {

  const [isPageReady, setIsPageReady] = useState(false);

  const { userId = "0" } = useParams();

  const {
    data: profileData,
    isLoading: isLoadingRemoteUser,
    isError: isErrorRemoteUser,
  } = useProfileDetailsQuery({ userId: userId });

  const isPrivateUser = profileData?.is_private;

  const { data: currentProfileData, isLoading: isLoadingCurrentUser } = useMyDetailsQuery();

  const {
    data: profileFollow = [],
    isLoading: isLoadingProfileFollow,
    isSuccess: isSuccessFollowing,
  } = useGetFollowingQuery(
    {
      userId: String(currentProfileData?.id),
    },
    {
      skip: !currentProfileData,
    }
  );

  const [followStatus, setFollowStatus] = useState<string | undefined>(undefined);

  const [createFollowUser, { isLoading: isLoadingRequestGetFollow }] = useFollowMutation();

  const [deleteFollowUser] = useUnFollowMutation();

  const followUser = () => {createFollowUser({ userId: userId })
      .unwrap().then((res) => {
        if (res != undefined) {
          return setFollowStatus(res["status"]);
        }
      })
      .catch((err) => console.log(err, 'Добавить пользователя не получилось'));
  };

  const unFollowUser = () => { deleteFollowUser({ userId: userId })
      .unwrap()
      .then(() => setFollowStatus(undefined))
      .catch((err) => console.log(err, 'Отписаться от пользователя не получилось'));
  };

  useEffect(() => {
    if (isSuccessFollowing) {
      setFollowStatus(() => profileFollow.find(({ user }) => {
        return user === Number(userId);
      })?.status);
      setIsPageReady(true);
    }
  }, [isSuccessFollowing]);

  if (isErrorRemoteUser) {
    return <NonFound />;
  }

  if (Number(isEqual(Number(userId), currentProfileData?.id))) {
    return <Navigate to="/profile/me" />;
  }
  
  return (
    <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-nowrap min-h-[1000px]">
      {isLoadingRemoteUser ||
      isLoadingProfileFollow ||
      !isPageReady ||
      isLoadingCurrentUser ? (
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
          <div className="flex flex-row">
            <ProfileFollowButton
              onFollow={followUser}
              onUnFollow={unFollowUser}
              isPrivate={isPrivateUser}
              isLoading={isLoadingRequestGetFollow}
              status={followStatus}
            />
            <Button size="md" importance="secondary" extraClass="ml-[20px]">
              Написать
            </Button>
          </div>
        </ProfileInfo>
      )}
    </section>
  );
}

export default RemoteProfileView;
