import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isParticipant?: boolean;
  isFavorite: boolean;
  changedEvents: number[];
}

const initialState: IInitialState = {
  isParticipant: false,
  isFavorite: false,
  changedEvents: [] // list of events that were liked or disliked during this session. Needed to synchronize the states of likes at events(eventCard)
}

const eventInfoSlice = createSlice({
  name: 'isParticipant',
  initialState,
  reducers: {
    isParticipantSetted: (state, { payload: isParticipant }: { payload: boolean | undefined }) => ({
      ...state, isParticipant
    }),
    isFavoriteSetted: (state, { payload: isFavorite }: { payload: boolean }) => ({
      ...state, isFavorite
    }),
    eventChanged: (state, { payload: eventId }: { payload: number}) => {
      if (state.changedEvents.some((el) => el === eventId)) {
        return ({...state, changedEvents: state.changedEvents.filter((el) => el !== eventId)});
      } else {
        return ({...state, changedEvents: [...state.changedEvents, eventId]});
      }
    }
  }
})

export const { isParticipantSetted, isFavoriteSetted, eventChanged } = eventInfoSlice.actions;

export default eventInfoSlice;
