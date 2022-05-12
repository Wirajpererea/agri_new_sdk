import React from "react";
import WarninigIcon from "../../assets/icons/warning.png";
import SuccessIcon from "../../assets/icons/success.png";
import ErrorIcon from "../../assets/icons/error-red.png";
import InfoIcon from "../../assets/icons/info.png";

const MessageAlert = ({ customClass, message,subMessage, type }) => {
  return (
    <div
      className={
        customClass ? `message-alert${" "}${customClass}` : "message-alert"
      }
    >
      {type === "success" && (
        <img src={SuccessIcon} alt="" className="message-icon" />
      )}

      {type === "warning" && (
        <img src={WarninigIcon} alt="" className="message-icon" />
      )}

      {type === "error" && (
        <img src={ErrorIcon} alt="" className="message-icon" />
      )}

      {type === "info" && (
        <img src={InfoIcon} alt="" className="message-icon info-icon" />
      )}
      <span className="message">{message}</span>
      {subMessage && <p className="error-desc">{subMessage}</p>}
    </div>
  );
};

export default MessageAlert;
