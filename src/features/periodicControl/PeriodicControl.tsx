import { CheckboxWithValue, Input } from "@/shared";
import { Disclosure } from "@headlessui/react";
import { ChangeEvent, ReactElement, useState } from "react";
import { daysObj } from "./model/consts";
import { IDays, IDayObj, ISchemaDay } from "./model/types";

interface IPeriodicControlProps {
  onPeriodicChange: (state: boolean) => void;
  onChangeSchedule: (day: ISchemaDay) => void;
  onChangeScheduleDayTime: (day: ISchemaDay) => void;
}

export function PeriodicControl({ onPeriodicChange, onChangeSchedule, onChangeScheduleDayTime }: IPeriodicControlProps): ReactElement {
  const [isPeriodic, setIsPeriodic] = useState(false);
  const [days, setDays] = useState<IDayObj>(daysObj);
  const [isInputsDisabled, setIsInputsDisabled] = useState(true);

  const handlePeriodic = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPeriodic(e.target.checked);

    onPeriodicChange(e.target.checked);
  }

  const onSelectDay = (key: keyof IDayObj, day: IDays) => {
    setDays((state) => ({...state, [key]: {...state[key], isSelected: !state[key].isSelected}}));

    onChangeSchedule({day_of_week: day.day_of_week, time: day.time});
  }

  const handleInputsDisable = () => {
    setIsInputsDisabled((state) => !state);
  }

  const onChangeDayTime = (key: keyof IDayObj, day: IDays) => {
    setDays((state) => ({...state, [key]: {...state[key], time: day.time}}));

    if (day.time) {
      onChangeScheduleDayTime({day_of_week: day.day_of_week, time: day.time});
    } else {
      console.log('!');
    }
  }

  return (
    <Disclosure>
      {
        ({ open, close }) => (
          <>
            <CheckboxWithValue
              id="periodic"
              value="Периодическое мероприятие"
              extraLabelClass="text-[20px] ml-2.5"
              onChangeFunc={(e) => {handlePeriodic(e); close()}}
            />
            <Disclosure.Button className={`flex items-center text-[18px] leading-[22.59px] py-[10px] w-full text-start px-[22px] mt-[7px] ${isPeriodic ? "bg-custom-gray" : "text-white bg-select-disable"} ${open ? "rounded-t-[10px] pt-[20px]" : "rounded-[10px]"}`} disabled={!isPeriodic}>
              Настройки
              <div className={`w-6 h-6 bg-no-repeat bg-center ml-auto ${isPeriodic ? "bg-chevron-down-black" : "bg-chevron-down-white"} ${open && "rotate-180"}`}></div>
            </Disclosure.Button>
            <Disclosure.Panel className={'flex pt-[7px] px-[22px] pb-5 bg-custom-gray rounded-b-[10px]'}>
              <div className="flex flex-col text-[18px] pt-2">
                <p>Проводится каждый:</p>
                <p className="mt-[12px]">Время:</p>
              </div>
              <ul aria-labelledby="periodic-control" className="flex items-center ml-[18px]">
                {
                  Object.keys(days).map((el, index) => (
                    <li key={index} className="h-[77px] w-[55px] flex flex-col items-center ml-1 first-of-type:ml-0">
                      <div onClick={() => onSelectDay(el as keyof IDayObj, days[el as keyof IDayObj])} className={`flex items-center justify-center w-[45px] h-[45px] border-1 border-main-violet border-solid rounded-[10px] cursor-pointer ${days[el as keyof IDayObj].isSelected ? "bg-main-violet text-white" : ""}`}>
                        <p className="uppercase select-none">{el}</p>
                      </div>
                      {
                        days[el as keyof IDayObj].isSelected && (
                          <Input
                            HTMLType="time"
                            extraBoxClass={`w-[53px] h-[28px] mt-0.5 ${isInputsDisabled ? "" : "border-1 !border-text-black border-solid"}`}
                            extraContentClass="h-[28px]"
                            extraInputClass={`[&::-webkit-calendar-picker-indicator]:hidden text-center !text-[16px] ${isInputsDisabled ? "text-text-black" : "text-text-light-gray"}`}
                            value={days[el as keyof IDayObj].time}
                            onChange={(e) => onChangeDayTime(el as keyof IDayObj, {...days[el as keyof IDayObj], time: e.target.value})}
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
