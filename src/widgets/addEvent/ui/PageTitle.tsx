import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function PageTitle(): ReactElement {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mt-14">
      <h1 className="text-[45px] text-text-black font-bold leading-normal">Cоздайте мероприятие</h1>
      <button onClick={() => navigate(-1)} className="flex items-center duration-150 hover:opacity-70">
        <div className="w-6 h-6 bg-chevron-left-purple bg-no-repeat bg-center"></div>
        <p className="text-button-purple text-[18px] font-semibold ml-2.5">Назад</p>
      </button>
    </div>
  )
}
