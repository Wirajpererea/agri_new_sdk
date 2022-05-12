import React, { useState, useEffect } from "react";
import "./model-build.scss";
import { Card, Stepper } from "../../components";
import { connect } from "react-redux";
import {
  resetModelBuild,
  setExistingModelBuild,
  setCurrrentModelBuildStageAction,
} from "./actions/modelBuild-action";

import BuildTraning from "./components/build-traning";
import ValidateData from "./components/validate-data";
import TrainData from "./components/train-data";
import TrainComplete from "./components/train-complete";
import SheduleBuild from "./components/shedule-build";
import ActionFooter from "./components/action-footer";

import LogOutput from "./components/log-output";

import { CheckCircleFilled } from "@ant-design/icons";
import { buildModelDataLogsApi } from "./services/services";

const ModelBuild = ({
  selectedModelTypeData,
  resetModelBuild,
  executionId,
  setExistingModelBuild,
  setModelBuildStage,
  modelBuildStage,
}) => {
  const [currentActive, setCurrentActive] = useState(modelBuildStage);
  const [modelTrainStart, setModelTrainStart] = useState(false);
  const [nextButtonEnable, setNextButtonEnable] = useState(false);
  const [previousButtonEnable, setPreviousButtonEnable] = useState(false);
  const [modalBuildFinished, setModalBuildFinished] = useState(false);
  const [modelTrainCompleted, setModelTrainCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [logOutPut, setLogOutPut] = useState([]);
  const [loadTrainCompleteData, setLoadTrainCompleteData] = useState(false);
  const statgeArray = ["Build", "Validate", "Train", "Train", "BuildPipeLine"];
  useEffect(() => {
    return () => {
      setModelBuildStage(0);
    };
  }, [setModelBuildStage]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("executionId") && params.has("buildType")) {
      const executionId = parseInt(params.get("executionId"));
      const executionStage = parseInt(params.get("buildType"));
      if (executionStage === 4) {
        setNextButtonEnable(true);
        setLoadTrainCompleteData(true);
        setModelBuildStage(executionStage - 1);
        setCurrentActive(executionStage - 1);
      }
      if (executionStage === 3) {
        setNextButtonEnable(false);
        setModelBuildStage(executionStage);
        setCurrentActive(executionStage);
      }
      if (executionStage === 2) {
        setNextButtonEnable(false);
        setModelBuildStage(executionStage);
        setCurrentActive(executionStage);
      }

      setExistingModelBuild({ Value: executionId });
    }
  }, [setExistingModelBuild, setModelBuildStage]);

  const startTrainData = () => {
    setModelTrainStart(true);
  };

  const enableNext = (status) => {
    setNextButtonEnable(status);
  };

  const loadNextStage = () => {
    const nexStage = currentActive + 1;
    setCurrentActive(nexStage);
    setModelBuildStage(nexStage);
    setNextButtonEnable(false);
  };

  const loadPreviousStage = () => {
    const nexStage = currentActive - 1;
    if (nexStage === 0) {
      resetModelBuild();
    }
    setModelBuildStage(nexStage);
    setCurrentActive(nexStage);
    setNextButtonEnable(false);
    setPreviousButtonEnable(false);
  };

  const modalBuildFinishHandler = () => {
    setModalBuildFinished(true);
  };

  const handleLogOutput = async () => {
    const currentStage = statgeArray[currentActive];
    const data = {
      userId: selectedModelTypeData.UserID,
      modelId: selectedModelTypeData.ModelID,
      executionId: executionId.Value,
      excutionStep: currentStage,
    };
    const response = await buildModelDataLogsApi(data);
    setLogOutPut(response.data.body);
    setModalVisible(true);
  };

  return (
    <Card customClass="model-build-card build-wizard">
      {!modalBuildFinished && (
        <React.Fragment>
          <Stepper
            currentActive={currentActive}
            selectedModelTypeData={selectedModelTypeData}
          />
          {currentActive === 0 && (
            <BuildTraning
              enableNext={enableNext}
              selectedModelTypeData={selectedModelTypeData}
            />
          )}
          {currentActive === 1 && (
            <ValidateData
              enableNext={enableNext}
              selectedModelTypeData={selectedModelTypeData}
              setPreviousButtonEnable={setPreviousButtonEnable}
            />
          )}
          {currentActive === 2 && (
            <TrainData
              startTrainData={startTrainData}
              modelTrainStart={modelTrainStart}
              enableNext={enableNext}
              selectedModelTypeData={selectedModelTypeData}
              setPreviousButtonEnable={setPreviousButtonEnable}
              modelTrainCompleted={modelTrainCompleted}
            />
          )}
          {currentActive === 3 && (
            <TrainComplete
              enableNext={enableNext}
              selectedModelTypeData={selectedModelTypeData}
              setPreviousButtonEnable={setPreviousButtonEnable}
              loadTrainCompleteData={loadTrainCompleteData}
            />
          )}
          {currentActive === 4 && (
            <SheduleBuild
              modalBuildFinished={modalBuildFinishHandler}
              selectedModelTypeData={selectedModelTypeData}
            />
          )}
          <ActionFooter
            nextButtonEnable={nextButtonEnable}
            previousButtonEnable={previousButtonEnable}
            loadNextStage={loadNextStage}
            currentActive={currentActive}
            loadPreviousStage={loadPreviousStage}
            handleLogOutput={handleLogOutput}
            executionId={executionId}
          />
        </React.Fragment>
      )}
      {executionId && (
        <LogOutput
          modalVisible={modalVisible}
          width={900}
          customClass={"shedule-modal"}
          handleCancel={() => setModalVisible(false)}
          logOutPut={logOutPut}
          // dataSource={dataSource}
        />
      )}
      {modalBuildFinished && (
        <div className="model-build-finished-container">
          <div className="model-build-finished-area">
            <span className="success-icon">
              <CheckCircleFilled />
            </span>
            <div className="success-message">
              <span className="main-message">
                Great, your model is saved and scheduled
              </span>
              <span className="sub-message">
                You can edit it in Models section after.
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => ({
  selectedModelTypeData: state.globleState.selectedModelTypeData,
  executionId: state.modelBuildState.executionData,
  userData: state.mainViewState.userData,
  modelBuildStage: state.modelBuildState.modelBuildStage,
});

const mapDispatchToProps = (dispatch) => ({
  resetModelBuild: () => dispatch(resetModelBuild()),
  setExistingModelBuild: (payload) => dispatch(setExistingModelBuild(payload)),
  setModelBuildStage: (payload) =>
    dispatch(setCurrrentModelBuildStageAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelBuild);
