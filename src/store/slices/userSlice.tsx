import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserDataLS } from '../../utils/getUserDataLS';

type userSliceState = {
  name: string;
  role: number;
  verified: boolean;
  allRoles: string[];
};

const initialState: userSliceState = {
  name: getUserDataLS('userName', ''),
  role: getUserDataLS('userRole', 0),
  verified: getUserDataLS('userVerified', false),
  allRoles: [
    'Не авторизованный',
    'Пользователь',
    'Писатель',
    'Модератор',
    'Адменистратор',
    'Главный админестратор',
  ],
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
    },
  },
});
export const { setUserName, setUserRole, setUserVerified } = userSlice.actions;
export default userSlice.reducer;
