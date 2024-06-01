import { Button } from "@/shared";
import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileButton } from "./ProfileButton";

export function Menu(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex max-h-[50px]"> 
      <Button
        type="button"
        size="sm"
        importance={location.pathname === '/event/add' ? "secondary" : "primary"}
        extraClass="self-center"
        onClick={() => navigate('/event/add')}
      >Создать</Button>
      <ProfileButton />
    </div>
  )
}
