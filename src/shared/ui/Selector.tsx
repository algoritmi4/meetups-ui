import {ReactElement} from "react";
import {ISelectorOptions} from "../types";

interface ISelectorProps {
  options: ISelectorOptions[];
  extraClasses?: string;
}

export function Selector({
  options,
  extraClasses
}: ISelectorProps): ReactElement {
  return (
    <div className={`relative pr-8 ${extraClasses}`}>
      <select className="appearance-none text-[45px] text-text-black font-semibold outline-none leading-normal pr-8 cursor-pointer bg-transparent">
        {
          options.map((el, index) => <option key={index} value={el.value}>{el.name}</option>)
        }
      </select>
      <div className="absolute w-6 h-6 top-[20px] right-[32px] bg-chevron-down-black bg-no-repeat bg-center pointer-events-none"></div>
    </div>
  );
}
