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
import {createNewPipeline} from "../services/loadData-service";
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
    if (pipelineCreateSuccess && !sessionStorage.getItem("newAnalytics")) {
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
      placeholder
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
          >
            <Input placeholder={placeholder} className="pipeline-input" />
          </FormItem>
      </div>
    );

  }

  const FormUploadElement = (params) => {
    const {
      label,
      required,
      validationFailMessage,
      feildName,
      uploadButton
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
          >
            <Upload>
              {uploadButton}
            </Upload>
          </FormItem>
      </div>
    );

  }

  const FormSwitchElement = (params) => {
    const {
      label,
      required,
      feildName
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
          >
            <Switch defaultChecked={false} />
          </FormItem>
      </div>
    );

  }

  const onFinishHandler = async (data) => {
    setNewPipelineStatus("saving");
    await createNewPipeline(data);
    setNewPipelineStatus("saved");
    setActiveNextButton(false);
    displayNotification("success", "New pipeline added successfully!");
    sessionStorage.removeItem("newAnalytics")
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
            <h3>New Pipeline</h3>
          </div>

          <Form
            onFinish={onFinishHandler}
          >
          
          <FormInputElement 
                  label="Pipeline Name:"
                  required={true}
                  validationFailMessage="Please add pipeline name!"
                  feildName="pipelineName"
          />

          <FormInputElement 
                  label="Dependencies:"
                  required={false}
                  validationFailMessage="Please add dependencies!"
                  feildName="dependencies"
                  placeholder="EXEC [schema].[name1], EXEC [schema].[name2]"
          />

          <FormSwitchElement 
                  label="Active:"
                  required={false}
                  feildName="active"
          />
          <FormSwitchElement 
                  label="Auto Generate SQL Load Statements:"
                  required={false}
                  feildName="autoGenerateSql"
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
                        ? "Saving..."
                        : "Save"}
                    </Button>
                  </div>
            
            </Form>
        </div>
      </Col>
    </Row>
  );
};

export default CreateDataPipe;
