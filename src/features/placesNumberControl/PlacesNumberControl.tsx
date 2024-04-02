import { Input, SwitchInput } from "@/shared";
import { ReactElement, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface INumberOfPlacesAndChatControlProps {
  hookFormValues: UseFormRegisterReturn<string>;
  error?: string;
  setValuesFunc?: (state: boolean) => void;
}

export function PlacesNumberControl({ hookFormValues, error, setValuesFunc }: INumberOfPlacesAndChatControlProps): ReactElement {
  const [isPlacesDisabled, setIsPlacesDisabled] = useState(false);

  const handlePlacesLimit = (state: boolean) => {
    setIsPlacesDisabled(state);
    setValuesFunc && setValuesFunc(state);
  }

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
        extraInputClass={`px-[24px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${isPlacesDisabled && "text-white"}`}
        isDisabled={isPlacesDisabled}
      />
      <SwitchInput
        labelText={'Места не ограничены'}
        extraBoxClass={'ml-[60px]'}
        setValueFunc={handlePlacesLimit}
      />
    </div>
  )
}
