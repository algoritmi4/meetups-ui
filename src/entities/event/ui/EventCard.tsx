import { ReactElement} from "react";
import {IEvent} from "../model/types";
import {getDateAndTime} from "../lib/getDateAndTime";
import Svg from "@/shared/ui/Svg";

export interface IEventCard {
  event: IEvent;
}

export function EventCard({ event }: IEventCard): ReactElement {
  const { eventDate, eventTime } = getDateAndTime(event.start_date);

  return (
    <div className="flex flex-col max-w-[270px] mr-[45px]">
      <div className="flex justify-between">
        <p className="text-[14px] font-medium capitalize">{event.category?.name}</p>
        <div className="w-[24px] h-[24px] bg-heart-icon cursor-pointer"></div>
      </div>
      <figure className="flex flex-col cursor-pointer rounded-12 max-h-[188px] mt-[7px]">
        <img className="rounded-t-12 h-[143px] object-cover" src={`https://storage.googleapis.com/meetups-dev/media/${event.image_url}`} alt={`Изображение ивента ${event.name}`} />
        <div className={`h-[45px] bg-gray rounded-b-12 flex items-center justify-center pl-[16px] pr-[7px] relative ${event.name.length > 21 && "before:w-[60px] before:rounded-b-[12px] before:absolute before:right-0 before:h-full before:bg-text-fade-out"}`}>
          <figcaption className="capitalize text-[20px] font-semibold text-text-black overflow-hidden whitespace-nowrap text-clip">{event.name}</figcaption>
        </div>
      </figure>
      <div className="flex justify-between mt-[10px]">
        <div className="flex flex-col">
          <p className="text-[18px] font-medium">{eventDate}</p>
          <p className="text-[18px] font-medium mt-[2px]">{eventTime}</p>
        </div>
        <div className="flex flex-col mt-[4px]">
          <div className="flex items-center">
            <p className="text-[14px]">6/12</p>
            <div className="w-6 h-6 bg-event-card-people bg-no-repeat bg-center ml-1"></div>
          </div>
            {
              (!!event.average_rating || event.average_rating === 0) && (
                <div className="flex items-start mt-[8px] self-end">
                  <p className="text-[14px] font-medium">{event.average_rating}</p>
                  <Svg id='rating-star' extraUseClass="!fill-current" className='w-[18px] h-[18px] ml-2' />
                </div>
              )
            }
        </div>
      </div>
    </div>
  )
}
