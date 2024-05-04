import { SlickSlider } from "@/shared";
import { ReactElement, useEffect, useState } from "react";
import { IEvent } from "@/entities/event/model/types";
import { EventCard } from "@/entities/event";

interface IEventSlider {
  events: IEvent[];
}

export function ProfileEventSlider({ events }: IEventSlider): ReactElement {
  const cards = events.map((el, index) => <EventCard key={index} event={el} />);

  useEffect(() => {
  }, [events.length]);

  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 400,
    className: `mt-3 w-[225px] min-h-[230px]`
  }

  return (
    <SlickSlider extraSettings={settings} arrowsExtraClasses={{rightArrow: 'right-0 top-[110px]', leftArrow: 'left-[-30px] top-[110px]'}}>
      {cards}
    </SlickSlider>
  )
}