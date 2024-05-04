import {combineReducers} from '@reduxjs/toolkit';
import {baseApi, jwtApi} from '@/shared/api';
import {SessionSlice} from "@/entities/session/model/slice";
import {registerFormSlice} from '@/features/authentication/registration/model/formState';
import { searchFilterSlice } from '@/features/searchFilter/model/SearchFilterSlice';
import addressControlSlice from '@/features/addressControl/model/addressControlSlice';
import filterPopupSlice from '@/features/searchFilter/model/filterPopupSlice';
import eventInfoSlice from '@/entities/event/model/eventInfoSlice';
import passwordPopupSlice from '@/features/security/model/passwordPopupSlice';

export const rootReducer = combineReducers({
  session: SessionSlice.reducer,
  searchFilter: searchFilterSlice.reducer,
  eventInfo: eventInfoSlice.reducer,
  addressControl: addressControlSlice.reducer,

  filterPopup: filterPopupSlice.reducer,
  passwordPopup: passwordPopupSlice.reducer,

  [baseApi.reducerPath]: baseApi.reducer,
  [jwtApi.reducerPath]: jwtApi.reducer,
  [registerFormSlice.name]: registerFormSlice.reducer,
})
