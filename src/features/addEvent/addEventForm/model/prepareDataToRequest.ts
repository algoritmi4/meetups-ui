import { AddEventValidationSchema } from "./addEventFormSchema";

export const prepareDataToRequest = (data: AddEventValidationSchema) => {
  const dataToCreateEvent = data;

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

  return { dataToCreateEvent };
}
