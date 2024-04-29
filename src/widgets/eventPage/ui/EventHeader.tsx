import { IEvent } from "@/entities/event/model/types";
import { HeaderDetails, HeaderGallery } from "@/features/eventPage";
import { ReactElement } from "react";


interface IEventHeader {
    event: IEvent;
}

export function EventHeader({event}: IEventHeader): ReactElement {
  return (
    <section className="flex h-[460px] rounded-[10px]">
      <HeaderDetails event={event}/> 
      <HeaderGallery image_url={event.image_url} gallery={event.gallery}/>
    </section>
  )
}
