import { ReactElement } from "react";

interface IProfileAvatar {
  onEditProfile?: () => void;
  image?: string;
  name?: string;
}

function ProfileAvatar({
  onEditProfile,
  image,
  name,
}: IProfileAvatar): ReactElement {
  return (
    <div
      onClick={onEditProfile}
      className={`w-[270px] h-[270px] mt-[56px] rounded-[200px] opacity-100 ${
        onEditProfile &&
        "cursor-pointer bg-neutral-800 bg-edit-photo bg-no-repeat bg-center"
      }`}
    >
      <img
        className={`bg-neutral-800 bg-opacity-40 rounded-[200px] pointer-events-none border border-neutral-200 ${
          onEditProfile && "hover:opacity-60 pointer-events-auto duration-150"
        }`}
        src={`https://storage.googleapis.com/meetups-dev/media/${image}`}
        alt={`Аватар пользователя ${name}`}
      />
    </div>
  );
}

export default ProfileAvatar;
