import { LabeledInput, SwitchInput } from "@/shared";
import { ReactElement } from "react";
import { Control, Controller, UseFormClearErrors, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "../addEventForm/model/addEventFormSchema";

interface INumberOfPlacesAndChatControlProps {
  isPlacesDisabled: boolean;
  hookFormRegister: UseFormRegisterReturn<string>;
  error?: string;
  control: Control<AddEventValidationSchema>;
  setValue: UseFormSetValue<AddEventValidationSchema>;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
}

export function PlacesNumberControl({ isPlacesDisabled, hookFormRegister, error, control, setValue, clearErrors }: INumberOfPlacesAndChatControlProps): ReactElement {
  return (
    <div className={'flex items-center'}>
      <LabeledInput
        hookFormRegister={hookFormRegister}
        isError={!!error}
        type='number'
        placeholder='25'
        className={`w-[70px] max-h-11 ml-3.5 text-[18px] ${isPlacesDisabled ? "bg-select-disable" : ""}`}
        extraBoxClass="!flex-row !items-center"
        size="sm"
        extraInputClass={`text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isPlacesDisabled && "text-white"}`}
        disabled={isPlacesDisabled}
        labelText='Количество мест'
        extraLabelClass="text-[20px]"
      />
      <Controller
        control={control}
        name='any_participant_number'
        render={({ field: { onChange, value }}) => (
          <SwitchInput
            labelText={'Места не ограничены'}
            extraBoxClass={'ml-[60px]'}
            onChange={(state: boolean) => {
              onChange(state);

              state ? setValue('desired_participants_number', null) : setValue('desired_participants_number', NaN);

              clearErrors('desired_participants_number');
            }}
            value={value}
          />
        )}
      />
    </div>
  )
}
