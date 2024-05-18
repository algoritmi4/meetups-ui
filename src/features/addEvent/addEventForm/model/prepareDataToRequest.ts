import { AddEventValidationSchema } from "./addEventFormSchema";

interface IPrepareDataToRequestProps {
  data: AddEventValidationSchema;
  toEdit: boolean;
}

export const prepareDataToRequest = ({ data, toEdit }: IPrepareDataToRequestProps): Partial<AddEventValidationSchema> => {
  const dataToCreateEvent: Partial<AddEventValidationSchema> = data;

  if (!dataToCreateEvent.repeatable) {
    dataToCreateEvent.schedule = null;
  }

  if (dataToCreateEvent.any_participant_number) {
    dataToCreateEvent.desired_participants_number = null;
  }

  if (dataToCreateEvent.free) {
    dataToCreateEvent.cost = null;
    dataToCreateEvent.currency = null;
  }

  if (!dataToCreateEvent.end_date) {
    dataToCreateEvent.end_date = null;
  }

  if (!dataToCreateEvent.end_time) {
    dataToCreateEvent.end_time = null;
  }

  if (dataToCreateEvent.repeatable) {
    dataToCreateEvent.start_date = null;
    dataToCreateEvent.start_time = null;
    dataToCreateEvent.end_date = null;
    dataToCreateEvent.end_time = null;
  }

  if (toEdit && !dataToCreateEvent.city_north_east_point?.latitude) {
    delete dataToCreateEvent.address;
    delete dataToCreateEvent.city;
    delete dataToCreateEvent.country;
    delete dataToCreateEvent.city_north_east_point;
    delete dataToCreateEvent.city_south_west_point;
    delete dataToCreateEvent.location;
  }

  return dataToCreateEvent;
}
