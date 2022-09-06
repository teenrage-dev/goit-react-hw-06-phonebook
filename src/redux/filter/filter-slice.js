import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'contacts',
  initialState: '',
  reducers: {
    setFilter: (_, { payload }) => payload,
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;
