import React, { useState, useEffect } from "react";
import { CheckCircle, ErrorOutline, Close } from "@mui/icons-material";

const AlertComponent = ({ type = "success", message = "Operation successful!", duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 text-white text-sm transition-all duration-500
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
      ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
    >
      {type === "success" ? <CheckCircle fontSize="small" /> : <ErrorOutline fontSize="small" />}
      <span>{message}</span>
      <button onClick={() => setVisible(false)} className="ml-auto">
        <Close fontSize="small" />
      </button>
    </div>
  );
};

export default AlertComponent;
