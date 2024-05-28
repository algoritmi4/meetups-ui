import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ProfileDetails } from "@/entities/profile/model/types";
import { EditProfileValidationSchema } from "../model/editProfileFormSchema";
import { ProfileImageControl } from "./ProfileImageControl";
import { LabeledInput, LargeTextInput, SelectInput } from "@/shared";
import { ISelectInputOptions } from "@/shared/model/types";

export function EditProfileInfo(profileData: ProfileDetails): ReactElement {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<EditProfileValidationSchema>();

  const genderOption = [
    { id: 0, name: "Мужской" },
    { id: 1, name: "Женский" },
    { id: 3, name: "Не выбрано" },
  ];
  const getGenderValue = (value: string) =>
    (() => {
      switch (value) {
        case "NONE":
          return genderOption[2];
        case "MALE":
          return genderOption[0];
        case "FEMALE":
          return genderOption[1];
        default:
          return undefined;
      }
    })();

  const setGenderValue = (name: string) => {
    switch (name) {
      case "Не выбрано":
        return "NONE";
      case "Мужской":
        return "MALE";
      case "Женский":
        return "FEMALE";
      default:
        return undefined;
    }
  };

  return (
    <div className="flex flex-wrap justify-between">
      <div>
        <Controller
          control={control}
          name="image_url"
          render={({ field: { onChange, value } }) => (
            <ProfileImageControl
              name={profileData.username}
              avatar={profileData.image}
              error={errors.image_url?.message}
              value={value ? value : ""}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="flex flex-col mt-[32px]">
        <LabeledInput
          hookFormRegister={register("username")}
          type="text"
          isError={!!errors.username?.message}
          placeholder="Введите имя"
          maxLength={30}
          className="text-[18px] w-[480px] mt-[7px]"
          labelText="Имя"
          extraLabelClass="text-[20px] mt-[18px]"
          size="lg"
        />
        <LabeledInput
          hookFormRegister={register("city")}
          type="text"
          isError={!!errors.city?.message}
          placeholder="Введите свой город"
          maxLength={30}
          className="text-[18px] w-[480px] mt-[7px]"
          labelText="Местоположение"
          extraLabelClass="text-[20px] mt-[18px]"
          size="lg"
        />
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <SelectInput
              error={errors.gender?.message}
              labelText="Пол"
              value={value ? getGenderValue(value) : undefined}
              onChange={(option: ISelectInputOptions) => {
                onChange(setGenderValue(option.name));
              }}
              options={genderOption}
              placeholder="Пол"
              extraBoxClass="mt-[18px]"
            />
          )}
        />
        <LabeledInput
          hookFormRegister={register("date_of_birth")}
          isError={!!errors.date_of_birth?.message}
          type="date"
          placeholder="Дата рождения"
          className={`w-[480px] text-[18px] mt-[7px]`}
          size="lg"
          max="9999-12-31"
          labelText="Дата рождения"
          extraLabelClass="text-[20px] mt-[18px]"
        />
      </div>
      <LargeTextInput
        hookFormValues={register("bio")}
        error={errors.city?.message}
        labelText="О себе"
        placeholder="Расскажите подробнее"
        extraBoxClass={"mt-[18px] w-full"}
        maxLength={410}
      />
    </div>
  );
}
