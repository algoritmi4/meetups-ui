import { config } from "@/shared/config";
import { ReactElement } from "react";
import { IParticipant } from "../model/types";
import { IconButton } from "@/shared";
import { useNavigate } from "react-router-dom";

interface IParticipantCardProps {
  participant: IParticipant;
  isCurrentUserCard: boolean;
  isOwnerCard: boolean;
  isOwnerView: boolean;
  handleKickParticipant: (userId: number) => void;
  isKickLoading: boolean;
}

function ParticipantCard({
  participant,
  isCurrentUserCard,
  isOwnerCard,
  isOwnerView,
  handleKickParticipant,
  isKickLoading
}: IParticipantCardProps): ReactElement {
  const navigate = useNavigate();

  return (
    <figure className="flex items-center mt-3">
      <img
        onClick={() => navigate(`/profile/${participant.id}`)}
        src={`${config.BASE_IMAGE_URL}${participant.image_url}`}
        className="w-[50px] h-[50px] rounded-circle cursor-pointer"
        alt={`Аватар пользователя ${participant.username}`}
      />
      <figcaption
        onClick={() => navigate(`/profile/${participant.id}`)}
        className="ml-3 text-[18px] font-medium max-w-[300px] truncate cursor-pointer"
      >{participant.username}</figcaption>
      {
        isOwnerCard ? (
          <p className="ml-auto font-medium text-[rgb(143,143,143)]">Организатор</p>
        ) : isCurrentUserCard ? (
          <p className="ml-auto font-medium text-[rgb(143,143,143)]">Вы</p>
        ) : (
          <IconButton
            onClick={isOwnerView ? () => handleKickParticipant(participant.id) : undefined}
            iconId={isOwnerView ? "delete-person-icon" : "add-person-icon"}
            size="lg"
            importance={isOwnerView ? "primary-opposite" : "primary"}
            extraClass="ml-auto"
            disabled={isKickLoading}
          />
        )
      }
    </figure>
  )
}

export default ParticipantCard;
