import { IEvent } from "@/entities/event/model/types";
import { GoogleMap } from "@/features/googleMap";
import { Button } from "@/shared";
import { ReactElement } from "react";

interface ILocationCard {
    event: IEvent;
}

export function LocationCard({event}: ILocationCard): ReactElement {
    const addToFavorite = () => {
        // send POST request to  /events/{event_id}/register/
    }

    return (
        <div>
            <div className="text-neutral-800 text-[28px] mb-[28px] font-semibold">
            Локация
            </div>
        
            <div className=" flex w-full h-[300px] border-2 rounded-[10px] border-main-purple">
                <div className="bg-main-purple p-[24px] text-white flex flex-col justify-between">
                    <address className="text-[20px] font-normal not-italic">
                        {event.address}
                    </address>

                    <div className="actions flex space-x-[20px]">
                        <button
                         className="bg-white hover:bg-hover-pink text-main-purple hover:text-white h-[44px] w-[226px] rounded-[10px] text-[18px] text-bold">
                            Пойти на встречу
                        </button>
                        <Button HTMLType="button" type="secondary" iconType="heart-light" extraClass="w-[40px]"
                            onClick={addToFavorite}/>
                    </div>
                </div>
                <div className="map_widget shrink-0 h-full w-[690px]">
                    <GoogleMap position={{ lat: 53.9, lng: 27.56667 }} zoom={14} markersArr={[]} extraClasses="rounded-r-[10px]"/>
                </div>
            </div>
        </div>
    )
}
