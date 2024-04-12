import { Menu } from "@headlessui/react";
import { MenuItem } from "./menuItem";
import { menuItems } from "../lib/menuItems";
import { selectRefreshToken } from "@/shared/lib";
import { LogoutButton } from "@/features/authentication/logout";

export function BurgerMenu() {
  const refresh = selectRefreshToken();

  return (
    <Menu.Items className="absolute flex flex-col right-0 z-[11] mt-10 w-[293px] h-[410px] px-10 py-[30px] rounded-[20px] bg-white shadow justify-start items-start gap-[15px] inline-flex focus:outline-none">
      {menuItems.map(({ img, name, link }, id) => {
        return (
          <Menu.Item key={id}>
            {() => <MenuItem img={img} name={name} link={link} />}
          </Menu.Item>
        );
      })}
      {refresh && <LogoutButton refresh={refresh} />}
    </Menu.Items>
  );
}
