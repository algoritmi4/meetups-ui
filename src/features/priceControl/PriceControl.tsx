import { Input, SelectInput, SwitchInput } from "@/shared";
import { ReactElement, useState } from "react";
import { useGetCurrenciesQuery } from "./api/currencyApi";
import { UseFormRegisterReturn } from "react-hook-form";
import { ISelectInputOptions } from "@/shared/model/types";

interface IPriceControlProps {
  hookFormValues: UseFormRegisterReturn<string>;
  error?: string;
  onSwitchPriceType: (state: boolean) => void;
  onChangeCurrencyType?: (option: ISelectInputOptions) => void;
}

export function PriceControl({ hookFormValues, error, onSwitchPriceType, onChangeCurrencyType }: IPriceControlProps): ReactElement {
  const [isPriceActive, setIsPriceActive] = useState(true);

  const { data: currencies = {results: []}, isError, error: currenciesError, isLoading } = useGetCurrenciesQuery();

  isError && console.log(`Ошибка при получении валют - ${JSON.stringify(currenciesError)}`);

  const onSwitchFree = (state: boolean) => {
    if (state) {
      setIsPriceActive(false);
    } else {
      setIsPriceActive(true);
    }

    onSwitchPriceType(state);
  }

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
      {
        isLoading ? (
          <></>
        ) : (
          <SelectInput
            extraBoxClass={'w-[90px] my-auto'}
            extraContentClass={`pl-[14px] pr-[10px] ${isPriceActive ? "" : "bg-select-disable cursor-default"}`}
            extraDropdownClass={'w-[90px]'}
            isDisabled={!isPriceActive}
            options={currencies.results}
            setValueFunc={onChangeCurrencyType}
          />
        )
      }
      <SwitchInput
        labelText={'Бесплатное'}
        extraBoxClass={'ml-[60px]'}
        setValueFunc={onSwitchFree}
      />
    </div>
  )
}
