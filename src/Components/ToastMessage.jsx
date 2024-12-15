import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = ({
  show,
  onClose,
  message,
  variant = 'danger',
  delay = 6000
}) => {
  const title = variant === 'success' ? 'Success' : 'Error';

  const toastOptions = {
    position: 'bottom-right',
    autoClose: delay,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClose: onClose,
    theme: 'colored'
  };

  useEffect(() => {
    if (show) {
      if (variant === 'success') {
        toast.success(`${title}: ${message}`, toastOptions);
      } else {
        toast.error(`${title}: ${message}`, toastOptions);
      }
    }
  }, [show, message, variant]);

  return <ToastContainer />;
};

export default ToastMessage;