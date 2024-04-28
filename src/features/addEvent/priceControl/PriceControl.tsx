import { LabeledInput, SelectInput, SwitchInput } from "@/shared";
import { ReactElement } from "react";
import { Control, Controller, UseFormClearErrors, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "../addEventForm/model/addEventFormSchema";
import { ISelectInputOptions } from "@/shared/model/types";

interface IPriceControlProps {
  hookFormRegister: UseFormRegisterReturn<string>;
  error?: string;
  control: Control<AddEventValidationSchema>;
  isPriceActive: boolean;
  setValue: UseFormSetValue<AddEventValidationSchema>;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
  currencies: ISelectInputOptions[];
}

export function PriceControl({ hookFormRegister, error, control, isPriceActive, setValue, clearErrors, currencies }: IPriceControlProps): ReactElement {
  return (
    <div className={'flex items-center mt-[18px]'}>
      <LabeledInput
        hookFormRegister={hookFormRegister}
        isError={!!error}
        type='number'
        placeholder={`${isPriceActive ? "12" : ""}`}
        className={`w-[90px] max-h-11 text-[18px] mr-1.5 ml-3.5 ${!isPriceActive && "bg-select-disable"}`}
        size="sm"
        extraBoxClass={`!flex-row !items-center`}
        extraInputClass={`text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${!isPriceActive && "text-white"}`}
        disabled={!isPriceActive}
        labelText='Стоимость'
        extraLabelClass="text-[20px]"
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
