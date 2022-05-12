import React from "react";
import { Tooltip } from "antd";

const ToolTip = ({ toolTip, children }) => {
  return (
    <Tooltip title={toolTip}>
      {children}
    </Tooltip>
  );
};

export default ToolTip;
