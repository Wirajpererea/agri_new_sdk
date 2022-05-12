import React, { useState } from "react";
import {
  Radio,
  Row,
  Col,
  Select,
  Button,
  Input,
  Form,
  Switch,
  notification,
  Upload
} from "antd";
import "./createDataPipe.scss";
import { useEffect } from "react";
import { MessageAlert } from "../../../components";
import {updateNewPipeline} from "../services/loadData-service";
import { color } from "d3";

const FormItem = Form.Item;
const { Option } = Select;

const CreateDataPipe = ({
  goNextStage,
  loadPipelineSelectionData,
  pipelineSelectionData,
  setSelectedPipeLine,
  selectedPipeline,
  createPipelineData,
  userData,
  pipelineCreatePending,
  pipelineCreateSuccess,
  pipelineCreateError,
  exportPipelineData,
  exportDataFileUrl,
  exportPiplineStatus,
  resetExportPipeline,
  toggleSelectPipelineView
}) => {
  const [activeImportButton, setActiveImportButton] = useState(false);
  const [activeExportButton, setActiveExportButton] = useState(false);
  const [activeNextButton, setActiveNextButton] = useState(false);
  const [activeDownloadButton, setActiveDownloadButton] = useState(false);
  const [radioBtnIE, setRadioBtnIE] = useState(1);
  const [newPipelineStatus, setNewPipelineStatus] = useState("");

  useEffect(() => {
    loadPipelineSelectionData();
  }, [loadPipelineSelectionData]);

  useEffect(() => {
    if (pipelineCreateSuccess) {
      goNextStage();
    }
  }, [goNextStage, pipelineCreateSuccess]);

  useEffect(() => {
    if (exportPiplineStatus === "success") {
      const host = window.location.origin;
      const newFileUrl = `${host}${exportDataFileUrl}`;
      downloadFile(newFileUrl);
      resetExportPipeline();
    }
  }, [exportDataFileUrl, exportPiplineStatus, resetExportPipeline]);

  const onChangeIEHandler = (e) => {
    setRadioBtnIE(e.target.value);
  };

  const downloadFile = (newFileUrl) => {
    let element = document.createElement("a");
    element.setAttribute("href", newFileUrl);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const selectImportHandler = (value) => {
    const selectedValue = value.target.value;

    if (selectedValue) {
      const selectedPipline = pipelineSelectionData.filter(
        (data) => data.DataPipeID === selectedValue
      );
      setSelectedPipeLine(selectedPipline[0]);
      setActiveExportButton(selectedPipline[0]["Export"]);
      setActiveNextButton(true);
    }
  };

  const goNextInPipeline = () => {
    const { DataPipeID } = selectedPipeline;
    const { UserID } = userData;
    createPipelineData({
      pipeLineId: DataPipeID,
      userId: UserID,
    });
  };

  const downloadPipelineData = () => {
    const { DataPipeID, DataPipe } = selectedPipeline;
    const { UserID } = userData;
    exportPipelineData({
      pipelineName: DataPipe,
      pipeLineId: DataPipeID,
      userId: UserID,
    });
  };

  const FormInputElement = (params) => {
    const {
      label,
      required,
      validationFailMessage,
      feildName,
      placeholder,
      initialValue
    } = params;
    return (
      <div>
        <label >
            {label}
          </label>
          <FormItem
            className="create-pipeline-input-item"
            name={feildName}
            rules={[
              {
                required: required,
                message: validationFailMessage
              },
            ]}
            initialValue={initialValue}
          >
            <Input value={initialValue} placeholder={placeholder} className="pipeline-input" />
          </FormItem>
      </div>
    );

  }

  const FormSwitchElement = (params) => {
    const {
      label,
      required,
      feildName,
      initialValue
    } = params;
    return (
      <div>
        <label >
            {label}
          </label>
          <FormItem
            className="pipeline-connection-input-item"
            valuePropName="checked"
            name={feildName}
            rules={[
              {
                required: required,
              },
            ]}
            initialValue={initialValue}
          >
            <Switch defaultChecked={initialValue} />
          </FormItem>
      </div>
    );

  }

  const onFinishHandler = async (data) => {
    const updatePipelineData = {
      ...data,
      pipelineId : selectedPipeline.DataPipeID
    }
    setNewPipelineStatus("saving");
    await updateNewPipeline(updatePipelineData);
    setNewPipelineStatus("saved");
    setActiveNextButton(false);
    displayNotification("success", "Pipeline updated successfully!");
    toggleSelectPipelineView(data.pipelineName);
  }

  const displayNotification = (type, message) => {
    notification[type]({
      message: message
    });
  };
  
  return (
    <Row>
      <Col span={12}>
        <div className="data-pipe">
          <div className="import-export-div">
            <h3>Edit Pipeline</h3>
          </div>

          <Form
            onFinish={onFinishHandler}
          >
          
          <FormInputElement 
                  label="Pipeline Name:"
                  required={true}
                  validationFailMessage="Please add pipeline name!"
                  feildName="pipelineName"
                  initialValue={selectedPipeline.DataPipe}
          />

          <FormInputElement 
                  label="Dependencies:"
                  required={false}
                  validationFailMessage="Please add dependencies!"
                  feildName="dependencies"
                  placeholder="EXEC [schema].[name1], EXEC [schema].[name2]"
                  initialValue={selectedPipeline.Dependencies}
          />

          <FormSwitchElement 
                  label="Active:"
                  required={false}
                  feildName="active"
                  initialValue={selectedPipeline.Active}
          />
          <FormSwitchElement 
                  label="Auto Generate SQL Load Statements:"
                  required={false}
                  feildName="autoGenerateSql"
                  initialValue={selectedPipeline.AutoGenerateSqlLoadStatements}
          />



          <div className="submit-btn-div">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={
                        "form-submit-button active"
                        // activeNextButton
                        //   ? "form-submit-button active"
                        //   : "form-submit-button"
                      }
                      disabled={
                        // (!activeNextButton) ? true : false
                        false
                      }
                    >
                      {newPipelineStatus === "saving"
                        ? "Updating..."
                        : "Update"}
                    </Button>
                  </div>
            
            </Form>
        </div>
      </Col>
    </Row>
  );
};

export default CreateDataPipe;
