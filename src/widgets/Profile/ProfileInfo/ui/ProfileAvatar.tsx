import { ReactElement } from "react";
import { IProfileAvatar } from "../model/types";

function ProfileAvatar({
  onEditProfile,
  image,
  name,
}: IProfileAvatar): ReactElement {
  return (
    <div
      onClick={onEditProfile}
      className={`flex w-[250px] h-[250px] mt-[56px] rounded-[200px] opacity-100 shadow border border-stone-300 place-content-center ${
        onEditProfile &&
        "cursor-pointer bg-neutral-800 bg-edit-photo bg-no-repeat bg-center"
      }`}
    >
      <img
        className={`w-[236px] h-[236px] bg-opacity-40 rounded-[200px] pointer-events-none self-center ${
          onEditProfile && "hover:opacity-60 pointer-events-auto duration-150"
        }`}
        src={`https://storage.googleapis.com/meetups-dev/media/${image}`}
        alt={`Аватар пользователя ${name}`}
      />
    </div>
  );
}

export default ProfileAvatar;
