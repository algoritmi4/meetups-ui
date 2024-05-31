import { useEffect, useState } from "react";
import { ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useProfileDetailsQuery,
  useMyDetailsQuery,
  useGetFollowingQuery,
  useFollowMutation,
  useUnFollowMutation,
} from "@/entities/profile/api/profileApi";
import { ProfileInfo, ProfileLoader } from "@/widgets/Profile/ProfileInfo";
import { Button } from "@/shared/ui/Buttons/Button";
import { ProfileFollowButton } from "@/widgets/ProfileButton";
import { IFollowStatus } from "@/entities/profile/model/types";

function RemoteProfileView(): ReactElement {
  const navigate = useNavigate();
  const [isPageReady, setIsPageReady] = useState(false);
  const { userId = "0" } = useParams();
  const [followStatus, setFollowStatus] = useState<IFollowStatus>(undefined);

  const {
    data: remoteUser,
    isLoading: isLoadingRemoteUser,
    isError: isErrorRemoteUser,
    error: errorRemoteUser,
    isSuccess: isSuccessRemoteUser,
  } = useProfileDetailsQuery({ userId: userId });

  const {
    data: currentProfileData,
    isLoading: isLoadingProfileData,
    isError: isErrorProfileData,
    error: errorProfileData,
    isSuccess: isSuccessProfileData,
  } = useMyDetailsQuery();

  const {
    data: profileFollowingData = [],
    isLoading: isLoadingFollowingData,
    isError: isErrorFollowingData,
    error: errorFollowingData,
    isSuccess: isSuccessFollowingData,
  } = useGetFollowingQuery(
    {
      userId: String(currentProfileData?.id),
    },
    {
      skip: !currentProfileData,
    }
  );

  isErrorRemoteUser &&
    console.log(
      `Ошибка при получении remoteUser - ${JSON.stringify(errorRemoteUser)}`
    );
  isErrorProfileData &&
    console.log(
      `Ошибка при получении currentUser - ${JSON.stringify(errorProfileData)}`
    );
  isErrorFollowingData &&
    console.log(
      `Ошибка при получении информации о подписках пользователя - ${JSON.stringify(
        errorFollowingData
      )}`
    );

  const isPrivateUser = remoteUser?.is_private;

  const [follow, { isLoading: isFollowLoading }] = useFollowMutation();
  const [unfollow, { isLoading: isUnfollowLoading }] = useUnFollowMutation();

  const followUser = () => {
    follow({ userId: userId })
      .unwrap()
      .then((res) => {
        setFollowStatus(res.status);
      })
      .catch((err) => console.log(err, "Добавить пользователя не получилось"));
  };

  const unfollowUser = () => {
    unfollow({ userId: userId })
      .unwrap()
      .then(() => setFollowStatus(undefined))
      .catch((err) =>
        console.log(err, "Отписаться от пользователя не получилось")
      );
  };

  useEffect(() => {
    if (isSuccessFollowingData) {
      setFollowStatus(
        () =>
          profileFollowingData.find(({ user }) => user === Number(userId))
            ?.status
      );

      setIsPageReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessFollowingData]);

  if (isNaN(Number(userId))) {
    return <h1>404 Page not found</h1>;
  }

  if (Number(userId) === currentProfileData?.id) {
    navigate("/profile/me", { replace: true });
  }

  if (
    isLoadingRemoteUser ||
    isLoadingFollowingData ||
    !isPageReady ||
    isLoadingProfileData
  ) {
    return (
      <div className="m-auto">
        <ProfileLoader />
      </div>
    );
  }

  if (isSuccessRemoteUser && isSuccessProfileData && isSuccessFollowingData) {
    return (
      <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-nowrap min-h-[1000px]">
        <ProfileInfo
          profileData={remoteUser}
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
              onUnFollow={unfollowUser}
              isPrivate={isPrivateUser}
              isLoading={isFollowLoading || isUnfollowLoading}
              status={followStatus}
            />
            <Button size="md" importance="secondary" extraClass="ml-[20px]">
              Написать
            </Button>
          </div>
        </ProfileInfo>
      </section>
    );
  }

  return <p>Пользователь не найден</p>;
}

export default RemoteProfileView;
