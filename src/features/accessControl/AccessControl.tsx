import { SelectInput } from "@/shared";
import { ISelectInputOptions } from "@/shared/model/types";
import { Popover } from "@headlessui/react";
import { ReactElement } from "react";
import { useLazyGetAccessLinkQuery } from "./api/accessLinkApi";
import { Control, Controller } from "react-hook-form";
import { AddEventValidationSchema } from "../addEvent/model/addEventFormSchema";

interface IAccessControlProps {
  error?: string;
  control: Control<AddEventValidationSchema>;
  link: string | null;
  onChangeLink: (link: string) => void;
  type: 'open' | 'private';
}

const eventTypesArray = [
  { id: 0, name: 'Публичное' },
  { id: 1, name: 'По ссылке' },
]

export function AccessControl({ error, control, link, onChangeLink, type }: IAccessControlProps): ReactElement {
  const [ getLink ] = useLazyGetAccessLinkQuery();

  const isLinkActive = link && type === 'private';

  const getAccessLink = () => {
    getLink()
      .unwrap()
      .then((res) => {
        onChangeLink(res);
      })
      .catch((err) => console.log(err));
  }

  const onSelectOption = (option: ISelectInputOptions) => {
    if (option.name === 'По ссылке') {
      if (!link) {
        return getAccessLink();
      }
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link ?? '')
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className="flex flex-col">
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <SelectInput
            error={error}
            labelText='Доступ к мероприятию'
            onChange={(option: ISelectInputOptions) => {
              onSelectOption(option);
              onChange(option.name === 'По ссылке' ? 'private' : 'open');
            }}
            value={value ? value === 'open' ? eventTypesArray[0] : eventTypesArray[1] : undefined}
            options={eventTypesArray}
            placeholder='Публичное/по ссылке'
            extraBoxClass="mt-[18px]"
          />
        )}
      />
      <Popover className="relative">
        <Popover.Panel className="absolute bottom-[50px] flex items-center border-1 border-solid border-main-blue rounded-[10px] h-[45px] w-[450px] bg-gray px-5 py-2">
          <p className="truncate">{link}</p>
          <button type="button" onClick={copyToClipboard} className="text-[30px] ml-auto">&#10557;</button>
        </Popover.Panel>
        <Popover.Button className={`flex items-center py-2.5 px-3.5 text-white h-[44px] w-[133px] mt-2.5 rounded-[10px] ${isLinkActive ? "bg-main-blue cursor-pointer duration-150 hover:opacity-70" : "bg-select-disable cursor-default"}`} disabled={!isLinkActive}>
          <div className="w-6 h-6 bg-link-icon bg-no-repeat bg-center"></div>
          <p className="text-[18px] font-semibold ml-2">Ссылка</p>
        </Popover.Button>
      </Popover>
    </div>
  )
}
