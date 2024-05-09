import { useLeaveFromEventMutation, useLikeEventMutation, useRegisterToEventMutation, useUnlikeEventMutation } from "@/entities/event/api/eventApi";
import { useAppDispatch } from "@/shared/model";
import { isFavoriteSetted, isParticipantSetted } from "../model/eventInfoSlice";

export function useEventActions(eventId: number) {
  const dispatch = useAppDispatch();
  const [registerToEvent] = useRegisterToEventMutation();
  const [leaveFromEvent] = useLeaveFromEventMutation();
  const [likeEvent] = useLikeEventMutation();
  const [unlikeEvent] = useUnlikeEventMutation();

  // In this responses I specifically change the state of the button without waiting
  // for response from the server to prevent delay when clicking
  const handleRegisterToEvent = () => {
    dispatch(isParticipantSetted(true));

    registerToEvent(eventId)
      .unwrap()
      .then(() => {return})
      .catch(() => dispatch(isParticipantSetted(false)));
  }

  const handleLeaveFromEvent = () => {
    dispatch(isParticipantSetted(false));

    leaveFromEvent(eventId)
      .unwrap()
      .then(() => {return})
      .catch(() => dispatch(isParticipantSetted(true)));
  }

  const handleLikeEvent = () => {
    dispatch(isFavoriteSetted(true));

    likeEvent(eventId)
      .unwrap()
      .then(() => {return})
      .catch(() => dispatch(isFavoriteSetted(false)));
  }

  const handleUnlikeEvent = () => {
    dispatch(isFavoriteSetted(false));

    unlikeEvent(eventId)
      .unwrap()
      .then(() => {return})
      .catch(() => dispatch(isFavoriteSetted(true)));
  }

  return { handleRegisterToEvent, handleLeaveFromEvent, handleLikeEvent, handleUnlikeEvent };
}
