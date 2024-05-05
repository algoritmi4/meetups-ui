import { ReactElement } from "react";
import { ProfileInfo, ProfileLoader } from "@/widgets/Profile/ProfileInfo";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { Button } from "@/shared/ui/Buttons/Button";
import { useNavigate } from "react-router-dom";

function CurrentProfileView(): ReactElement {
  const navigate = useNavigate();

  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    isError,
    error,
    isSuccess: isProfileDataSuccess,
  } = useMyDetailsQuery();

  isError && console.log(`Ошибка при получении профиля - ${JSON.stringify(error)}`);

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
      <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-nowrap min-h-[1000px]">
        <ProfileInfo
          profileData={profileData}
        >
          <Button onClick={onEditProfile} size="lg" importance="primary">
            Редактировать
          </Button>
        </ProfileInfo>
      </section>
    );
  }

  return <p>Ошибка сервера. Попробуйте перезагрузить страницу</p>
}

export default CurrentProfileView;
