import { ReactElement } from "react"
import { Link } from "react-router-dom";
import { useAppSelector } from "@/shared/model";
import { selectTabId } from "../model/formState";
import { DetailForm } from "./DetailForm";
import { PasswordForm } from "./PasswordForm";
import { CheckEmail } from "./CheckEmail";


export function RegisterMultiStepForm(): ReactElement {
  const selectedIndex = useAppSelector(selectTabId);

  const tabs = [
    <DetailForm/>,
    <PasswordForm/>,
    <CheckEmail/>
  ];

  const titles = [
    "Регистрация",
    "Регистрация",
    "Проверьте вашу почту",
  ]
 
  return (
    <div className="w-[500px] h-[600px] bg-white flex flex-col items-center justify-center px-90 pb-10 pt-102 rounded-2xl shadow-custom translate-x-10">
      <p className="text-main-purple text-40 font-bold text-center pb-60">
        { titles[selectedIndex] }
      </p>
      { tabs[selectedIndex] }
      <div className='flex mt-28 border-b border-b-neutral-500'>
        <p className='text-neutral-500 text-lg font-normal'>Уже есть аккаунт?&nbsp;</p>
        <Link className="text-neutral-500 hover:text-neutral-950 text-lg font-normal" to={"/login"}>Войти</Link>
      </div>
    </div>
  );
};
