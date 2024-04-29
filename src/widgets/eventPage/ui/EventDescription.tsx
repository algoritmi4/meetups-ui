import { IEvent } from "@/entities/event/model/types";
import { ReactElement } from "react";

interface IEventDescription {
    event: IEvent;
}

export function EventDescription({event}: IEventDescription): ReactElement {
  return (
    <section className="mt-[90px] self-start">
      <h2 className="text-[28px] mb-[28px] font-semibold">
        О событии
      </h2>
      <p className="text-[20px] text-text-black mt-7">{event.description}</p>
    </section>
  )
}
