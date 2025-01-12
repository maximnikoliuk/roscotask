import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import sliceUsers from "./sliceUsers";
import sliceNotifs from "./sliceNotifs.tsx";

export const store = configureStore({
  reducer: combineReducers({
    users: sliceUsers,
    notifs: sliceNotifs,
  }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
