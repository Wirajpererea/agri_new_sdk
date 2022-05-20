import React from 'react';
import { Steps } from 'antd';
import { connect } from 'react-redux';

const { Step } = Steps;

const LeftStepperPanel = ({
  currentActive,
  selectedModelTypeData,
  dataSource,
  stepperOnclick,
  modelSetupMaxStep
}) => {
  return (
    <div className="stepper-container">
      <h1 className="pipeline-name">{selectedModelTypeData.ModelName}</h1>
      <Steps
        className="custome-step"
        size="small"
        direction="vertical"
        current={currentActive}
        onChange={(step) =>{ 
          if(step <= modelSetupMaxStep){
            stepperOnclick(step);
          }
        }}
      >
        <Step title="Create Model" />
        <Step title="Build Dataset" />
        <Step title="Validate Data" />
        <Step title="Train/Test Model" />
        <Step title="Production Model" />
      </Steps>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modelSetupMaxStep: state.modelDataState.modelSetupMaxStep,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LeftStepperPanel);
