

import { getDateAndTime } from "@/entities/event/lib/getDateAndTime";
import { IEvent } from "@/entities/event/model/types";
import { ReactElement } from "react";
import { Gallery } from "./Gallery";
import { Details } from "./Datails";


interface IEventHeader {
    event: IEvent;
}

export function EventHeader({event}: IEventHeader): ReactElement {
    return (
        <section className="flex h-[460px] rounded-[10px]">
            <Details event={event}/> 
            <Gallery image_url={event.image_url} gallery={event.gallery}/>
        </section>
    )          
}
