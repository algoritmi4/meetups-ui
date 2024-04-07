// import { Button } from "@/shared";
import { useMyDetailsQuery } from "@/entities/profile/api/profileApi.ts";
import { Menu } from "@headlessui/react";
import { BurgerMenu } from "@/features/burgerMenu";

export function ProfileButton() {
  let { data: profileData } = useMyDetailsQuery();
  return (
    <Menu>
      <div className="relative">
        <Menu.Button className="text-base mt-2.5">
          {profileData?.username}
        </Menu.Button>
        <BurgerMenu />
      </div>
    </Menu>
  );
}
