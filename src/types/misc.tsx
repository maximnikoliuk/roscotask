import { Variant } from "react-bootstrap/types";

export type SnackbarProps = {
  open: boolean;
  variant: Variant;
  message: string;
}

export type SnackbarSlice = {
  notificationSnackbar: SnackbarProps
}

export type Post = {
  id: string;
  created_time: string;
}
