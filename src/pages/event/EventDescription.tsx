import { IEvent } from "@/entities/event/model/types";
import { ReactElement } from "react";

interface IEventDescription {
    event: IEvent;
}

export function EventDescription({event}: IEventDescription): ReactElement {
    return (
        <div className="pr-4 pt-6 self-stretch text-xl font-normal leading-[1.3]">
            <div className="text-neutral-800 text-[28px] mb-[28px] font-semibold">
            О событии 
            </div>
 
            <pre className="w-full font-normal text-neutral-800" style={{whiteSpace: "pre-wrap", fontFamily: "inherit"}}>{event.description}</pre>
    
        </div>
    )
}
