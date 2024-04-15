import { IParticipant } from "@/entities/event/model/types";
import { ReactElement } from "react";

interface ICreatorDetails {
    creator: IParticipant;
}

export function CreatorDetails({creator}: ICreatorDetails): ReactElement {

    const onSubscribe = () => {
        // TODO: subscribe on creator
    }
    const textToCreator = () => {
        // TODO: text to creator
    }
    return (
        <div className="w-full h-[234px] pr-4 pt-6 self-stretch text-xl font-normal leading-[1.3] text-neutral-800">
            <div className="text-neutral-800 text-[28px] mb-[28px] font-semibold">
            Кто приглашает
            </div>
            <div className="flex">
                <img className="image h-[120px] w-[120px] rounded-full mr-[40px]" src={creator.image_url}/>
                <div className="info">
                    <div className="mb-[14px]">
                        <a href={`/profile/${creator.id}`} style={{textDecoration: "underline"}}>{creator.username}</a>
                    </div>
                    <div>
                        <pre className="w-full font-normal text-neutral-800" style={{whiteSpace: "pre-wrap", fontFamily: "inherit"}}>{creator.bio || "Тут могло быть ваше БИО но его поддержку еще не добавили =("}</pre>
                    </div>
                </div>
            </div>
            <div className="actions flex space-x-[20px] ml-[162px] mt-[5px]">
                <button
                    className="flex flex-col justify-center w-[279px] h-[45px] rounded-[10px] text-white bg-main-purple font-semibold"
                    onClick={textToCreator}>Написать организатору
                </button>
                <button
                    className="w-[178px] h-[45px] rounded-[10px] text-main-purple bg-purple-light"
                    onClick={onSubscribe}>Подписаться</button>
            </div>
        </div>
    )
}
