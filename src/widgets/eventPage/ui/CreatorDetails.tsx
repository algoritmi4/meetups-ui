import { IParticipant } from "@/entities/event/model/types";
import { Button } from "@/shared";
import Svg from "@/shared/ui/Svg";
import { ReactElement } from "react";

interface ICreatorDetails {
  creator: IParticipant;
}

export function CreatorDetails({creator}: ICreatorDetails): ReactElement {
  return (
    <section className="max-w-[1125px] h-[243px] mt-[90px] self-stretch text-xl leading-[1.3] text-text-black">
      <h2 className="text-[28px] font-semibold">
      Кто приглашает
      </h2>
      <div className="flex mt-7">
        <img className="h-[130px] w-[130px] rounded-circle" src={`https://storage.googleapis.com/meetups-dev/media/${creator.image_url}`} alt={`Аватар пользователя ${creator.username}`} />
        <div className="flex flex-col ml-10">
          <a className="underline text-[24px] font-semibold" href={`/profile/${creator.id}`}>{creator.username}</a>
          <p className="text-[18px] leading-[23px] mt-3.5">{creator.bio ?? "Тут могло быть ваше БИО но его поддержку еще не добавили =("}</p>
          <div className="flex mt-[22px]">
            <Button
              type="button"
              importance="primary"
              size="md"
            >Написать организатору</Button>
            <Button
              type="button"
              importance="secondary"
              size="md"
              extraClass="ml-5"
            >Подписаться</Button>
          </div>
        </div>
        <Svg id="dialog-bubble-icon" className="w-[182px] h-[182px] ml-auto"/>
      </div>
    </section>
  )
}
