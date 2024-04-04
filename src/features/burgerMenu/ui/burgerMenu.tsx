import { Menu } from "@headlessui/react";

export function BurgerMenu() {
  return (
    <Menu.Items>
      <Menu.Item>
        {({ active }) => (
          <a className={`${active && "bg-blue-500"}`} href="/account-settings">
            <div className="bg-user-profile w-[24px] h-[24px]"> </div>
            <p>Профиль</p>
          </a>
        )}
      </Menu.Item>
    </Menu.Items>
  );
}
