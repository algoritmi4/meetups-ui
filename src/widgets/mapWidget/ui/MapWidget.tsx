import { GoogleMap } from "@/features/googleMap";
import { ReactElement } from "react";
import { IFeatures } from "../model/types";
import { ICoordinates } from "@/features/googleMap/model/types";
import { AddressControl } from "@/features/addressControl";
import { UseFormSetValue } from "react-hook-form";
import { AddEventValidationSchema } from "@/features/addEvent/addEventForm/model/addEventFormSchema";

interface IMapWidgetProps {
  text?: string;
  setValue?: UseFormSetValue<AddEventValidationSchema>;
  setValuesFunc?: (city: string, country: string, geometry: google.maps.places.PlaceGeometry | null) => void;
  error?: string;
  position: ICoordinates;
  zoom: number;
  markers?: IFeatures[];
  isLoading?: boolean;
  withAddressControl?: boolean;
}

export function MapWidget({ text, setValue, setValuesFunc, error, position, zoom, markers = [], isLoading, withAddressControl }: IMapWidgetProps): ReactElement {
  return (
    <>
      {withAddressControl && <AddressControl setValuesFunc={setValuesFunc} setValue={setValue} error={error} />}
      {text && <p className="text-[20px] font-normal leading-[25.1px] mb-[7px] mt-[15px]">{text}</p>}
      <GoogleMap position={position} markersArr={markers} isLoading={isLoading} zoom={zoom} withAddressControl={withAddressControl} extraClasses="rounded-[12px] "/>
    </>
  )
}
