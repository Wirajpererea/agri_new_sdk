import React, { useState, useEffect } from 'react';
import LeftStepperPanel from './components/leftStepperPanel';
import { Card } from '../../components';
import ModelComponent from './components/model';
import CreateModel from './components/createModel';
import EditModel from './components/editModel';
import QueryWindow from './components/queryWindow';
import SheduleDataPipeline from './components/sheduleDataPipeline';
import ProductionModel from './components/productionModel';
import ConnectAndPreviewData from './components/connectAndPreviewData';
import { Row, Col, Layout } from 'antd';
import { connect } from 'react-redux';
import { Button, Tooltip } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
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
} from '../load-data/actions/loadData-action';

import {
  setSelectedModelDataToStateAction,
  getBuildDatasetFieldsDataAction,
  getBuildDatasetTablesDataAction,
  setSetModelSetupCurrentStepStateAction,
  setSetModelSetupMaxStepStateAction
} from './actions/modelData-action';

import {
  getBuildDatasetTablesApi
} from "./services/modelData-service";

import './modelSetup.scss';
const { Sider } = Layout;
const LoadData = ({
  // loadDataStage,
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
  // createPipelineData,
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
  getBuildDatasetFieldsData,
  getBuildDatasetTablesData,
  modelSetupCurrentStep,
  setCurrentStepToRedux,
  setMaxStepToRedux
}) => {
  const [currentActive, setCurrentActive] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [addPipelineActive, setAddPipelineActive] = useState(false);
  const [newlyInsertedPipelineName, setNewlyInsertedPipelineName] = useState(
    false
  );
  const [modelEditMode, setModelEditMode] = useState(false);

  useEffect(() => {
    resetDataSourceType();
    setMaxStepToRedux(0);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.has('pipelineExecutionId') &&
      params.has('buildType') &&
      params.has('pipelineId')
    ) {
      const pipelineId = parseInt(params.get('pipelineId'));
      const executionId = parseInt(params.get('pipelineExecutionId'));
      const executionStage = parseInt(params.get('buildType'));
      let isThisNotebook = false;
      if (params.has('notebook')) {
        isThisNotebook = true;
        if (executionStage === 3) {
          setDataSourceType('notebook');
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

  // useEffect(() => {
  //   setCurrentActive(loadDataStage);
  // }, [loadDataStage]);

  useEffect(() => {
    if (dataSource === 'notebook') {
      const params = new URLSearchParams(window.location.search);
      const executionStage = parseInt(params.get('buildType'));
      if (executionStage === 3) {
        setCurrentActive(3);
      }
    }
  }, [dataSource]);


  const goNextStage = () => {
    const nextStage = currentActive + 1;
    setLoadDataActiveStage(nextStage);
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleCreateModelView = () => {
    setCurrentActive(5);
  };
  const toggleSelectPipelineView = (newlyInsertedPipelineName) => {
    setCurrentActive(0);
    if (
      typeof newlyInsertedPipelineName !== 'undefined' &&
      newlyInsertedPipelineName
    ) {
      setNewlyInsertedPipelineName(newlyInsertedPipelineName);
    } else {
      setNewlyInsertedPipelineName(false);
    }
  };

  const toggleEditModelView = () => {
    setModelEditMode(true);
    setCurrentActive(5);
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

  const createPipelineData = async () => {
    // go to build dataset
    getBuildDatasetTablesData();

    // const response = await getBuildDatasetTablesApi();
    setMaxStepToRedux(1);
    setCurrentActive(1);
  }

  const pipeLineData = async () => {
    setCurrentActive(2);
  }

  const navigateToValidateDatset = () => {
    setMaxStepToRedux(2);
    setCurrentActive(2);
  }

  const navigateToTrainDatset = () => {
    setMaxStepToRedux(3);
    setCurrentActive(3);
  }

  const navigateToProductionModel = () => {
    setMaxStepToRedux(4);
    setCurrentActive(4);
  }
  const navigateToCreateEdit = () => {
    setMaxStepToRedux(0);
    setCurrentActive(0);
  }

  const stepperOnclick = (step) => {
    setCurrentActive(step);
  }

  return (
    <Card customClass="model-load-card">
      <div className="load-data-continer">
        <Layout>
          <Sider
            collapsed={collapsed}
            theme="light"
            collapsedWidth={80}
            width={200}
          >
            <Row>
              <Col span={24}>
                <Tooltip title={!collapsed ? 'Collapse' : 'Expand'}>
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
              selectedModelTypeData={'Build Data Pipeline'}
              dataSource={dataSource}
              stepperOnclick={stepperOnclick}
            />
          </Sider>
          <Layout className="right-layout">
            <div className="right-container-col">
              <React.Fragment>
                {currentActive === 0 && (
                  <ModelComponent
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
                    toggleCreateModelView={toggleCreateModelView}
                    toggleEditModelView={toggleEditModelView}
                    newlyInsertedPipelineName={newlyInsertedPipelineName}
                    setNewlyInsertedPipelineName={setNewlyInsertedPipelineName}
                  />
                )}
                {currentActive === 1 && (
                  <ConnectAndPreviewData
                    goNextStage={goNextStage}
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
                    pipelineData={pipeLineData}
                    navigateToValidateDatset={navigateToValidateDatset}
                  />
                )}
                {currentActive === 2 && (
                  <QueryWindow
                    goNextStage={goNextStage}
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
                    pipelineData={pipeLineData}
                    navigateToTrainDatset={navigateToTrainDatset}
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
                    navigateToProductionModel={navigateToProductionModel}

                  />
                )}
                {currentActive === 4 && (
                  <ProductionModel
                    goNextStage={goNextStage}
                    userData={userData}
                    pipelineExecutionId={pipelineExecutionId}
                    selectedPipeline={selectedPipeline}
                    scheduleDataPipeline={scheduleDataPipeline}
                    schedulePipelineStatus={schedulePipelineStatus}
                    dataSource={dataSource}
                    navigateToCreateEdit={navigateToCreateEdit}

                  />
                )}

                {currentActive === 5 && !modelEditMode && (
                  <CreateModel
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

                {modelEditMode && currentActive === 5 && (
                  <EditModel
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
              </React.Fragment>
            </div>
          </Layout>
        </Layout>
      </div>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  // loadDataStage: state.loadDataState.activeLoadDataStage,
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
  modelSetupCurrentStep: state.modelDataState.modelSetupCurrentStep
});

const mapDispatchToProps = (dispatch) => ({
  setLoadDataActiveStage: (payload) =>
    dispatch(setLoadDataActiveStageAction(payload)),
  loadPipelineSelectionData: (payload) =>
    dispatch(loadPipelineSelectionDataAction(payload)),
  setSelectedPipeLine: (payload) =>
    dispatch(setSelectedModelDataToStateAction(payload)),
  checkDatabseConnection: (payload) =>
    dispatch(checkDatabseConnectionAction(payload)),
  // createPipelineData: (payload) => dispatch(createPipelineDataAction(payload)),
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
  getBuildDatasetTablesData: () => dispatch(getBuildDatasetTablesDataAction()),
  setCurrentStepToRedux: () => dispatch(setSetModelSetupCurrentStepStateAction()),
  setMaxStepToRedux: (step) => dispatch(setSetModelSetupMaxStepStateAction(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadData);
