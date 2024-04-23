import { AccessControl } from "@/features/addEvent/accessControl";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { PlacesNumberControl } from "@/features/addEvent/placesNumberControl";
import { PriceControl } from "@/features/addEvent/priceControl";
import { CheckboxWithLabel, LabeledInput } from "@/shared";
import { ISelectInputOptions } from "@/shared/model/types";
import { ReactElement } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IParticipantsControlProps {
  currencies: ISelectInputOptions[];
}

export function ParticipantsControl({ currencies }: IParticipantsControlProps): ReactElement {
  const {
    register,
    formState: { errors },
    control,
    watch,
    clearErrors,
    setValue
  } = useFormContext<AddEventValidationSchema>();

  return (
    <>
      <div className="flex items-center mt-[18px]">
        <PlacesNumberControl
          isPlacesDisabled={watch('any_participant_number')}
          hookFormRegister={register('desired_participants_number', { valueAsNumber: true })}
          error={errors.desired_participants_number?.message}
          control={control}
          setValue={setValue}
          clearErrors={clearErrors}
        />
        <CheckboxWithLabel
          id="chat"
          label="Добавить чат участников"
          extraBoxClass="ml-auto"
          extraLabelClass="ml-2.5"
        />
      </div>

      <div className={`flex items-center mt-[18px]`}>
        <LabeledInput
          hookFormRegister={register('participants_age', { valueAsNumber: true })}
          error={!!errors.participants_age?.message}
          type='number'
          placeholder='18'
          size="sm"
          className="w-[60px] max-h-11 text-[18px] ml-3.5"
          extraInputClass="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          extraBoxClass="!flex-row !items-center"
          labelText='Возраст участников'
          extraLabelClass="text-[20px]"
        />
        <p className={`text-xl text-text-black font-medium ml-1.5`}>+</p>
      </div>

      <Controller
        control={control}
        name="private_url"
        render={({ field: { onChange, value } }) => (
          <AccessControl
            error={errors.type?.message}
            control={control}
            onChangeLink={onChange}
            link={value}
            type={watch('type')}
          />
        )}
      />

      <PriceControl
        hookFormRegister={register('cost')}
        error={errors.cost?.message}
        control={control}
        isPriceActive={!watch('free')}
        setValue={setValue}
        clearErrors={clearErrors}
        currencies={currencies}
      />
    </>
  )
}
