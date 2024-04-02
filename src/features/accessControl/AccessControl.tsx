import { SelectInput } from "@/shared";
import { ISelectInputOptions } from "@/shared/model/types";
import { Popover } from "@headlessui/react";
import { ReactElement, useState } from "react";
import { useLazyGetAccessLinkQuery } from "./api/accessLinkApi";

interface IAccessControlProps {
  setValueFunc: (option: ISelectInputOptions, accessLink: string) => void;
  error?: string;
}

const options = [
  { id: 1, name: 'Публичное' },
  { id: 2, name: 'По ссылке' },
]

export function AccessControl({ setValueFunc, error }: IAccessControlProps): ReactElement {
  const [linkState, setLinkState] = useState({link: '', isActive: false});
  const [ getLink ] = useLazyGetAccessLinkQuery();

  const getAccessLink = (option: ISelectInputOptions) => {
    getLink()
      .unwrap()
      .then((res) => {
        setLinkState((state) => ({...state, link: res}));
        setValueFunc(option, res);
      })
      .catch((err) => console.log(err));
  }

  const onSelectOption = (option: ISelectInputOptions) => {
    if (option.name === 'По ссылке') {
      setLinkState(((state) => ({...state, isActive: true})));

      if (!linkState.link) {
        getAccessLink(option);
      }
    } else {
      setLinkState((state) => ({...state, isActive: false}));
    }

    if (linkState.link) {
      setValueFunc(option, linkState.link);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkState.link)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className="flex flex-col">
      <SelectInput
        error={error}
        labelText='Доступ к мероприятию'
        options={options}
        setValueFunc={onSelectOption}
        placeholder='Публичное/по ссылке'
        extraBoxClass="mt-[18px]"
      />
      <Popover className="relative">
        <Popover.Panel className="absolute bottom-[50px] flex items-center border-1 border-solid border-main-blue rounded-[10px] h-[45px] w-[450px] bg-gray px-5 py-2">
          <p className="truncate">{linkState.link}</p>
          <button type="button" onClick={copyToClipboard} className="text-[30px] ml-auto">&#10557;</button>
        </Popover.Panel>
        <Popover.Button className={`flex items-center py-2.5 px-3.5 text-white h-[44px] w-[133px] mt-2.5 rounded-[10px] ${linkState.isActive ? "bg-main-blue cursor-pointer duration-150 hover:opacity-70" : "bg-select-disable cursor-default"}`} disabled={!linkState.isActive}>
          <div className="w-6 h-6 bg-link-icon bg-no-repeat bg-center"></div>
          <p className="text-[18px] font-semibold ml-2">Ссылка</p>
        </Popover.Button>
      </Popover>
    </div>
  )
}
