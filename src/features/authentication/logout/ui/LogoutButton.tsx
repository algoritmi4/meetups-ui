import { RefreshToken } from "@/shared/model/types.ts";
import { useLogoutMutation } from "@/entities/session/api/sessionApi.ts";
import { useNavigate } from "react-router-dom";
import Svg from "@/shared/ui/Svg";
import { MouseEvent } from "react";

export function LogoutButton(token: RefreshToken) {
  const navigate = useNavigate();

  const [logoutTrigger] = useLogoutMutation();

  const onConfirmLogout = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    logoutTrigger(token)
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => console.log(error));
  };

  return (
    <div
      className="flex cursor-pointer w-[100%] hover:bg-slate-50"
      onClick={onConfirmLogout}
    >
       <div className="flex">
            <Svg
              id="bm-logout"
              className="w-6 h-6 mr-[14px] object-cover"
              viewBox="0 0 24 24"
              fill="none"
            />
        </div>
      <p className="text-zinc-600 text-[17px] font-['Mulish']">
        Выйти из профиля
      </p>
    </div>
  );
}
