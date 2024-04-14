import {RefreshToken} from "@/shared/model/types.ts";
import {useLogoutMutation} from "@/entities/session/api/sessionApi.ts";
import React from "react";
import {useNavigate} from "react-router-dom";


export function LogoutButton(token: RefreshToken) {
    const [logoutTrigger] = useLogoutMutation()
    const navigate = useNavigate();

    const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        e.preventDefault()
        logoutTrigger(token)
            .unwrap()
            .then(() => navigate('/'))
            .catch((error) => {
                throw new Error(error.data.details) 
            })
    }
  return (
    <div className="flex cursor-pointer w-[100%] hover:bg-slate-50" onClick={onConfirmLogout} >
      <div
        className={`bg-logout w-6 h-6 p-[2.40px] mr-[14px] justify-center items-center inline-flex`}
      >
        {" "}
      </div>
      <p className="text-zinc-600 text-[17px] font-['Mulish']">
        Выйти из профиля
      </p>
    </div>
  )
}
