import React, { useState, useEffect } from "react";
import LeftStepperPanel from "./components/leftStepperPanel";
import { Card } from "../../components";
import DataPipe from "./components/dataPipe";
import CreateDataPipe from "./components/createDataPipe";
import EditDataPipe from "./components/editDataPipe";
import QueryWindow from "./components/queryWindow";
import SheduleDataPipeline from "./components/sheduleDataPipeline";
import ConnectAndPreviewData from "./components/connectAndPreviewData";
import { Row, Col, Layout } from "antd";
import { connect } from "react-redux";
import { Button, Tooltip } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import {
  setLoadDataActiveStageAction,
  loadPipelineSelectionDataAction,
  setSelectedPipeLineAction,
  checkDatabseConnectionAction,
  createPipelineDataAction,
  exportPipelineDataAction,
  loadImportExecuteQueryAction,
  resetPipelineConnectionAction,
  clearPrviewTestQueryAction,
  resetMigrateDataAction,
  resetImportDataAction,
  scheduleDataPipelineAction,
  resetExportPipelineAction,
  importFileDataAction,
  setExistingPiplineExecutionAction,
  setDataSourceTypeAction,
  restartPipelineAction,
  executeNoteBookDataAction,
  resetDataSourceTypeAction,
} from "./actions/loadData-action";

