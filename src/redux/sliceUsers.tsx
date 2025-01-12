import { createSlice } from '@reduxjs/toolkit';
import { UserSliceType } from '../types/UsersTypes.tsx';

const initialState: UserSliceType = {
  userList: [],
  totalCount: 0
};

export const sliceUsers = createSlice({
  name: 'users',
  initialState: initialState as UserSliceType,
  reducers: {
    setUsers: (state, { payload }) => {
      state.userList = payload;
    },
    setTotalCount: (state, { payload }) => {
      state.totalCount = payload;
    },
    reset: () => initialState,
  },
});

export const {
  setUsers,
  setTotalCount,
} = sliceUsers.actions;

export default sliceUsers.reducer;
