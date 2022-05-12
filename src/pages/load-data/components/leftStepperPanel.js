import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

const LeftStepperPanel = ({
  currentActive,
  selectedModelTypeData,
  dataSource,
}) => {
  return (
    <div className="stepper-container">
      <h1 className="pipeline-name">{selectedModelTypeData.ModelName}</h1>
      <Steps
        className="custome-step"
        size="small"
        direction="vertical"
        current={currentActive}
      >
        <Step title="Data Pipe" />
        <Step title="Source" />
        {dataSource !== 'notebook' && <Step title="Destination" />}
        <Step title="Schedule" />
      </Steps>
    </div>
  );
};

export default LeftStepperPanel;
