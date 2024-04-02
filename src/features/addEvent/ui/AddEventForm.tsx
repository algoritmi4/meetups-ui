import {ReactElement, ReactNode} from "react";
import { AddEventValidationSchema } from "../model/addEventFormSchema";
import { UseFormHandleSubmit } from "react-hook-form";
import { useCreateEventMutation } from "@/entities/event/api/eventApi";
import { prepareDataToRequest } from "../model/prepareDataToRequest";

interface IAddEventFormProps {
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<AddEventValidationSchema>;
}

export function AddEventForm({ children, handleSubmit }: IAddEventFormProps): ReactElement {
  const [createEvent] = useCreateEventMutation();

  const onSubmit = (data: AddEventValidationSchema) => {
    const { dataToCreateEvent } = prepareDataToRequest(data);

    createEvent(dataToCreateEvent)
      .unwrap()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col scrollbar">
      {children}
      <button type="submit" className="self-start h-[44px] w-[165px] bg-button-purple text-[18px] font-semibold text-white rounded-[10px] mt-10 duration-150 hover:opacity-70">Создать</button>
    </form>
  )
}
