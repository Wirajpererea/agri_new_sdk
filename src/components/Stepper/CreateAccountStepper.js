import React from "react";
import { Steps } from "antd";
import "./Stepper.scss";

const { Step } = Steps;

const CreateAccountStepper = ({ currentActive }) => {
  return (
    <div className="stepper-container">
      <Steps size="small" current={currentActive}>
        <Step title="Add your licence" />
        <Step title="Add your details" />
        <Step title="Setup your connection" />
      </Steps>
    </div>
  );
};

export default CreateAccountStepper;
