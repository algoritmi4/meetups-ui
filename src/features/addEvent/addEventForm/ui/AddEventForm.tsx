import {ReactElement, ReactNode} from "react";
import { AddEventValidationSchema } from "../model/addEventFormSchema";
import { UseFormHandleSubmit, useFormContext } from "react-hook-form";
import { useCreateEventMutation } from "@/entities/event/api/eventApi";
import { prepareDataToRequest } from "../model/prepareDataToRequest";
import { Preloader } from "@/shared/ui/Preloader";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared";


interface IAddEventFormProps {
  children: ReactNode;
  handleSubmit: UseFormHandleSubmit<AddEventValidationSchema>;
  isLoading: boolean;
}

export function AddEventForm({ children, handleSubmit, isLoading }: IAddEventFormProps): ReactElement {
  const navigate = useNavigate();
  const [createEvent] = useCreateEventMutation();

  const { formState: { isSubmitted } } = useFormContext<AddEventValidationSchema>();

  const onSubmit = (data: AddEventValidationSchema) => {
    const { dataToCreateEvent } = prepareDataToRequest(data);

    createEvent(dataToCreateEvent)
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.log(err));
  };

  if (isLoading) return (
    <Preloader />
  )

  return (
    <form onSubmit={(data) => void handleSubmit(onSubmit)(data)} noValidate className="flex flex-col scrollbar">
      {children}
      <Button
        type="submit"
        size="lg"
        importance="primary"
        extraClass="self-start mt-10"
        disabled={isSubmitted}
      >Создать</Button>
    </form>
  )
}
