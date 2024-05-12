import { ReactElement, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ProfileDetails } from "@/entities/profile/model/types";
import { EditProfileValidationSchema } from "../model/editProfileFormSchema";
import { ProfileImageControl } from "./ProfileImageControl";
import { LabeledInput, LargeTextInput, SelectInput } from "@/shared";


export function EditProfileInfo(profileData: ProfileDetails): ReactElement {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<EditProfileValidationSchema>();

  return (
    <div className="flex flex-wrap">
      <div>
        <Controller
          control={control}
          name="image_url"
          render={({ field: { onChange, value } }) => (
            <ProfileImageControl
              name={profileData.username}
              avatar={profileData.image}
              error={errors.image_url?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className="flex flex-col">
      <LabeledInput
            hookFormRegister={register('username')}
            type='text'
            isError={!!errors.username?.message}
            placeholder='Введите имя'
            maxLength={30}
            className="text-[18px] w-[480px] mt-[7px]"
            labelText="Имя"
            extraLabelClass="text-[20px]"
            size="lg"
          />
          <LabeledInput
            hookFormRegister={register('city')}
            type='text'
            isError={!!errors.city?.message}
            placeholder='Введите свой город'
            maxLength={30}
            className="text-[18px] w-[480px] mt-[7px]"
            labelText="Местоположение"
            extraLabelClass="text-[20px]"
            size="lg"
          />
      </div>
      <LargeTextInput
        hookFormValues={register('bio')}
        error={errors.city?.message}
        labelText='Описание'
        placeholder='Расскажите подробнее'
        extraBoxClass={'mt-[18px]'}
        maxLength={410}
      />
    </div>
  );
}
