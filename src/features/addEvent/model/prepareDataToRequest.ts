import { AddEventValidationSchema } from "./addEventFormSchema";

export const prepareDataToRequest = (data: AddEventValidationSchema) => {
  const dataToCreateEvent = data;

  if (!data.repeatable) {
    dataToCreateEvent.schedule = [];
  }

  if (data.any_participant_number) {
    dataToCreateEvent.desired_participants_number = null;
  }

  if (data.type === 'open') {
    dataToCreateEvent.private_url = null;
  }

  if (data.free) {
    dataToCreateEvent.cost = null;
    dataToCreateEvent.currency = null;
  }

  if (!data.end_date) {
    dataToCreateEvent.end_date = null;
  }

  if (!data.end_time) {
    dataToCreateEvent.end_time = null;
  }

  return { dataToCreateEvent };
}
