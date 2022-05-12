import React from "react";
import { Card } from "antd";
import "./clickableCardAnalytics.scss";

const ClickableCardAnalytics = ({
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
          ? `card-component-analytics build-model-tiles-active analytics-card`
          : disabled
          ? "card-component-analytics build-model-tiles-disabled analytics-card"
          : "card-component-analytics build-model-tiles analytics-card"
      }
      style={style}
      onClick={!disabled ? onClickHandler : undefined}
    >
      {children}
    </Card>
  );
};

export default ClickableCardAnalytics;