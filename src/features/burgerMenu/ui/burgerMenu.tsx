import { Menu } from "@headlessui/react";
import { MenuItem } from "./menuItem";
import { menuItems } from "../lib/menuItems";

export function BurgerMenu() {
  return (
    <Menu.Items className="absolute flex flex-col right-0 z-[11] mt-10 w-[293px] h-[435px] px-10 py-[30px] rounded-[20px] bg-white shadow justify-start items-start gap-[15px] inline-flex focus:outline-none">
      {menuItems.map(({ img, name }, id) => {
        return (
          <Menu.Item key={id}>
            {() => <MenuItem img={img} name={name} />}
          </Menu.Item>
        );
      })}
    </Menu.Items>
  );
}
