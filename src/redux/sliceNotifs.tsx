import { createSlice } from '@reduxjs/toolkit';
import { SnackbarSlice } from '../types/misc';

const initialState: SnackbarSlice = {
  notificationSnackbar: {
    open: false,
    variant: 'success',
    message: '',
  }
};

export const sliceNotifs = createSlice({
  name: 'notif',
  initialState: initialState as SnackbarSlice,
  reducers: {
    showSnackbar: (state, { payload }) => {
      state.notificationSnackbar = {
        ...payload,
        open: true
      };
    },
    closeSnackbar: () => initialState,
  },
});

export const {
  showSnackbar,
  closeSnackbar
} = sliceNotifs.actions;

export default sliceNotifs.reducer;
