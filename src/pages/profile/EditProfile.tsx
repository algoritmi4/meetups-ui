import { ReactElement, useEffect } from "react";
import { BackButton } from "@/shared/ui/Buttons/BackButton";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { ProfileLoader } from "@/widgets/Profile/ProfileInfo";
import { EditProfileForm } from "@/features/editProfile/ui/EditProfileForm";
import Svg from "@/shared/ui/Svg";
import { FormProvider, useForm } from "react-hook-form";
import {
  EditProfileValidationSchema,
  editProfileFormSchema,
} from "@/features/editProfile/model/editProfileFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProfileInfo } from "@/features/editProfile/ui/EditProfileInfo";
import { defaultProfileFormValues } from "@/features/editProfile/model/constants";
import { removeProfileExtraFields } from "@/features/editProfile/model/removeProfileExtraFields";

function EditProfile(): ReactElement {
  const {
    data: profileData,
    isLoading: isProfileDataLoading,
    isError: isErrorProfileData,
    error: errorProfileData,
    isSuccess: isProfileDataSuccess,
  } = useMyDetailsQuery();

  isErrorProfileData &&
    console.log(
      `Ошибка при получении данных пользователя - ${JSON.stringify(
        errorProfileData
      )}`
    );

  const isFormLoading = isProfileDataLoading || !isProfileDataSuccess;

  const methods = useForm<EditProfileValidationSchema>({
    resolver: zodResolver(editProfileFormSchema),
    mode: "onBlur",
    defaultValues: defaultProfileFormValues,
  });

  useEffect(() => {
    if (isProfileDataSuccess) {
      const editFormValues = removeProfileExtraFields(profileData);
      methods.reset(editFormValues);
    } else {
      methods.reset(defaultProfileFormValues);
    }
  }, [isProfileDataSuccess]);

  if (isProfileDataLoading) {
    return (
      <div className="m-auto">
        <ProfileLoader />
      </div>
    );
  }

  if (isProfileDataSuccess) {
    return (
      <section className="w-full max-w-[1215px] mx-auto pb-[98px] flex flex-row flex-wrap">
        <div className="w-full mt-[60px] mb-[50px] flex flex-nowrap justify-between">
          <p className="text-zinc-800 text-[35px] font-bold font-['Mulish']">
            Редактирование профиля
          </p>
          <BackButton />
        </div>

        <div className="basis-4/6 flex flex-wrap">
          <FormProvider {...methods}>
            <EditProfileForm
              handleSubmit={methods.handleSubmit}
              isLoading={isFormLoading}
              userId={String(profileData.id)}
            >
              <EditProfileInfo {...profileData} />
            </EditProfileForm>
          </FormProvider>
        </div>
        <div className="basis-2/6 mt-[67px] pl-[149px]">
          <Svg
            id="profile-pencil"
            width="215"
            height="215"
            viewBox="0 0 215 215"
            fill="none"
          />
        </div>
      </section>
    );
  }
  return <p>Ошибка сервера. Попробуйте перезагрузить страницу</p>;
}

export default EditProfile;
