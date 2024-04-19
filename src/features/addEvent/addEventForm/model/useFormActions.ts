import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "./addEventFormSchema";

interface IUseFormActions {
  setValue: UseFormSetValue<AddEventValidationSchema>;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
}

export const useFormActions = ({ setValue, clearErrors }: IUseFormActions) => {
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

  return {
    onSelectAddress
  }
}
