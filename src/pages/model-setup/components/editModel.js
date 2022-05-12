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
import "./createModel.scss";
import { useEffect } from "react";
import { MessageAlert } from "../../../components";
import {updateModel} from "../services/modelData-service";
import { color } from "d3";
import {connect} from 'react-redux';
import {setUserModelBuildsAction} from '../../login/actions/login-action';

const FormItem = Form.Item;
const { Option } = Select;

const EditModel = ({
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
  toggleSelectPipelineView,
  selectedModel,
  setUserModelBuildsToRedux
}) => {
  const [activeImportButton, setActiveImportButton] = useState(false);
  const [activeExportButton, setActiveExportButton] = useState(false);
  const [activeNextButton, setActiveNextButton] = useState(false);
  const [activeDownloadButton, setActiveDownloadButton] = useState(false);
  const [radioBtnIE, setRadioBtnIE] = useState(1);
  const [newPipelineStatus, setNewPipelineStatus] = useState("");
  const [modelGroup,setModelGroup]= useState(selectedModel.ModelGroup != null? selectedModel.ModelGroup : "Please select a model group");


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
    const updateModelData = {
      ...data,
      modelId : selectedModel.ModelID,
      modelGroup:modelGroup,
      active : data.active ? 1 : 0
    }
    setNewPipelineStatus("saving");
    await updateModel(updateModelData);
    setNewPipelineStatus("saved");
    setActiveNextButton(false);
    displayNotification("success", "Model updated successfully!");
    setUserModelBuildsToRedux({
      userId: userData.UserID,
    });
    toggleSelectPipelineView(data.modelName);
  }

  const displayNotification = (type, message) => {
    notification[type]({
      message: message
    });
  };
  const filterList = [
    {
      key: "Forecast",
      value: "Forecast",
    },
    {
      key: "Financial",
      value: "Financial",
    },
    {
      key: "Classification Models",
      value: "Classification",
    },
    {
      key: "Deep Learning",
      value: "Deep Learning",
    },
    {
      key: "Natural Language Processing",
      value: "Natural Language Processing",
    },
  ];
  
  return (
    <Row>
      <Col span={12}>
        <div className="data-pipe">
          <div className="import-export-div">
            <h3>Edit Model</h3>
          </div>

          <Form
            onFinish={onFinishHandler}
          >
          
          <FormInputElement 
                  label="Model Name:"
                  required={true}
                  validationFailMessage="Please add model name!"
                  feildName="modelName"
                  initialValue={selectedModel.ModelName}
          />
          <Row>
              <Col span={6}>
                <label>Model Group:</label>
              </Col>
            </Row> 
             <Row>
              <Col span={16}>
                <Form.Item
                  initialValue=""
                  //label="Model Group"
                  // disabled={filterAdd}
                  style={{ fontSize: "12px", borderRadius: "12px!important" }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    className="border-dropdown"
                    // style={{ fontSize: "12px" ,borderRadius:"12px!important"}}
                    // disabled={filterAdd}
                    value={modelGroup}
                    onChange={(e) => {setModelGroup(e)}}
                    placeholder="Select a model group"
                    // value={}
                  >
                    {filterList != "" &&
                      filterList &&
                      filterList.map((element, index) => (
                        <Option key={index} value={element.key}>
                          {element.value}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

          <FormSwitchElement 
                  label="Active:"
                  required={false}
                  feildName="active"
                  initialValue={selectedModel.Active}
          />

          {/* <FormInputElement 
                  label="Dependencies:"
                  required={true}
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
          /> */}



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

const mapStateToProps = (state) => ({
  modelsList: state.mainViewState.configData,
  selectedModel : state.modelDataState.selectedModel,
  userData: state.mainViewState.userData,
});

const mapDispatchToProps = (dispatch) => ({
  setUserModelBuildsToRedux: (data) => dispatch(setUserModelBuildsAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditModel);
