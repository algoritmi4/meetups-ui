import { ReactElement } from "react";
import Svg from "@/shared/ui/Svg";
import { BackButton } from "@/shared/ui/Buttons/BackButton";
import ProfileAvatar from "./ProfileAvatar";
import { IProfileData } from "../model/types";

export function ProfileInfo({
  profileData,
  children,
  OnEditProfile,
  optionButton,
}: IProfileData): ReactElement {

  const interstsList = profileData?.category_favorite.map(({ name }, id) => (
    <p className="flex flex-nowrap mr-[22px] text-indigo-600 text-lg font-semibold cursor-pointer" key={id}>
      {name}
    </p>
  ));

  return (
    <section className="flex-auto flex flex-col basis-5/12 h-[1100px]">
      <ProfileAvatar
        onEditProfile={OnEditProfile}
        image={profileData?.image}
        name={profileData?.username}
      />
      <p className="text-zinc-800 font-semibold text-[32px] mt-[20px]">
        {profileData?.firstName}&nbsp;{profileData?.lastName}
      </p>
      <div className="flex flex-row mt-[10px] cursor-pointer">
        <Svg
          id="location"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        />
        <div className="text-indigo-600 text-xl font-semibold ml-[8px]">
          {profileData?.city ? (
            profileData?.city
          ) : (
            <p className="text-zinc-400 text-[18px]">Укажите свой город</p>
          )}
        </div>
      </div>
      <div className="mt-[30px]">{children}</div>
      <p className="text-zinc-800 text-2xl font-semibold mt-[30px]">О себе</p>
      <div className="max-w-[414px] h-[115px] text-zinc-800 text-lg font-normal text-pretty text-ellipsis overflow-hidden mt-[12px]">
        {profileData?.bio ? (
          profileData?.bio
        ) : (
          <p className="text-zinc-400 text-[18px]">Расскажите о себе</p>
        )}
      </div>
      {interstsList?.length != 0 && (
        <>
          <p className="text-zinc-800 text-2xl font-semibold mt-[30px]">
            Интересы
          </p>
          <div className="flex flex-row-revers max-w-[414px] max-h-[115px] text-pretty text-ellipsis overflow-hidden mt-[14px]">
            {interstsList}
          </div>
        </>
      )}
      {optionButton && optionButton}
      <div className="flex mt-auto ">
        <BackButton />
      </div>
    </section>
  );
}
