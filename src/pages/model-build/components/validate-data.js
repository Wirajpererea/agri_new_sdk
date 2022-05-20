import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import { validateDataApi } from '../services/services';
import { connect } from 'react-redux';
import { MessageAlert } from '../../../components';
import DataDisplaySectonValidating from './dataDisplay-section-validating';

const ValidateData = ({
  enableNext,
  executionId,
  selectedModelTypeData,
  setPreviousButtonEnable,
}) => {
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [validateError, setValidateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationData, setValidationData] = useState(null);

  const validateDataFn = async () => {
    const dataObj = {
      excutionId: executionId.Value,
      userId: selectedModelTypeData.UserID,
      sp: selectedModelTypeData.Sp_Validate,
      modelId: selectedModelTypeData.ModelID,
    };
    setLoading(true);
    try {
      const response = await validateDataApi(dataObj);
      const data = response.data.body[0];
      setValidationData(data);
      if (data.Value && data.TaskOutput.TaskOutput === 'Success') {
        setValidateSuccess(true);
        setLoading(false);
        enableNext(true);
      } else {
        setLoading(false);
        setValidateError(true);
        setPreviousButtonEnable(true);
      }
    } catch (error) {
      setLoading(false);
      setValidateError(true);
      setPreviousButtonEnable(true);
    }
  };

  return (
    <div className="model-build-container">
      <div className="form-container">
        <span className="header-section">Data Validation</span>
        <span className="header-message">
          This step highlights any data issues before training your model. Any
          data failures will need to be fixed in the data before moving to the
          next stage
        </span>
        {!validateSuccess && !validateError && (
          <React.Fragment>
            {!loading ? (
              <Button
                type="primary"
                htmlType="submit"
                className={'form-submit-button active'}
                onClick={validateDataFn}
              >
                Validate Data
                {/* {!loading ? "Validate Data" : "Validating..."} */}
              </Button>
            ) : (
              <Spin spinning={loading} size="large" />
            )}
          </React.Fragment>
        )}

        {validateSuccess && (
          <React.Fragment>
            <MessageAlert
              message={
                validationData
                  ? validationData.TaskOutput.TaskOutputDescription
                  : 'Server error'
              }
              type={'success'}
              customClass="success-msg"
            />
            <DataDisplaySectonValidating validationData={validationData} />
          </React.Fragment>
        )}

        {validateError && (
          <React.Fragment>
            <MessageAlert
              message={
                validationData
                  ? validationData.TaskOutput.TaskOutputDescription
                  : 'Server error'
              }
              type={'error'}
            />
            <DataDisplaySectonValidating validationData={validationData} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ValidateData);
