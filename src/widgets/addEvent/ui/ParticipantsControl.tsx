import { AccessControl } from "@/features/addEvent/accessControl";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { PlacesNumberControl } from "@/features/addEvent/placesNumberControl";
import { PriceControl } from "@/features/addEvent/priceControl";
import { CheckboxWithLabel, Input } from "@/shared";
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
          hookFormValues={register('desired_participants_number', { valueAsNumber: true })}
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
        <Input
          hookFormValues={register('participants_age', { valueAsNumber: true })}
          error={errors.participants_age?.message}
          HTMLType='number'
          labelText='Возраст участников'
          placeholder='18'
          id='add-event-people-age'
          inlineLabel={true}
          extraBoxClass={'w-[62px] md:w-[62px] mt-[7px]'}
          extraContentClass={'h-[44px]'}
          extraInputClass="px-[10px] text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
        hookFormValues={register('cost')}
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
