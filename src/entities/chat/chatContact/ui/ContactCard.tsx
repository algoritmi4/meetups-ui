import { ReactElement } from "react";
import { IContact } from "../model/types";

interface IContactCard {
  data: IContact;
}

function ContactCard({ data }: IContactCard): ReactElement {
  return (
    <div className="flex pr-[11px]">
      <img className="rounded-circle w-[70px] h-[70px]" src={data.img} alt={`Аватар пользователя ${data.name}`} />
      <div className="w-full flex flex-col ml-[22px] mt-2.5">
        <div className="flex w-full justify-between">
          <h3 className="text-text-black text-[18px] font-medium leading-[23px] truncate max-w-[230px]">{data.name}</h3>
          <p className="text-[14px] text-placeholder-gray">{data.lastMessageDate}</p>
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <p className="text-[14px] text-[#616161] leading-[18px] truncate max-w-[280px]">{data.lastMessage}</p>
          <div className="rounded-circle bg-but-primary w-4 h-4 flex items-center justify-center text-white text-[12px]">{data.messagesQuant}</div>
        </div>
      </div>
    </div>
  )
}

export default ContactCard;
