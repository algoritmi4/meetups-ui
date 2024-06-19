import { Menu } from "@headlessui/react";
import Svg from "@/shared/ui/Svg";
import { Fragment } from "react";

export function NotificationButton() {
  return (
    <>
      <Menu as={Fragment}>
        <div className="relative shrink-0 ml-[16px] cursor-pointer self-center">
          <Menu.Button>
            <Svg
              id="notification-bell-alert"
              width="25"
              height="29"
              viewBox="0 0 25 29"
              fill="none"
            />
          </Menu.Button>
          <Menu.Items className="absolute flex-col right-0 top-[62px] z-50 w-[375px] h-[416px] px-10 py-[30px] rounded-[20px] bg-white shadow-shadow-bm justify-start items-start gap-[15px] inline-flex focus:outline-none">
          </Menu.Items>
        </div>
      </Menu>
    </>
  );
}
