import { CheckboxWithLabel, Input } from "@/shared";
import { Disclosure } from "@headlessui/react";
import { ReactElement, useState } from "react";
import { daysArr, parityDayNames } from "./model/consts";
import { Control, Controller, UseFormClearErrors } from "react-hook-form";
import { AddEventValidationSchema } from "../addEventForm/model/addEventFormSchema";
import { IDay } from "./model/types";

interface IPeriodicControlProps {
  isPeriodic: boolean;
  control: Control<AddEventValidationSchema>;
  onChange: (day: IDay[]) => void;
  schedule: IDay[];
  error?: string;
  clearErrors: UseFormClearErrors<AddEventValidationSchema>;
}

export function PeriodicControl({ isPeriodic, control, onChange, schedule, error, clearErrors }: IPeriodicControlProps): ReactElement {
  const [isInputsDisabled, setIsInputsDisabled] = useState(true);

  const handleInputsDisable = () => {
    setIsInputsDisabled((state) => !state);
  }

  const onSelectDay = (day: IDay) => {
    schedule.some((item) => item.day_of_week === day.day_of_week) ? onChange(schedule.filter((item) => item.day_of_week !== day.day_of_week)) : onChange([...schedule, day]);
  }

  const onChangeTime = (day: IDay, time: string) => {
    const newSchedule = schedule.map((item) => {
      if (item.day_of_week !== day.day_of_week) return item;

      return {...item, time}
    })

    onChange(newSchedule);
  }

  const onChangePeriodic = () => {
    clearErrors(['schedule', 'start_date', 'start_time', 'end_date', 'end_time']);
  }

  return (
    <Disclosure>
      {
        ({ open, close }) => (
          <>
            <Controller
              control={control}
              name="repeatable"
              render={({ field: { onChange, value } }) => (
                <CheckboxWithLabel
                  id="periodic"
                  label="Периодическое мероприятие"
                  extraLabelClass="text-[20px] ml-2.5"
                  onChange={(e) => {
                    !e.target.checked && close();

                    onChangePeriodic();

                    onChange(e.target.checked);
                  }}
                  value={value}
                />
              )}
            />
            <Disclosure.Button className={`flex items-center text-[18px] leading-[22.59px] py-[10px] w-full text-start px-[22px] mt-[7px] ${isPeriodic ? "bg-custom-gray" : "text-white bg-select-disable"} ${open ? "rounded-t-[10px] pt-[20px]" : "rounded-[10px]"} ${error ? open ? "border-solid border-input-error border-t-1 border-x-1" : "border-solid border-input-error border-1" : ""}`} disabled={!isPeriodic}>
              Настройки
              <div className={`w-6 h-6 bg-no-repeat bg-center ml-auto ${isPeriodic ? "bg-chevron-down-black" : "bg-chevron-down-white"} ${open && "rotate-180"}`}></div>
            </Disclosure.Button>
            <Disclosure.Panel className={`flex pt-[7px] px-[22px] pb-5 bg-custom-gray rounded-b-[10px] ${error ? "border-solid border-input-error border-b-1 border-x-1" : ""}`}>
              <div className="flex flex-col text-[18px] pt-2">
                <p>Проводится каждый:</p>
                <p className="mt-[12px]">Время:</p>
              </div>
              <ul aria-labelledby="periodic-control" className="flex items-center ml-[18px]">
                {
                  daysArr.map((el, index) => (
                    <li key={index} className="h-[77px] w-[55px] flex flex-col items-center ml-1 first-of-type:ml-0">
                      <div onClick={() => onSelectDay(el)} className={`flex items-center justify-center w-[45px] h-[45px] border-1 border-main-violet border-solid rounded-[10px] cursor-pointer ${schedule.some((item) => item.day_of_week === el.day_of_week) ? "bg-main-violet text-white" : ""}`}>
                        <p className="uppercase select-none">{parityDayNames[el.day_of_week]}</p>
                      </div>
                      {
                        schedule.some((item) => item.day_of_week === el.day_of_week) && (
                          <Input
                            HTMLType="time"
                            extraBoxClass={`w-[53px] h-[28px] mt-0.5 ${isInputsDisabled ? "" : "border-1 !border-text-black border-solid"}`}
                            extraContentClass="h-[28px]"
                            extraInputClass={`[&::-webkit-calendar-picker-indicator]:hidden text-center !text-[16px] ${isInputsDisabled ? "text-text-black" : "text-text-light-gray"}`}
                            value={schedule.find((item) => item.day_of_week === el.day_of_week)?.time}
                            onChange={(e) => onChangeTime(el, e.target.value)}
                            isDisabled={isInputsDisabled}
                          />
                        )
                      }
                    </li>
                  ))
                }
              </ul>
              <div onClick={handleInputsDisable} className={`w-6 h-6 bg-edit-pen-icon bg-no-repeat bg-center self-end ml-2 cursor-pointer ${isInputsDisabled ? "opacity-100" : "opacity-50"}`}></div>
            </Disclosure.Panel>
          </>
        )
      }
    </Disclosure>
  )
}
