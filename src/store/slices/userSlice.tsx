import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userSliceState = {
  name: string;
  role: number;
  verified: boolean;
};
const initialState: userSliceState = {
  name: '',
  role: 0,
  verified: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setUserRole: (state, action: PayloadAction<number>) => {
      state.role = action.payload;
    },
    setUserVerified: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    }
  },
});
export const { setUserName,  setUserRole, setUserVerified} = userSlice.actions;
export default userSlice.reducer;
