import React from "react";
import { Space } from "antd";

import "./Space.scss";

const SpaceComponent = ({children, style}) => {
  return (
    <Space className="space-component" style={style} >
      {children}
    </Space>
  );
};

export default SpaceComponent;
