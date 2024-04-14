import { Input, SwitchInput } from "@/shared";
import { ReactElement } from "react";
import { Control, Controller, UseFormClearErrors, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "../addEvent/model/addEventFormSchema";

interface INumberOfPlacesAndChatControlProps {
  isPlacesDisabled: boolean;
  hookFormValues: UseFormRegisterReturn<string>;
  error?: string;
  control: Control<AddEventValidationSchema>;
  setValue: UseFormSetValue<AddEventValidationSchema>;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
}

export function PlacesNumberControl({ isPlacesDisabled, hookFormValues, error, control, setValue, clearErrors }: INumberOfPlacesAndChatControlProps): ReactElement {
  return (
    <div className={'flex items-center'}>
      <Input
        hookFormValues={hookFormValues}
        error={error}
        HTMLType='number'
        labelText='Количество мест'
        placeholder='25'
        id='add-event-people-number'
        inlineLabel={true}
        extraBoxClass={`w-[72px] md:w-[72px] mt-[7px] ${isPlacesDisabled && "bg-select-disable"}`}
        extraContentClass={'h-[44px]'}
        extraInputClass={`px-[10px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isPlacesDisabled && "text-white"}`}
        isDisabled={isPlacesDisabled}
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
