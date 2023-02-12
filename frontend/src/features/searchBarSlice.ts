import { createSlice } from "@reduxjs/toolkit";

interface ISlice {
  searchEngaged: boolean
}

const initialState: ISlice = {
  searchEngaged: false,
}

const searchBarSlice = createSlice({
  name: 'searchBar',
  initialState,
  reducers: {
    beginSearch: (state) => {
      state.searchEngaged = true
    },
    endSearch: (state) => {
      state.searchEngaged = false
    },
  }
})

export const searchBarState = (state: any) => state.searchBar.searchEngaged
export const { beginSearch, endSearch } = searchBarSlice.actions;

export default searchBarSlice.reducer 