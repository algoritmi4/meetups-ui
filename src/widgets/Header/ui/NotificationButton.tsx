import { Menu } from "@headlessui/react";
import Svg from "@/shared/ui/Svg";
import { Fragment } from "react";
import { Notifications } from "@/features/notifications/ui/Notifications";

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
          <Menu.Items className="absolute right-0 p-0 top-[62px] z-50 w-[375px] h-[416px] rounded-[20px] bg-white shadow-shadow-bm gap-[15px] inline-flex focus:outline-none">
            <Notifications />
          </Menu.Items>
        </div>
      </Menu>
    </>
  );
}
