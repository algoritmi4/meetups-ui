import { Input, SelectInput, SwitchInput } from "@/shared";
import { ReactElement } from "react";
import { Control, Controller, UseFormClearErrors, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "../addEvent/model/addEventFormSchema";
import { ISelectInputOptions } from "@/shared/model/types";

interface IPriceControlProps {
  hookFormValues: UseFormRegisterReturn<string>;
  error?: string;
  control: Control<AddEventValidationSchema>;
  isPriceActive: boolean;
  setValue: UseFormSetValue<AddEventValidationSchema>;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
  currencies: ISelectInputOptions[];
}

export function PriceControl({ hookFormValues, error, control, isPriceActive, setValue, clearErrors, currencies }: IPriceControlProps): ReactElement {
  return (
    <div className={'flex items-center mt-[18px]'}>
      <Input
        hookFormValues={hookFormValues}
        error={error}
        HTMLType='number'
        labelText='Стоимость'
        placeholder={`${isPriceActive ? "12" : ""}`}
        id='add-event-price'
        inlineLabel={true}
        extraBoxClass={`w-[92px] md:w-[92px] mr-1.5 ${!isPriceActive && "bg-select-disable"}`}
        extraContentClass={'h-[44px]'}
        extraInputClass={`px-[34px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${!isPriceActive && "text-white"}`}
        isDisabled={!isPriceActive}
      />
      <Controller
        control={control}
        name="currency"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            extraBoxClass={'w-[90px] my-auto'}
            extraContentClass={`pl-[14px] pr-[10px] ${isPriceActive ? "" : "bg-select-disable cursor-default"}`}
            extraDropdownClass={'w-[90px]'}
            isDisabled={!isPriceActive}
            options={currencies}
            onChange={(option: ISelectInputOptions) => {
              onChange(option.id)
            }}
            value={currencies.find((el) => el.id === value)}
          />
        )}
      />
      <Controller
        control={control}
        name="free"
        render={({ field: { onChange, value } }) => (
          <SwitchInput
            labelText={'Бесплатное'}
            extraBoxClass={'ml-[60px]'}
            onChange={(state: boolean) => {
              onChange(state);

              state ? setValue('cost', null) : setValue('cost', '');

              clearErrors('cost');
            }}
            value={value}
          />
        )}
      />
    </div>
  )
}
