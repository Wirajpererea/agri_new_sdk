import React from "react";
import { Steps } from "antd";
import "./Stepper.scss";

const { Step } = Steps;

const Stepper = ({ currentActive, selectedModelTypeData }) => {
  return (
    <div className="stepper-container">
      <h1>{selectedModelTypeData.ModelName}</h1>
      <Steps size="small" current={currentActive}>
        <Step title="Build Dataset" />
        <Step title="Validate Data" />
        <Step title="Train/Test Model" />
        <Step title="Production Model" />
      </Steps>
    </div>
  );
};

export default Stepper;
