import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMailFromLS } from '../../utils/getMailFromLS';

type userSliceState = {
  name: string;
  role: number;
  verified: boolean;
  allRoles: string[];
};

const initialState: userSliceState = {
  name: '',
  role: 0,
  verified: false,
  allRoles: [
    'Не авторизованный',
    'Пользователь',
    'Писатель',
    'Модератор',
    'Адменистратор',
    'Главный адменистратор',
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
    userExit: (state) => {
      state.name = ''
      state.role = 0
      state.verified = false

    }
  },
});
export const { setUserName, setUserRole, setUserVerified, userExit } = userSlice.actions;
export default userSlice.reducer;
