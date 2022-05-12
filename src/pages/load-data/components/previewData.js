import React from 'react';
import LocalFilePreviewData from './LocalFilePreviewData';
import ServerPreviewData from './serverPreviewData';
import './previewData.scss';

const PreviewData = ({
  currentActive,
  csvData,
  csvName,
  csvFile,
  selectedModelTypeData,
  sourceData,
  connectionSuccess,
  headerStatusHandler,
  pipelineExecutionId,
  seporatorHandler,
  skipNRowsHandler,
  defaultDeliminator,
  importFileDataHandler,
  importFileDataStatus,
  importFileDataMessage,
  restartPipeline,
  skipRowCount,
  isCustomHeader,
}) => {
  return (
    <div>
      {csvFile && sourceData === 'csvDetails' ? (
        <LocalFilePreviewData
          headerStatusHandler={headerStatusHandler}
          csvName={csvName}
          csvFile={csvFile}
          seporatorHandler={seporatorHandler}
          skipNRowsHandler={skipNRowsHandler}
          defaultDeliminator={defaultDeliminator}
          importFileDataHandler={importFileDataHandler}
          importFileDataStatus={importFileDataStatus}
          importFileDataMessage={importFileDataMessage}
          restartPipeline={restartPipeline}
          skipRowCount={skipRowCount}
          isCustomHeader={isCustomHeader}
        />
      ) : (
        ''
      )}
      {connectionSuccess && sourceData === 'serverDetails' ? (
        <ServerPreviewData />
      ) : (
        ''
      )}
    </div>
  );
};

export default PreviewData;
