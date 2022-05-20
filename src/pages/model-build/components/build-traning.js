import React, { useState, useEffect } from "react";
import { Form, Button, Spin, DatePicker } from "antd";
import { MessageAlert } from "../../../components";
import { connect } from "react-redux";
import { startBuildModelAction } from "../actions/modelBuild-action";
import DataDisplaySecton from "./dataDisplay-section-validating";

const FormItem = Form.Item;

const BuildTraning = ({
  enableNext,
  startBuildModel,
  modelBuildStartStatus,
  selectedModelTypeData,
  userData,
}) => {
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateValueError, setDateValueError] = useState(false);

  useEffect(() => {
    enableNext(modelBuildStartStatus === "success" ? true : false);
  }, [enableNext, modelBuildStartStatus]);

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    if (formDataField === "startDate") {
      const startDateVal = values[0]["value"].format("YYYY-MM-DD HH:mm:ss");
      setStartDate(startDateVal);
    }
    if (formDataField === "endDate") {
      const endDateVal = values[0]["value"].format("YYYY-MM-DD HH:mm:ss");
      setEndDate(endDateVal);
    }

    if (startDate && endDate && startDate < endDate) {
      setDateValueError(false);
      setActiveButton(true);
    } else {
      if (startDate > endDate) {
        setDateValueError(true);
      }
      setActiveButton(false);
    }
  };

  const startModel = async (dateObj) => {
    const startDate = dateObj["startDate"].format("YYYY-MM-DD HH:mm:ss");
    const endDate = dateObj["endDate"].format("YYYY-MM-DD HH:mm:ss");
    const dataObj = {
      startDate: startDate,
      endDate: endDate,
      userId: selectedModelTypeData.UserID,
      sp: selectedModelTypeData.Sp_Build,
      modelId: selectedModelTypeData.ModelID,
    };
    startBuildModel(dataObj);
  };

  return (
    <div className="model-build-container">
      <div className="form-container">
        <MessageAlert
          message={`Model build under ${userData.FirstName}${" "}${
            userData.LastName
          }. All emails will go to this user.`}
          type={"warning"}
        />
        <span className="header-section">Build Training Dataset</span>
        <span className="header-message">
          The larger the dataset, the more data the model has when training.
          Please keep in mind larger datasets take longer to train.
        </span>
        <Form
          ref={form}
          onFinish={startModel}
          onFieldsChange={onFieldsChange}
          className="build-form"
        >
          <FormItem
            className={
              !dateValueError
                ? "build-input-item-start"
                : "build-input-item-start error"
            }
            name="startDate"
            rules={[
              {
                required: true,
              },
            ]}
            label="Start"
          >
            <DatePicker placeholder={"Start"} autocomplete="off" />
          </FormItem>
          <FormItem
            className={
              !dateValueError
                ? "build-input-item-end"
                : "build-input-item-end error"
            }
            name="endDate"
            rules={[
              {
                required: true,
              },
            ]}
            label="End"
          >
            <DatePicker placeholder={"End"} autocomplete="off" />
          </FormItem>
          {modelBuildStartStatus !== "success" && (
            <React.Fragment>
              {!modelBuildStartStatus ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!activeButton ? "disabled" : ""}
                  className={
                    !activeButton
                      ? "form-submit-button"
                      : "form-submit-button active"
                  }
                >
                  Start build
                </Button>
                
              ) : modelBuildStartStatus === "pending" ? (
                <Spin  className="spin-loading" spinning={modelBuildStartStatus} size="large" />
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!activeButton ? "disabled" : ""}
                  className={
                    !activeButton
                      ? "form-submit-button"
                      : "form-submit-button active"
                  }
                >
                  Start build
                </Button>
              )}
            </React.Fragment>
          )}

          {modelBuildStartStatus === "success" && (
            <MessageAlert
              message={`Training dataset built successfully`}
              type={"success"}
              customClass="success-msg"
            />
          )}
        </Form>
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

const mapDispatchToProps = (dispatch) => ({
  startBuildModel: (payload) => dispatch(startBuildModelAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildTraning);
