import { IItem } from "../model/types";

export const MenuItem = ({ img, name}: IItem) => {
  return (
    <a href="/#">
      <div className="flex">
        <div
          className={`${img} w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex`}
        >
          {" "}
        </div>
        <p className="text-zinc-600 text-[17px] font-['Mulish']">{name}</p>
      </div>
    </a>
  );
};