import "./loadData.scss";
const { Sider } = Layout;
const LoadData = ({
  loadDataStage,
  setLoadDataActiveStage,
  loadPipelineSelectionData,
  pipelineSelectionData,
  setSelectedPipeLine,
  checkDatabseConnection,
  userData,
  checkDatabaseConnectionPending,
  checkDatabaseConnectionSuccess,
  checkDatabaseConnectionError,
  databaseConnectionResponse,
  selectedPipeline,
  createPipelineData,
  pipelineCreatePending,
  pipelineCreateSuccess,
  pipelineCreateError,
  pipelineExecutionId,
  exportPipelineData,
  migrateQueryStatus,
  loadImportExecuteQuery,
  resetPipelineConnection,
  clearPrviewTestQuery,
  alterImportQueryStatus,
  resetMigrateData,
  resetImportData,
  scheduleDataPipeline,
  schedulePipelineStatus,
  exportDataFileUrl,
  exportPiplineStatus,
  resetExportPipeline,
  importFileData,
  importFileDataStatus,
  importFileDataMessage,
  isExecuteOnly,
  setExistingPiplineExecution,
  setDataSourceType,
  dataSource,
  restartPipeline,
  executeNoteBookData,
  resetDataSourceType,
}) => {
  const [currentActive, setCurrentActive] = useState(loadDataStage);
  const [collapsed, setCollapsed] = useState(false);
  const [addPipelineActive, setAddPipelineActive] = useState(false);
  const [newlyInsertedPipelineName, setNewlyInsertedPipelineName] =
    useState(false);
  const [pipelineEditMode, setPipelineEditMode] = useState(false);
  const [newStep, setNewStep] = useState(true);
  const history = useHistory();

  useEffect(() => {
    return () => {
      resetDataSourceType();
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.has("pipelineExecutionId") &&
      params.has("buildType") &&
      params.has("pipelineId")
    ) {
      const pipelineId = parseInt(params.get("pipelineId"));
      const executionId = parseInt(params.get("pipelineExecutionId"));
      const executionStage = parseInt(params.get("buildType"));
      let isThisNotebook = false;
      if (params.has("notebook")) {
        isThisNotebook = true;
        if (executionStage === 3) {
          setDataSourceType("notebook");
        }
      }
      if (executionStage === 3) {
        setLoadDataActiveStage(executionStage - 1);
        setCurrentActive(executionStage - 1);
      }
      if (executionStage === 2) {
        setLoadDataActiveStage(executionStage - 1);
        setCurrentActive(executionStage - 1);
      }
      if (executionStage === 1) {
        setLoadDataActiveStage(executionStage - 1);
        setCurrentActive(executionStage - 1);
      }

      setExistingPiplineExecution({
        pipelineExecutionId: executionId,
        pipelineId,
      });
    }
  }, [setLoadDataActiveStage, setCurrentActive, setExistingPiplineExecution]);

  useEffect(() => {
    setCurrentActive(loadDataStage);
  }, [loadDataStage]);

  useEffect(() => {
    if (dataSource === "notebook") {
      const params = new URLSearchParams(window.location.search);
      const executionStage = parseInt(params.get("buildType"));
      if (executionStage === 3) {
        setCurrentActive(3);
      }
    }
  }, [dataSource]);

  useEffect(() => {
    if (history.location.state != undefined) {
      setNewStep(true);
      setCurrentActive(0);
      setLoadDataActiveStage(0);
    }
  }, [history.location.state]);

  const goNextStage = () => {
    const nextStage = currentActive + 1;
    setLoadDataActiveStage(nextStage);
  };
  const goNextEditStage = () => {
    const nextStage = currentActive;
    setLoadDataActiveStage(nextStage);
  };
  const goBackStage = () => {
    const backStage = currentActive - 1;
    if (backStage === 1) {
      setNewStep(false);
    }
    setLoadDataActiveStage(backStage);
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleCreatePipelineView = () => {
    sessionStorage.setItem("newAnalytics", true);
    setCurrentActive(4);
  };
  const toggleSelectPipelineView = (newlyInsertedPipelineName) => {
    setCurrentActive(0);
    if (
      typeof newlyInsertedPipelineName !== "undefined" &&
      newlyInsertedPipelineName
    ) {
      setNewlyInsertedPipelineName(newlyInsertedPipelineName);
    } else {
      setNewlyInsertedPipelineName(false);
    }
  };

  const toggleEditPipelineView = () => {
    setPipelineEditMode(true);
    setCurrentActive(4);
  };

  const executeNoteBookDataHandler = (data) => {
    executeNoteBookData(data, {
      onSuccess: executeNoteBookDataSuccess,
      onFail: executeNoteBookDataFail,
    });
  };

  const executeNoteBookDataSuccess = () => {
    setCurrentActive(3);
  };

  const executeNoteBookDataFail = () => {};

  return (
    <Card customClass="model-load-card">
      <div className="load-data-continer">
        <Layout>
          <Sider
            collapsed={collapsed}
            theme="light"
            collapsedWidth={80}
            width={170}
          >
            <Row>
              <Col span={24}>
                <Tooltip title={!collapsed ? "Collapse" : "Expand"}>
                  <Button
                    className="collapse-button"
                    type="primary"
                    onClick={onCollapse}
                    style={{ marginBottom: 16 }}
                  >
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                    )}
                  </Button>
                </Tooltip>
              </Col>
            </Row>

            <LeftStepperPanel
              currentActive={currentActive}
              selectedModelTypeData={"Build Data Pipeline"}
              dataSource={dataSource}
            />
          </Sider>
          <Layout className="right-layout">
            <div className="right-container-col">
              <React.Fragment>
                {currentActive === 0 && (
                  <DataPipe
                    goNextStage={goNextStage}
                    loadPipelineSelectionData={loadPipelineSelectionData}
                    pipelineSelectionData={pipelineSelectionData}
                    setSelectedPipeLine={setSelectedPipeLine}
                    userData={userData}
                    selectedPipeline={selectedPipeline}
                    createPipelineData={createPipelineData}
                    pipelineCreatePending={pipelineCreatePending}
                    pipelineCreateSuccess={pipelineCreateSuccess}
                    pipelineCreateError={pipelineCreateError}
                    exportPipelineData={exportPipelineData}
                    exportDataFileUrl={exportDataFileUrl}
                    exportPiplineStatus={exportPiplineStatus}
                    resetExportPipeline={resetExportPipeline}
                    toggleCreatePipelineView={toggleCreatePipelineView}
                    toggleEditPipelineView={toggleEditPipelineView}
                    newlyInsertedPipelineName={newlyInsertedPipelineName}
                    setNewlyInsertedPipelineName={setNewlyInsertedPipelineName}
                  />
                )}
                {currentActive === 1 && (
                  <ConnectAndPreviewData
                    goNextStage={goNextStage}
                    newStep={newStep}
                    checkDatabseConnection={checkDatabseConnection}
                    userData={userData}
                    connectionPending={checkDatabaseConnectionPending}
                    connectionSuccess={checkDatabaseConnectionSuccess}
                    connectionError={checkDatabaseConnectionError}
                    connectionResponse={databaseConnectionResponse}
                    pipelineExecutionId={pipelineExecutionId}
                    migrateQueryStatus={migrateQueryStatus}
                    resetPipelineConnection={resetPipelineConnection}
                    clearPrviewTestQuery={clearPrviewTestQuery}
                    resetMigrateData={resetMigrateData}
                    importFileData={importFileData}
                    selectedPipeline={selectedPipeline}
                    importFileDataStatus={importFileDataStatus}
                    importFileDataMessage={importFileDataMessage}
                    dataSource={dataSource}
                    setDataSourceType={setDataSourceType}
                    restartPipeline={restartPipeline}
                    executeNoteBookData={executeNoteBookDataHandler}
                  />
                )}
                {currentActive === 2 && (
                  <QueryWindow
                    goNextStage={goNextStage}
                    userData={userData}
                    pipelineExecutionId={pipelineExecutionId}
                    loadImportExecuteQuery={loadImportExecuteQuery}
                    selectedPipeline={selectedPipeline}
                    alterImportQueryStatus={alterImportQueryStatus}
                    resetImportData={resetImportData}
                    isExecuteOnly={isExecuteOnly}
                    clearPrviewTestQuery={clearPrviewTestQuery}
                  />
                )}
                {currentActive === 3 && (
                  <SheduleDataPipeline
                    goNextStage={goNextStage}
                    userData={userData}
                    pipelineExecutionId={pipelineExecutionId}
                    selectedPipeline={selectedPipeline}
                    scheduleDataPipeline={scheduleDataPipeline}
                    schedulePipelineStatus={schedulePipelineStatus}
                    dataSource={dataSource}
                  />
                )}

                {currentActive === 4 && !pipelineEditMode && (
                  <CreateDataPipe
                    goNextStage={goNextStage}
                    loadPipelineSelectionData={loadPipelineSelectionData}
                    pipelineSelectionData={pipelineSelectionData}
                    setSelectedPipeLine={setSelectedPipeLine}
                    userData={userData}
                    selectedPipeline={selectedPipeline}
                    createPipelineData={createPipelineData}
                    pipelineCreatePending={pipelineCreatePending}
                    pipelineCreateSuccess={pipelineCreateSuccess}
                    pipelineCreateError={pipelineCreateError}
                    exportPipelineData={exportPipelineData}
                    exportDataFileUrl={exportDataFileUrl}
                    exportPiplineStatus={exportPiplineStatus}
                    resetExportPipeline={resetExportPipeline}
                    toggleSelectPipelineView={toggleSelectPipelineView}
                  />
                )}

                {pipelineEditMode && currentActive === 4 && (
                  <EditDataPipe
                    goNextStage={goNextEditStage}
                    loadPipelineSelectionData={loadPipelineSelectionData}
                    pipelineSelectionData={pipelineSelectionData}
                    setSelectedPipeLine={setSelectedPipeLine}
                    userData={userData}
                    selectedPipeline={selectedPipeline}
                    createPipelineData={createPipelineData}
                    pipelineCreatePending={pipelineCreatePending}
                    pipelineCreateSuccess={pipelineCreateSuccess}
                    pipelineCreateError={pipelineCreateError}
                    exportPipelineData={exportPipelineData}
                    exportDataFileUrl={exportDataFileUrl}
                    exportPiplineStatus={exportPiplineStatus}
                    resetExportPipeline={resetExportPipeline}
                    toggleSelectPipelineView={toggleSelectPipelineView}
                  />
                )}
              </React.Fragment>
              {currentActive !== 0 && (
                <Row justify="end">
                  <Col></Col>
                </Row>
              )}
            </div>
          </Layout>
        </Layout>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  loadDataStage: state.loadDataState.activeLoadDataStage,
  userData: state.mainViewState.userData,
  pipelineSelectionData: state.loadDataState.pipelineSelectionData,
  checkDatabaseConnectionPending:
    state.loadDataState.checkDatabaseConnectionPending,
  checkDatabaseConnectionSuccess:
    state.loadDataState.checkDatabaseConnectionSuccess,
  checkDatabaseConnectionError:
    state.loadDataState.checkDatabaseConnectionError,
  databaseConnectionResponse: state.loadDataState.databaseConnectionResponse,
  selectedPipeline: state.loadDataState.selectedPipeline,
  pipelineCreatePending: state.loadDataState.pipelineCreatePending,
  pipelineCreateSuccess: state.loadDataState.pipelineCreateSuccess,
  pipelineCreateError: state.loadDataState.pipelineCreateError,
  pipelineExecutionId: state.loadDataState.pipelineExecutionId,
  migrateQueryStatus: state.loadDataState.migrateQueryStatus,
  connectionErrorMessage: state.loadDataState.connectionErrorMessage,
  alterImportQueryStatus: state.loadDataState.alterImportQueryStatus,
  schedulePipelineStatus: state.loadDataState.schedulePipelineStatus,
  exportDataFileUrl: state.loadDataState.exportData,
  exportPiplineStatus: state.loadDataState.exportPiplineStatus,
  importFileDataStatus: state.loadDataState.importFileDataStatus,
  importFileDataMessage: state.loadDataState.importFileDataMessage,
  isExecuteOnly: state.loadDataState.isExecuteOnly,
  dataSource: state.loadDataState.dataSource,
  executeNoteBookDataSuccess: state.loadDataState.executeNoteBookDataSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  setLoadDataActiveStage: (payload) =>
    dispatch(setLoadDataActiveStageAction(payload)),
  loadPipelineSelectionData: (payload) =>
    dispatch(loadPipelineSelectionDataAction(payload)),
  setSelectedPipeLine: (payload) =>
    dispatch(setSelectedPipeLineAction(payload)),
  checkDatabseConnection: (payload) =>
    dispatch(checkDatabseConnectionAction(payload)),
  createPipelineData: (payload) => dispatch(createPipelineDataAction(payload)),
  exportPipelineData: (payload) => dispatch(exportPipelineDataAction(payload)),
  loadImportExecuteQuery: (payload) =>
    dispatch(loadImportExecuteQueryAction(payload)),
  resetPipelineConnection: () => dispatch(resetPipelineConnectionAction()),
  resetMigrateData: () => dispatch(resetMigrateDataAction()),
  resetImportData: () => dispatch(resetImportDataAction()),
  clearPrviewTestQuery: () => dispatch(clearPrviewTestQueryAction()),
  scheduleDataPipeline: (payload) =>
    dispatch(scheduleDataPipelineAction(payload)),
  resetExportPipeline: (payload) =>
    dispatch(resetExportPipelineAction(payload)),
  importFileData: (payload) => dispatch(importFileDataAction(payload)),
  setExistingPiplineExecution: (payload) =>
    dispatch(setExistingPiplineExecutionAction(payload)),
  setDataSourceType: (payload) => dispatch(setDataSourceTypeAction(payload)),
  restartPipeline: () => dispatch(restartPipelineAction()),
  executeNoteBookData: (payload, callbackFn) =>
    dispatch(executeNoteBookDataAction(payload, callbackFn)),
  resetDataSourceType: () => dispatch(resetDataSourceTypeAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
