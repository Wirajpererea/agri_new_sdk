import React from "react";
import { Card } from "antd";
import "./clickableCard.scss";

const ClickableCard = ({
  children,
  style,
  onClickHandler,
  active,
  disabled,
}) => {
  return (
    <Card
      className={
        active
          ? `card-component build-model-tiles-active`
          : disabled
          ? "card-component build-model-tiles-disabled"
          : "card-component build-model-tiles"
      }
      style={style}
      onClick={!disabled ? onClickHandler : undefined}
    >
      {children}
    </Card>
  );
};

export default ClickableCard;