import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { trainDataApi, getModelTrainStatusApi } from "../services/services";
import { MessageAlert } from "../../../components";
import { connect } from "react-redux";
import configConstants from "../../../config/constants";

const TrainData = ({
  modelTrainStart,
  executionId,
  enableNext,
  modelTrainCompleted,
  selectedModelTypeData,
}) => {
  let interval = null;
  const [trainStartSuccess, setTrainStartSuccess] = useState(false);
  const [trainStartError, setTrainStartError] = useState(false);
  const [modelTrainStatus, setModelTrainStatus] = useState(null);
  const [estimateTime, setEstimateTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkTrainStartStage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, [interval]);

  useEffect(() => {
    if (modelTrainCompleted) {
      setTrainStartSuccess(true);
      setModelTrainStatus("complete");
    }
  }, [modelTrainCompleted]);

  const checkTrainStartStage = async () => {
    const response = await getModelTrainStatusApi({
      executionId: executionId.Value,
      modelId: selectedModelTypeData.ModelID,
    });
    if (response.data.body[0]["TrainStatus"] === 0) {
      setTrainStartSuccess(true);
      setEstimateTime(response.data.body[0].EstimateTime);
      setModelTrainStatus("buildProgressStatus");
      setLoading(false);
      startTrainStatusCheck();
    }
  };

  const startTrainData = async () => {
    const dataObj = {
      excutionId: executionId.Value,
      userId: selectedModelTypeData.UserID,
      sp: selectedModelTypeData.Sp_TrainStart,
      modelId: selectedModelTypeData.ModelID,
    };
    setLoading(true);
    try {
      const response = await trainDataApi(dataObj);
      const data = response.data.body;
      if (data.length > 0) {
        setTrainStartSuccess(true);
        setEstimateTime(data[0].EstimateTime);
        setModelTrainStatus("buildProgressStatus");
        setLoading(false);
        startTrainStatusCheck();
      }
    } catch (error) {
      setLoading(false);
      setTrainStartError(true);
    }
  };

  const startTrainStatusCheck = () => {
    interval = setInterval(() => {
      getModelTrainStatus();
    }, configConstants.apiTimeOut);
  };

  const getModelTrainStatus = async () => {
    try {
      const response = await getModelTrainStatusApi({
        executionId: executionId.Value,
        modelId: selectedModelTypeData.ModelID,
      });

      if (response.data.body[0]["TrainStatus"] === 1) {
        setTrainStartSuccess(true);
        setModelTrainStatus("complete");
        enableNext(true);
        clearInterval(interval);
      }

      if (response.data.body[0]["TrainStatus"] === 2) {
        setTrainStartSuccess(true);
        setModelTrainStatus("error");
        clearInterval(interval);
      }
    } catch (error) {
      setTrainStartSuccess(true);
      setModelTrainStatus("error");
      clearInterval(interval);
    }
  };

  return (
    <div className="model-build-container">
      <div className="form-container">
        <span className="header-section">Train Data</span>
        <span className="header-message">
          Training a model can take time. You can wait here and you will be
          prompted when complete. Or you can leave the platform and you will be
          emailed on completion, where you can continue from the same point.
        </span>

        {modelTrainStart && (
          <React.Fragment>
            <MessageAlert message={`Training started`} />

            {modelTrainStart && modelTrainStatus === "startStatus" && (
              <MessageAlert
                message={`This is the first time model has been built. 
              There are no estimated of how long it will take.
              The logged in user will be emailed once the data has completed training.`}
              />
            )}
          </React.Fragment>
        )}

        {modelTrainStatus === "startStatus" && (
          <MessageAlert
            message={`This is the first time model has been built. 
            There are no estimated of how long it will take.
            The logged in user will be emailed once the data has completed training.
            `}
            type={"warning"}
            customClass="long-msg"
          />
        )}

        {!trainStartSuccess && !trainStartError && (
          <React.Fragment>
            {!loading ? (
              <Button
                type="primary"
                htmlType="button"
                className={"form-submit-button active"}
                onClick={startTrainData}
              >
                Train Model
              </Button>
            ) : (
              <Spin spinning={loading} size="large" />
            )}
          </React.Fragment>
        )}

        {trainStartError && (
          <MessageAlert
            message={`Training start error
            `}
            type={"error"}
            customClass="error-msg"
          />
        )}

        {trainStartSuccess && (
          <React.Fragment>
            {!modelTrainCompleted && (
              <MessageAlert
                message={`Training started
            `}
                type={"success"}
                customClass="success-msg"
              />
            )}
            {(modelTrainStatus === "buildProgressStatus" ||
              modelTrainStatus === "complete") && (
              <MessageAlert
                message={`The logged in user will be emailed once the data has completed training.`}
                type={"warning"}
                customClass="long-msg"
              />
            )}

            {modelTrainStatus === "complete" && (
              <MessageAlert
                customClass="success-msg"
                message={`Training completed`}
                type={"success"}
              />
            )}

            {modelTrainStatus === "error" && (
              <MessageAlert
                customClass="error-msg"
                message={`Training data error`}
                type={"error"}
              />
            )}

            {modelTrainStatus === "buildProgressStatus" && (
              <MessageAlert
                message={estimateTime}
                type={"info"}
                customClass="success-msg"
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  executionId: state.modelBuildState.executionData,
  endResult: state.modelBuildState.EndResult,
  modelBuildStartStatus: state.modelBuildState.modelBuildStartStatus,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TrainData);
