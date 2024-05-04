import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false
}

const passwordPopupSlice = createSlice({
  name: 'passwordPopup',
  initialState,
  reducers: {
    passwordPopupSetted: (state, { payload: isOpen }: { payload: boolean }) => ({
      ...state, isOpen
    })
  }
})

export const { passwordPopupSetted } = passwordPopupSlice.actions;

export default passwordPopupSlice;
