import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProfileAvatar {
  image: string;
  name: string;
}

function ProfileAvatar({
  image,
  name,
}: IProfileAvatar): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentUser = location.pathname === '/profile/me';

  return (
    <div
      onClick={isCurrentUser ? () => navigate('/profile/edit') : undefined}
      className={`flex w-[250px] h-[250px] mt-[56px] rounded-circle shadow border border-select-disable place-content-center`}
    >
      <div
        className={`relative w-[236px] h-[236px] bg-opacity-40 rounded-circle self-center ${
          isCurrentUser ?
          "cursor-pointer before:bg-edit-photo before:bg-no-repeat before:bg-center before:absolute before:inset-0 before:bg-edit-profile-shadow before:rounded-circle before:opacity-0 before:hoverscreen:hover:opacity-100 before:z-50 before:duration-150" : ''
        }`}
      >
        <img
          className="rounded-circle"
          src={`https://storage.googleapis.com/meetups-dev/media/${image}`}
          alt={`Аватар пользователя ${name}`}
        />
      </div>
    </div>
  );
}

export default ProfileAvatar;
