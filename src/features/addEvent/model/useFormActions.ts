import { ISelectInputOptions } from "@/shared/model/types";
import { UseFormClearErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "./addEventFormSchema";
import { ISchemaDay } from "@/features/periodicControl/model/types";
import { useUploadImageMutation } from "@/shared/api/uploadImageApi";

interface IUseFormActions {
  setValue: UseFormSetValue<AddEventValidationSchema>;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
  getValues: UseFormGetValues<AddEventValidationSchema>;
}

export const useFormActions = ({ setValue, clearErrors, getValues }: IUseFormActions) => {
  const [ uploadImage ] = useUploadImageMutation();

  const onSelectCategory = (option: ISelectInputOptions) => {
    setValue('category', option.id);
    clearErrors('category');
  }

  const onSelectAddress = (city: string, country: string, geometry: google.maps.places.PlaceGeometry | null) => {
    if (!geometry?.location || !geometry.viewport) return;

    const location = geometry.location.toJSON();
    const northEastPoint = geometry.viewport.getNorthEast();
    const southWestPoint = geometry.viewport.getSouthWest();

    setValue('city', city);
    setValue('country', country);
    setValue('location.latitude', String(location.lat));
    setValue('location.longitude', String(location.lng));
    setValue('city_north_east_point.latitude', String(northEastPoint.lat()));
    setValue('city_north_east_point.longitude', String(northEastPoint.lng()));
    setValue('city_south_west_point.latitude', String(southWestPoint.lat()));
    setValue('city_south_west_point.longitude', String(southWestPoint.lng()));
    clearErrors('address');
  }

  const onChangePlacesLimit = (state: boolean) => {
    clearErrors('desired_participants_number');

    setValue('any_participant_number', state);

    state ? setValue('desired_participants_number', null) : setValue('desired_participants_number', NaN);
  }

  const onSelectEventType = (option: ISelectInputOptions, accessLink: string) => {
    clearErrors('type');

    switch (option.name) {
      case 'Публичное':
        setValue('type', 'open');
        setValue('private_url', null);
        break
      case 'По ссылке':
        setValue('type' , 'private');
        setValue('private_url', accessLink);
        break
    }
  }

  const onSwitchPriceType = (state: boolean) => {
    clearErrors('cost');

    if (state) {
      setValue('free', true);
      setValue('cost', null);
    } else {
      setValue('free', false);
      setValue('cost', '');
    }
  }

  const onChangeCurrencyType = (option: ISelectInputOptions) => {
    setValue('currency', option.id);
  }

  const onPeriodicChange = (state: boolean) => {
    setValue('repeatable', state);
  }

  const onChangeSchedule = (day: ISchemaDay) => {
    const schedule = getValues('schedule');

    if (!schedule) return;

    if (schedule.some((el) => el.day_of_week === day.day_of_week)) {
      setValue('schedule', schedule.filter((el) => el.day_of_week !== day.day_of_week));
    } else {
      setValue('schedule', [...schedule, day]);
    }
  }

  const onChangeScheduleDayTime = (day: ISchemaDay) => {
    const schedule = getValues('schedule');

    if (!schedule) return;

    const scheduleWithDayChange = schedule.map((el) => {
      if (el.day_of_week === day.day_of_week) {
        return day;
      }

      return el;
    });

    setValue('schedule', scheduleWithDayChange);
  }

  const handleTags = (tagId: number, toRemove: boolean) => {
    const tags = getValues('tags');

    let updatedTags: number[] | null = null;

    if (toRemove) {
      updatedTags = tags.filter((el) => el !== tagId);
    } else {
      updatedTags = [...tags, tagId];
    }

    setValue('tags', updatedTags);
  }

  const onUploadImage = (file: File, callback: (res: {url: string}) => void) => {
    const formData = new FormData();

    formData.append('file', file);

    uploadImage(formData)
    .unwrap()
    .then(callback)
    .catch((err) => console.log(err));
  }

  return {
    onSelectCategory,
    onSelectAddress,
    onChangePlacesLimit,
    onSelectEventType,
    onSwitchPriceType,
    onChangeCurrencyType,
    onPeriodicChange,
    onChangeSchedule,
    onChangeScheduleDayTime,
    handleTags,
    onUploadImage
  }
}
