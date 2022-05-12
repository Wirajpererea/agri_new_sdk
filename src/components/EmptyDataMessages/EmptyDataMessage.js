import React from "react";
import "./EmptyDataMessage.scss";

const EmptyDataMessage = ({ dataType }) => {
  return (
    <div className="empty-data-container">
      <span>{dataType} not available</span>
    </div>
  );
};

export default EmptyDataMessage;
