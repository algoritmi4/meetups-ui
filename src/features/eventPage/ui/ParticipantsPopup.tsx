import {IconButton, Input, Popup} from "@/shared";
import {ChangeEvent, ReactElement, useContext, useState} from "react";
import {IParticipant} from "@/entities/event/model/types";
import Svg from "@/shared/ui/Svg";
import {config} from "@/shared/config";
import {EventPageContext} from "@/pages/event/model/EventPageContext";
import {useGetEventParticipantsQuery} from "@/entities/event/api/eventApi.ts";

interface IParticipantsPopupProps {
  eventId: number;
  owner: IParticipant
  isOpen: boolean;
  handleClose: () => void;
}

export function ParticipantsPopup({ eventId, owner, isOpen, handleClose }: IParticipantsPopupProps): ReactElement {
  const [inputValue, setInputValue] = useState('');
  const isOwner = useContext(EventPageContext);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const {
    data: eventParticipants = [],
    isLoading: isParticipantsLoading,
    isError: isParticipantsError,
    error: participantsError
  } = useGetEventParticipantsQuery(eventId);
  let participants: IParticipant[] = [owner, ...eventParticipants];
  const filteredParticipants = participants.filter((el) => el.username.toLocaleLowerCase().includes(inputValue.toLowerCase()));
  isParticipantsError && console.log(`Ошибка при получении участников - ${JSON.stringify(participantsError)}`);

  return (
    <Popup isOpen={isOpen} onClose={handleClose}>
      <div className="absolute flex flex-col top-[100px] left-[50%] translate-x-[-50%] bg-white min-w-[584px] rounded-[10px] px-[45px] py-[35px]">
      <Svg onClick={handleClose} id="close-cross" className="absolute top-[42px] right-[45px] w-6 h-6 cursor-pointer duration-150 hoverscreen:hover:opacity-70" />
        <div className="flex items-center">
          <h2 className="text-[30px] font-semibold">Список участников</h2>
          <Svg id="person-quantity-icon" className="w-8 h-8 ml-3" />
        </div>
        <Input
          size="lg"
          head={<Svg id="search-icon-def" className="w-6 h-6" />}
          className="mt-5 max-w-[470px]"
          extraInputClass="pl-3 placeholder:!text-placeholder-gray"
          placeholder="Поиск участников"
          value={inputValue}
          onChange={handleInputValue}
        />
        <p className="mt-3 font-semibold">{`Всего идёт: ${participants.length}`}</p>
        <div className="max-h-[372px] overflow-y-auto pr-[22px] rounded-l-[20px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#F3F3F5] [&::-webkit-scrollbar-track]:rounded-[10px] [&::-webkit-scrollbar-thumb]:bg-text-light-gray [&::-webkit-scrollbar-thumb]:rounded-[10px]">
          {
            filteredParticipants.map((el, index) => (
              <figure key={index} className="flex items-center mt-3">
                <img src={`${config.BASE_IMAGE_URL}${el.image_url}`} className="w-[50px] h-[50px] rounded-circle" alt={`Аватар пользователя ${el.username}`} />
                <figcaption className="ml-3 text-[18px] font-medium">{el.username}</figcaption>
                {
                  index === 0 ? (
                    <p className="ml-auto font-medium text-[rgb(143,143,143)]">Организатор</p>
                  ) : (
                    <IconButton
                      iconId={isOwner ? "delete-person-icon" : "add-person-icon"}
                      size="lg"
                      importance={isOwner ? "primary-opposite" : "primary"}
                      extraClass="ml-auto"
                    />
                  )
                }
              </figure>
            ))
          }
        </div>
      </div>
    </Popup>
  )
}
