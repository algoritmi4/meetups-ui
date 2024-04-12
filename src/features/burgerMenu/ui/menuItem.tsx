import React from "react";
import { IItem } from "../model/types";
import { Link } from "react-router-dom";

export const MenuItem = React.forwardRef(({ img, name, link}: IItem, ref) => {
  return (
    <Link to={link} className="w-[100%] hover:bg-slate-200">
      <div className="flex">
        <div
          className={`${img} w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex`}
        >
          {" "}
        </div>
        <p className="text-zinc-600 text-[17px] font-['Mulish']">{name}</p>
      </div>
    </Link>
  );
}); 
 