import { createSlice } from "@reduxjs/toolkit";

interface IGlobalFilterState {
  search: string;
  checkedCategories: number[];
  startDate: string;
  endDate: string;
  startDateGTE: string;
}

const initialState: IGlobalFilterState = {
  search: "",
  checkedCategories: [],
  startDate: "",
  endDate: "",
  startDateGTE: "",
};

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    setSearchFilter: (state, { payload: inputValue }: { payload: string }) => ({
      ...state,
      search: inputValue,
    }),
    categorySetted: (
      state,
      { payload: checkedCategories }: { payload: number[] }
    ) => ({
      ...state,
      checkedCategories,
    }),
    startDateSetted: (state, { payload: startDate }: { payload: string }) => ({
      ...state,
      startDate: startDate,
    }),
    startDateGTESetted: (
      state,
      { payload: startDateGTE }: { payload: string }
    ) => ({
      ...state,
      startDateGTE: startDateGTE,
    }),
    endDateSetted: (state, { payload: endDate }: { payload: string }) => ({
      ...state,
      endDate: endDate,
    }),
  },
});

export const {
  setSearchFilter,
  categorySetted,
  startDateSetted,
  endDateSetted,
  startDateGTESetted,
} = searchFilterSlice.actions;
