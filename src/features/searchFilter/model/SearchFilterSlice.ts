import { createSlice } from "@reduxjs/toolkit";

interface IGlobalFilterState {
  search: string;
  checkedCategories: number[];
}

const initialState: IGlobalFilterState = {
  search: '',
  checkedCategories: []
}

export const searchFilterSlice = createSlice({
  name: 'searchFilter',
  initialState,
  reducers: {
    setSearchFilter: (state, { payload: inputValue }: { payload: string }) => ({
      ...state, search: inputValue,
    }),
    categorySetted: (state, { payload: checkedCategories }: { payload: number[] }) => ({
      ...state, checkedCategories
    })
  }
})

export const { setSearchFilter, categorySetted } = searchFilterSlice.actions;
