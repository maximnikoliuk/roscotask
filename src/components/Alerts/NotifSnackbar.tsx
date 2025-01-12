import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { closeSnackbar } from '../../redux/sliceNotifs';

function NotifSnackbar() {
  const dispatch = useAppDispatch();
  const { notificationSnackbar } = useAppSelector(
    (state) => state.notifs,
  );

  useEffect(() => {
    if (notificationSnackbar.open) {
      const timer = setTimeout(() => {
        dispatch(closeSnackbar());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notificationSnackbar.open]);

  return (
    <Alert show={notificationSnackbar.open} variant={notificationSnackbar.variant}>
      {notificationSnackbar.message}
    </Alert>
  );
}

export default NotifSnackbar;
