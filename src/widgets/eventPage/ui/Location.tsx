import { IEvent } from "@/entities/event/model/types";
import { GoogleMap } from "@/features/googleMap";
import { Button } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { ReactElement } from "react";

interface ILocationProps {
    event: IEvent;
}

export function Location({event}: ILocationProps): ReactElement {
  return (
    <section className="w-full mt-[90px]">
      <div className="text-text-black text-[28px] font-semibold">
        Локация
      </div>
      <div className="flex w-full h-[300px] mt-7">
        <div className="bg-but-primary p-[24px] text-white flex flex-col justify-between rounded-l-def">
          <p className="text-[20px] leading-[25px]">
            {event.address}
          </p>
          <div className="flex items-center">
            <Button
              type="button"
              importance="secondary"
              size="md"
            >Пойду на встречу</Button>
            <Svg id="white-heart-icon" className="w-6 h-6 ml-5" />
          </div>
        </div>
        <GoogleMap position={{ lat: 53.9, lng: 27.56667 }} zoom={14} markersArr={[]} extraClasses="!rounded-r-[10px] !rounded-l-none max-h-full border-2 border-but-primary"/>
      </div>
    </section>
  )
}
