import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";
import { PeriodicControl } from "@/features/addEvent/periodicControl";
import { Input } from "@/shared";
import TimeInput from "@/shared/ui/TimeInput";
import { ReactElement, useId } from "react";
import { Controller, useFormContext } from "react-hook-form";

export function TimeControl(): ReactElement {
  const startTimeId = useId();
  const endTimeId = useId();

  const {
    register,
    formState: { errors },
    control,
    watch,
    clearErrors
  } = useFormContext<AddEventValidationSchema>();

  return (
    <>
      <div className='flex items-center relative mt-[18px]'>
        <Input
          hookFormValues={register('start_date')}
          error={errors.start_date?.message}
          HTMLType='date'
          labelText='Дата'
          placeholder='Начало'
          id='add-event-start-date'
          extraBoxClass={`w-[480px] mt-[7px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
          extraContentClass='h-[44px]'
          extraInputClass='px-[22px]'
          max="9999-12-31"
          isDisabled={watch('repeatable')}
        />
        <div
          className='w-4 h-0.5 mx-3.5 mt-8 border-1 border-text-light-gray border-solid'
        />
        <div className='self-end relative'>
          <Input
            hookFormValues={register('end_date')}
            error={errors.end_date?.message}
            HTMLType='date'
            placeholder='Конец'
            id='add-event-end-date'
            extraBoxClass={`w-[480px] mt-[7px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
            extraContentClass={'h-[44px]'}
            extraInputClass='px-[22px]'
            max="9999-12-31"
            isDisabled={watch('repeatable')}
          />
          <p className='text-text-light-gray absolute bottom-[-26px] left-[22px]'>Необязательное поле</p>
        </div>
      </div>

      <div className='flex flex-col relative mt-[20px]'>
        <label htmlFor={startTimeId} className="text-xl cursor-pointer">Время</label>
        <div className="flex items-center mt-[7px]">
          <Controller
            control={control}
            name="start_time"
            render={({ field: { onChange, value } }) => (
              <TimeInput
                onStringChange={onChange}
                stringValue={value}
                error={errors.start_time?.message}
                extraFieldClass={`flex items-center w-[480px] h-[44px] px-[22px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
                extraSegmentClass="text-[18px]"
                id={startTimeId}
                isDisabled={watch('repeatable')}
              />
            )}
          />
          <div
            className='w-4 h-0.5 mx-3.5 border-1 border-text-light-gray border-solid'
          />
          <div className="relative">
            <Controller
              control={control}
              name="end_time"
              render={({ field: { onChange, value } }) => (
                <TimeInput
                  onStringChange={onChange}
                  stringValue={value}
                  error={errors.end_time?.message}
                  extraFieldClass={`flex items-center w-[480px] h-[44px] px-[22px] ${watch('repeatable') ? "bg-select-disable" : ""}`}
                  extraSegmentClass="text-[18px]"
                  id={endTimeId}
                  isDisabled={watch('repeatable')}
                />
              )}
            />
            <p className='text-text-light-gray absolute bottom-[-26px] left-[22px]'>Необязательное поле</p>
          </div>
        </div>
      </div>

      <div className="mt-[30px] mb-[18px] text-text-black">
        <Controller
          control={control}
          name="schedule"
          render={({ field: { onChange, value } }) => (
            <PeriodicControl
              isPeriodic={watch('repeatable')}
              control={control}
              onChange={onChange}
              schedule={value ?? []}
              error={errors.schedule?.message}
              clearErrors={clearErrors}
            />
          )}
        />
      </div>
    </>
  )
}
