import React from "react";
import { Card } from "antd";

import "./CardComponent.scss";

const CardComponent = ({ customClass, children, style }) => {
  
  return (
    <Card
      className={
        customClass ? `card-component${" "}${customClass}` : "card-component"
      }
      style={style}
    >
      {children}
    </Card>
  );
};

export default CardComponent;
