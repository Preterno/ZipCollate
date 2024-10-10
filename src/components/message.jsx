import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/custom-toast.css";
import { useAppContext } from "../context/AppContext";

function Message() {
  const { error } = useAppContext();

  useEffect(() => {
    if (error.hasError) {
      toast(error.message, {
        toastId: Date.now(),
      });
    }
  }, [error]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}

export default Message;
