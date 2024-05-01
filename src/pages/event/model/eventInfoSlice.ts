import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isParticipant?: boolean;
  isFavorite?: boolean;
}

const initialState: IInitialState = {
  isParticipant: false
}

const eventInfoSlice = createSlice({
  name: 'isParticipant',
  initialState,
  reducers: {
    isParticipantSetted: (state, { payload: isParticipant }: { payload: boolean | undefined }) => ({
      ...state, isParticipant
    }),
    isFavoriteSetted: (state, { payload: isFavorite }: { payload: boolean | undefined }) => ({
      ...state, isFavorite
    })
  }
})

export const { isParticipantSetted, isFavoriteSetted } = eventInfoSlice.actions;

export default eventInfoSlice;
