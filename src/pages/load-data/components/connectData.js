import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Select,
  Form,
  Input,
  Button,
  Upload,
  Icon,
  message,
  Spin,
  Space,
} from "antd";

import { InboxOutlined } from "@ant-design/icons";
import { MessageAlert } from "../../../components";
import configConstants from "../../../config/constants";
import "./connectData.scss";
import { connect } from "react-redux";

const FormItem = Form.Item;
const { Option } = Select;
const Dragger = Upload.Dragger;
const { Search } = Input;

const ConnectData = ({
  connectDataHandler,
  uploadingCSVHandler,
  connectionPending,
  previewHandler,
  connectionError,
  connectionResponse,
  resetPipelineConnection,
  setSeporatorState,
  clearPrviewTestQuery,
  selectedPipeline,
  restartPipeline,
  executeNoteBookData,
  executeNoteBookDataPending,
  pipelineExecutionId,
}) => {
  const apiUrl = configConstants.apiUrlWithPort;
  const [activeButton, setActiveButton] = useState(false);
  const [dbDetail, setDbDetail] = useState();
  const [dbType, setDbType] = useState(null);
  const [database, setDatabase] = useState(null);
  const [dbServer, setDbServer] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [fileUploadDisabled, setFileUploadDisabled] = useState(false);
  const [fileUploadingStatus, setFileUploadingStatus] = useState(null);
  const [notebookUploadingStatus, setNotebookUploadingStatus] = useState(null);

  useEffect(() => {}, []);

  const selectHandler = (value) => {
    if (value === "serverDetails") {
      resetPipelineConnection();
      setDbDetail("serverDetails");
    } else if (value === "csvDetails") {
      setDbDetail("csvDetails");
    } else if (value == "notebook") {
      setDbDetail("notebook");
    }
    previewHandler(value);
  };

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];
    if (formDataField === "dbType") {
      setDbType(formDataFieldValue);
    }
    if (formDataField === "dbServer") {
      setDbServer(formDataFieldValue);
    }
    if (formDataField === "userName") {
      setUserName(formDataFieldValue);
    }
    if (formDataField === "password") {
      setPassword(formDataFieldValue);
    }
    if (formDataField === "database") {
      setDatabase(formDataFieldValue);
    }
    if (dbType && dbServer && userName && password) {
      if (parseInt(dbType) === 3) {
        if (database) {
          setActiveButton(true);
        } else {
          setActiveButton(false);
        }
      } else {
        setActiveButton(true);
      }
    } else {
      setActiveButton(false);
    }
  };

  const dargDrop = {
    name: "file",
    multiple: false,
    showUploadList: false,
    action: `${apiUrl}/api/v1/pipeline/uploadDataFile`,
    onChange(info) {
      const { status } = info.file;
      if (status === "uploading") {
        setFileUploadingStatus(status);
      }
      if (status === "done") {
        clearPrviewTestQuery();
        message.success(`${info.file.name} file uploaded successfully.`);
        setSeporatorState(",");
        setFileUploadingStatus(status);
        uploadingCSVHandler(true, info.file, ",");
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setFileUploadingStatus(status);
      }
    },
  };

  const handleSubmit = (value) => {
    setActiveButton(false);
    connectDataHandler(value);
  };

  const noteBookUploadProps = {
    name: "noteBookFile",
    accept: ".ipynb",
    action: `${apiUrl}/api/v1/pipeline/uploadNotebookFile`,
    data: {
      pipelineId: selectedPipeline ? selectedPipeline.DataPipeID : null,
    },
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        setNotebookUploadingStatus(file.status);
      }
    },
  };

  const executeNoteBookDataFn = () => {
    const { DataPipeID } = selectedPipeline;
    executeNoteBookData({
      pipelineId: DataPipeID,
      pipelineExecutionId: pipelineExecutionId,
    });
  };

  const formContainer = (
    <Form
      // ref={form}
      onFinish={handleSubmit}
      onFieldsChange={onFieldsChange}
      className="data-pipe-form"
      layout="vertical"
    >
      <Row gutter={[24, 8]}>
        <Col span={8}>
          <label className="pipeline-connection-input-label block-container-item">
            Server type
          </label>
          <FormItem
            className="pipeline-connection-input-item"
            name="dbType"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select"
              className="datapipe-selection-import-export"
              size="large"
            >
              <Option value="1">SQL Server</Option>
              <Option value="2">Oracle</Option>
              <Option value="3">Azure SQL</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span={8}>
          <label className="pipeline-connection-input-label block-container-item">
            Server address
          </label>
          <FormItem
            className="pipeline-connection-input-item"
            name="dbServer"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="pipeline-connection-input block-container-item" />
          </FormItem>
        </Col>
        <Col span={8}>
          <label className="pipeline-connection-input-label block-container-item">
            Database
          </label>
          <FormItem
            className="pipeline-connection-input-item"
            name="database"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input className="pipeline-connection-input block-container-item" />
          </FormItem>
        </Col>
      </Row>
      <Row gutter={[24, 8]}>
        <Col span={8}>
          <label className="pipeline-connection-input-label block-container-item">
            Username
          </label>
          <FormItem
            className="pipeline-connection-input-item"
            name="userName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className="pipeline-connection-input block-container-item" />
          </FormItem>
        </Col>
        <Col span={8}>
          <label className="pipeline-connection-input-label block-container-item">
            Password
          </label>
          <FormItem
            className="pipeline-connection-input-item password-field"
            name="password"
          >
            <Input.Password
              className="pipeline-connection-input"
              type="password"
            />
          </FormItem>
        </Col>
      </Row>
      <Row gutter={[24, 8]}>
        <Col span={8}>
          {!connectionPending && connectionError && (
            <React.Fragment>
              <MessageAlert
                customClass={"error-msg"}
                type={"error"}
                message={"Connection failed"}
                subMessage={
                  connectionResponse[0].ErrorMessage !== undefined
                    ? connectionResponse[0].ErrorMessage
                    : ""
                }
              />
            </React.Fragment>
          )}
          {!connectionPending && (
            <Form.Item className="submit-btn-div">
              <Button
                type="primary"
                htmlType="submit"
                className={
                  !activeButton
                    ? "form-submit-button"
                    : "form-submit-button active"
                }
                disabled={!activeButton ? true : false}
              >
                Connect
              </Button>
            </Form.Item>
          )}
        </Col>
      </Row>
    </Form>
  );

  return (
    <React.Fragment>
      <Row>
        <Col span={8}>
          <div className="selection-div">
            <label className="select-data-pipeline-label">
              Select Source Data*
            </label>
            <Select
              style={{ width: "100%" }}
              onChange={selectHandler}
              placeholder="Select"
              className="selection-import-export"
              size="large"
            >
              <Option value="serverDetails">SQL</Option>
              <Option value="csvDetails">CSV or Text</Option>
              <Option value="notebook">Notebook</Option>
            </Select>
          </div>
        </Col>
      </Row>

      {dbDetail === "notebook" && (
        <Row>
          <Col span={24}>
            <div className="connect-data-pipe">
              <Spin
                spinning={
                  fileUploadingStatus === "uploading" ||
                  executeNoteBookDataPending
                    ? true
                    : false
                }
                className="spinner-active"
                size="large"
              >
                <div style={{ marginTop: 16, height: 200, width: "100%" }}>
                  <Dragger {...noteBookUploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag ipynb file to this area to upload
                    </p>
                    <p className="ant-upload-text limit">
                      (Maximum file size supported : 10 MB)
                    </p>
                  </Dragger>
                </div>
              </Spin>
            </div>
            {notebookUploadingStatus === "done" && (
              <Row>
                <Col span={5}>
                  <div className="restartBtn">
                    <Button
                      className="restart-btn"
                      onClick={() => restartPipeline()}
                    >
                      Restart pipeline
                    </Button>
                  </div>
                </Col>
                <Col span={16}>
                </Col>
                <Col span={3}>
                  <div className="submitBtn">
                    <Button
                      className="execut-btn"
                      onClick={executeNoteBookDataFn}
                    >
                      Execute
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      )}

      {dbDetail === "serverDetails" && (
        <Row>
          <Col span={24}>
            <div className="connect-data-pipe">
              <Spin
                spinning={connectionPending ? true : false}
                className="spinner-active"
                size="large"
              >
                {formContainer}
              </Spin>
            </div>
          </Col>
        </Row>
      )}
      {dbDetail === "csvDetails" && (
        <Row>
          <Col span={24}>
            <div className="connect-data-pipe">
              <Spin
                spinning={fileUploadingStatus === "uploading" ? true : false}
                className="spinner-active"
                size="large"
              >
                <div style={{ marginTop: 16, height: 375, width: "100%" }}>
                  <Dragger
                    disabled={fileUploadDisabled}
                    {...dargDrop}
                    accept=".csv,.txt"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag csv or text to this area to upload
                    </p>
                    <p className="ant-upload-text limit">
                      (Maximum file size supported : 100 MB)
                    </p>
                  </Dragger>
                </div>
              </Spin>
            </div>
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  selectedPipeline: state.loadDataState.selectedPipeline,
  executeNoteBookDataPending: state.loadDataState.executeNoteBookDataPending,
});

export default connect(mapStateToProps)(ConnectData);
// export default ConnectData;
