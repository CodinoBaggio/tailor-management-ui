import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {},
};

export const userSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
