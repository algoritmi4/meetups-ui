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
          {profileData && <img className="w-[50px] h-[50px] rounded-full" src={`https://storage.googleapis.com/meetups-dev/media/${profileData.image}`} alt={`Изображение ивента ${profileData.username}`} /> }
        </Menu.Button>
        <BurgerMenu />
      </div>
    </Menu>
  );
}
 

