import React, { useState, useEffect } from "react";
import { Button, Spin } from "antd";
import { trainCompleteDataApi } from "../services/services";
import { MessageAlert } from "../../../components";
import DataDisplaySectonTesting from "./dataDisplay-section-testing";
import { connect } from "react-redux";

const TrainComplete = ({
  executionId,
  enableNext,
  selectedModelTypeData,
  loadTrainCompleteData,
}) => {
  const [testDataState, setTestDataState] = useState([]);
  const [trainCompletDataSuccess, setTrainCompletDataSuccess] = useState(false);
  const [trainCompletDataError, setTrainCompletDataError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loadTrainCompleteData) {
      getTrainedTestData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTrainCompleteData, loadTrainCompleteData]);

  const getTrainedTestData = async () => {
    const dataObj = {
      excutionId: executionId.Value,
      userId: selectedModelTypeData.UserID,
      sp: selectedModelTypeData.Sp_TrainComplete,
      modelId: selectedModelTypeData.ModelID,
    };
    setLoading(true);
    try {
      const response = await trainCompleteDataApi(dataObj);
      const data = response.data.body;
      if (response) {
        setTrainCompletDataSuccess(true);
        setTestDataState(data);
        setLoading(false);
        enableNext(true);
      }
    } catch (error) {
      setLoading(false);
      setTrainCompletDataError(true);
    }
  };

  return (
    <div className="model-build-container">
      <div className="form-container">
        <span className="header-section">
          {trainCompletDataSuccess || loadTrainCompleteData
            ? "Test Data"
            : "Training complete"}
        </span>
        {/* <span className="header-message">
          Select proprtion of data to test as from above
        </span> */}
        {!trainCompletDataSuccess && !trainCompletDataError && (
          <React.Fragment>
            {!loading ? (
              <Button
                type="primary"
                htmlType="submit"
                className={"form-submit-button active"}
                onClick={getTrainedTestData}
              >
                Test Data
                {/* {!loading ? "Validate Data" : "Validating..."} */}
              </Button>
            ) : (
              <Spin spinning={loading} size="large" />
            )}
          </React.Fragment>
        )}
        {trainCompletDataSuccess && (
          <React.Fragment>
            <MessageAlert
              message={`Test Data Completed
            `}
              type={"success"}
              customClass="success-msg"
            />
            {testDataState.length > 0 && (
              <DataDisplaySectonTesting
                testData={testDataState.length > 0 ? testDataState[0] : []}
              />
            )}
            <span className="data-accuracy">
              {testDataState.length > 0 && testDataState[0]["testDataSummary"]}
            </span>
          </React.Fragment>
        )}

        {trainCompletDataError && (
          <React.Fragment>
            <MessageAlert
              message={`Test data loading error
              `}
              type={"error"}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(TrainComplete);
