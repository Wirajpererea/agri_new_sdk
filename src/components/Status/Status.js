import React from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

import { Space } from "..";

import "./Status.scss";

const StatusComponent = ({ children, style, result, message }) => {
  return (
    <div
      className="connection-status-item"
      stlye={{ display: "none", margin: 100 }}
    >
      <Space>
        {result === true ? (
          <CheckCircleFilled style={{ color: "#52c41a", fontSize: 19 }} />
        ) : (
          <CloseCircleFilled style={{ color: "#EB3A4B", fontSize: 19 }} />
        )}
        <div className="connection-status-result">{message}</div>
      </Space>
    </div>
  );
};

export default StatusComponent;
