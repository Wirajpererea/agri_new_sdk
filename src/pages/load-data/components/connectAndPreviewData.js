import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import ConnectData from './connectData';
import PreviewData from './previewData';
import Papa from 'papaparse';

const { TabPane } = Tabs;

const ConnectAndPreviewData = ({
  goBackStage,
  goNextStage,
  checkDatabseConnection,
  userData,
  connectionPending,
  connectionSuccess,
  connectionError,
  connectionResponse,
  pipelineExecutionId,
  migrateQueryStatus,
  resetPipelineConnection,
  clearPrviewTestQuery,
  importFileData,
  selectedPipeline,
  importFileDataStatus,
  importFileDataMessage,
  dataSource,
  setDataSourceType,
  restartPipeline,
  executeNoteBookData,
  newStep
}) => {
  const [activeTab, setActiveTab] = useState(
    connectionSuccess ? 'preview' : 'connect'
  );
  const [uploadingStatus, setUploadingStatus] = useState(false);
  const [csvName, setCsvName] = useState('');
  const [csvFile, setCSVFile] = useState(null);
  const [fileUploaderStatus, setFileUploaderStatus] = useState(false);
  const [sourceData, setSourceData] = useState(dataSource);
  const [seporatorState, setSeporatorState] = useState(',');
  const [fileUrlState, setFileUrlState] = useState(null);
  const [csvFileData, setCsvFileData] = useState(null);
  const [defaultDeliminator, setDefaultDeliminator] = useState('comma');
  const [previewSQLState, setPreviewSQLState] = useState(null);
  const [skipRowCount, setSkipRowCount] = useState(0);
  const [columnHeaders, setColumnHeaders] = useState('');
  const [isCustomHeader, setIsCustomHeader] = useState(false);

  useEffect(() => {
    if (
      newStep && ( migrateQueryStatus === 'success' ||
      importFileDataStatus === 'success')
    ) {
      goNextStage();
      
      clearPrviewTestQuery();
    }
  }, [
    clearPrviewTestQuery,
    goNextStage,
    importFileDataStatus,
    migrateQueryStatus,
    sourceData,
  ]);

  useEffect(() => {
    if (connectionSuccess) {
      setActiveTab('preview');
    }
  }, [connectionSuccess]);

  const connectDataHandler = (data) => {
    const { dbServer, dbType, password, userName, database } = data;
    const dataParams = {
      dbServerType: dbType,
      dbUserName: userName,
      dbUserPassword: password,
      dbServerName: dbServer,
      dbName: database,
      userId: userData.UserID,
      pipelineExecutionId: pipelineExecutionId,
    };
    resetPipelineConnection();
    checkDatabseConnection(dataParams);
    setPreviewSQLState(true);
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const previewHandler = (status) => {
    setDataSourceType(status);
    setSourceData(status);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const uploadingCSVHandler = (status, file, seporator) => {
    setDefaultDeliminator('comma');
    setPreviewSQLState(false);
    if (status) {
      setActiveTab('preview');
    }
    setCsvName(file.name);
    setUploadingStatus(status);
    getBase64(file.originFileObj, (fileUrl) => {
      setFileUrlState(fileUrl);
      dataParser(fileUrl, seporator);
    });
  };

  const seporatorHandler = (val) => {
    let seporator = seporatorState;
    setDefaultDeliminator(val);
    setSkipRowCount(0);
    setIsCustomHeader(false);
    if (val === 'comma') {
      seporator = ',';
    } else if (val === 'space') {
      seporator = ' ';
    } else if (val === 'tab') {
      seporator = '\t';
    }
    setSeporatorState(seporator);
    dataParser(fileUrlState, seporator);
  };

  const dataParser = (fileUrl, seporator) => {
    Papa.parse(fileUrl, {
      download: true,
      header: false,
      comments: '#',
      delimiter: seporator,
      preview: 100,
      complete: (results) => {
        setColumnHeaders(results.data[0]);
        setSkipRowCount(0);
        setCsvFileData(results.data);
        setCSVFile(results.data);
        setFileUploaderStatus(true);
      },
    });
  };

  const optionHandler = (value, type) => {
    if (type === 'skip-rows') {
      setSkipRowCount(value);
      const skipFileData = csvFileData.filter((x, i) => {
        if (i > value - 1) {
          return true;
        }
      });
      if (isCustomHeader) {
        setCSVFile([columnHeaders, ...skipFileData]);
      } else {
        setCSVFile(skipFileData);
      }
    } else {
      const skipFileData = csvFileData.filter((x, i) => {
        if (i > skipRowCount - 1) {
          return true;
        }
      });
      const columnCount = Object.keys(skipFileData[0]).length;
      const customHeader = [];
      for (let i = 0; i < columnCount; i++) {
        customHeader.push(`Header ${i + 1}`);
      }
      if (!value) {
        setColumnHeaders(customHeader);
        setCSVFile([customHeader, ...skipFileData]);
        setIsCustomHeader(true);
      } else {
        setCSVFile(skipFileData);
        setIsCustomHeader(false);
      }
    }
  };

  const importFileDataHandler = () => {
    const { DataPipeID } = selectedPipeline;
    importFileData({
      pipelineExecutionId,
      pipelineId: DataPipeID,
      columnSeperator: defaultDeliminator,
      fileName: csvName,
      firstRowStartsFrom: skipRowCount,
      columnHeaders,
    });
  };

  return (
    <div>
    <Tabs
      defaultActiveKey="connect"
      activeKey={activeTab}
      onChange={handleTabChange}
    >
      <TabPane tab="Connect Data" key="connect">
        <ConnectData
          connectDataHandler={connectDataHandler}
          uploadingCSVHandler={uploadingCSVHandler}
          connectionPending={connectionPending}
          connectionSuccess={connectionSuccess}
          connectionError={connectionError}
          connectionResponse={connectionResponse}
          previewHandler={previewHandler}
          resetPipelineConnection={resetPipelineConnection}
          setSeporatorState={setSeporatorState}
          clearPrviewTestQuery={clearPrviewTestQuery}
          restartPipeline={restartPipeline}
          executeNoteBookData={executeNoteBookData}
          pipelineExecutionId={pipelineExecutionId}
          goBackStage={goBackStage}
        />
      </TabPane>
      <TabPane
        tab="Preview Data"
        key="preview"
        disabled={
          (!connectionPending && connectionSuccess) || csvFile ? false : true
        }
        uploadingStatus={uploadingStatus}
      >
        <PreviewData
          previewSQLState={previewSQLState}
          csvName={csvName}
          fileUploaderStatus={fileUploaderStatus}
          csvFile={csvFile}
          sourceData={sourceData}
          connectionSuccess={connectionSuccess}
          skipNRowsHandler={(value) => optionHandler(value, 'skip-rows')}
          pipelineExecutionId={pipelineExecutionId}
          seporatorHandler={seporatorHandler}
          headerStatusHandler={(value) => optionHandler(value, 'change-header')}
          defaultDeliminator={defaultDeliminator}
          importFileDataHandler={importFileDataHandler}
          importFileDataStatus={importFileDataStatus}
          importFileDataMessage={importFileDataMessage}
          restartPipeline={restartPipeline}
          skipRowCount={skipRowCount}
          isCustomHeader={isCustomHeader}
        />
      </TabPane>
    </Tabs>
    
    </div>
  );
};

export default ConnectAndPreviewData;
