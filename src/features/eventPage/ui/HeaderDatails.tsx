import { IEvent } from "@/entities/event/model/types";
import { Button } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { ReactElement } from "react";

interface IHeaderDetailsProps {
  event: IEvent;
}

export function HeaderDetails({event}: IHeaderDetailsProps): ReactElement {
  return (
    <section className="relative flex flex-col bg-custom-gray px-[30px] py-5 rounded-l-[10px]">
      <h2 className="text-[18px] text-indigo-700">{event.category?.name}</h2>
      <h1 className="font-semibold leading-[44px] text-[35px] text-text-black mt-5">{event.name}</h1>
      <Svg id="heart-icon" className="absolute top-[76px] right-[30px] w-6 h-6 cursor-pointer" />
      <div className="event_details flex flex-col space-y-[18px] text-[22px] text-neutral-800 mt-[30px]">
        <div className="flex items-center">
          <Svg id="calendar-icon" className="w-8 h-8" />
          <p className="text-[26px] font-normal ml-2.5">{new Date(event.start_date).toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric'})}</p>
        </div>
        <div className="flex items-center">
          <Svg id="clock-icon" className="w-8 h-8" />
          <p className="text-[26px] font-normal ml-2.5">{event.start_time ? event.start_time.slice(0, 5) : ''}</p>
        </div>
        <div className="flex items-center">
          <Svg id="map-marker-icon" className="w-8 h-8" />
          <p className="text-[18px] leading-def ml-2.5">{event.address}</p>
        </div>
      </div>
      <Button
        type='button'
        importance='primary'
        extraClass="self-start text-[18px] font-semibold mt-auto"
        size="md"
      >Присоединиться</Button>
      <div className="relative flex items-end justify-between mt-3">
        <p className="text-[18px] font-medium">Вход: {`${event.cost ? event.cost.split('.')[0] : "свободный"}`}</p>
        <div className={`absolute right-0 bottom-0 flex self-end ${event.any_participant_number ? "items-end" : "items-center"}`}>
          <p className={`${event.any_participant_number ? "text-[32px] leading-[40px]" : "text-[14px] leading-[18px]"}`}>{event.any_participant_number ? "∞" : "Список участников"}</p>
          <Svg className="w-8 h-8 ml-1" id="person-quantity-icon"/>
        </div>
      </div>
    </section>
  )
}
