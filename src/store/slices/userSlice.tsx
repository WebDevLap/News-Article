import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userSliceState = {
  name: string;
  role: string;
};
// : PayloadAction<userSliceState>
const initialState = {
  name: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserRole: (state, action) => {
      state.role = action.payload;
    }
  },
});
export const { setUserName,  setUserRole} = userSlice.actions;
export default userSlice.reducer;
