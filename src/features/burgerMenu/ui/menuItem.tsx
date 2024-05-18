import { IItem } from "../model/types";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import Svg from "@/shared/ui/Svg";
import { Fragment } from "react";

export const MenuItem = ({ img, name, link }: IItem) => {
  return (
    <Menu.Item as={Fragment}>
      <Link to={link} className="w-[100%] hover:bg-slate-200">
        <div className="flex">
            <Svg
              id={img}
              className="w-6 h-6 mr-[14px] object-cover"
              viewBox="0 0 24 24"
              fill="none"
            />
          <p className="text-zinc-600 text-[17px] font-['Mulish']">{name}</p>
        </div>
      </Link>
    </Menu.Item>
  );
};

MenuItem.displayName = 'MenuItem';
