import { ReactElement } from "react";
import { ProfileInfo } from "@/widgets/Profile/ProfileInfo";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { Button } from "@/shared/ui/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { Preloader } from "@/shared/ui/Preloader";

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

  return (
    <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-nowrap min-h-[1000px]">
      {isProfileDataLoading ? (
        <div className="m-auto">
          <Preloader />
        </div>
      ) : (
        isProfileDataSuccess && (
            <ProfileInfo profileData={profileData}>
              <Button onClick={onEditProfile} size="lg" importance="primary">
                Редактировать
              </Button>
            </ProfileInfo>
        )
      )}
    </section>
  );
}

export default CurrentProfileView;
