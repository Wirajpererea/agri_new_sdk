import React from 'react';
import QueryResultDataTable from '../common/QueryResultContainer.js';

const QueryEditiorResult = ({
  queryResult,
  isRunning,
  loadDataStage,
  importQueryValidation,
  alterImportQueryStatus,
  alterImportQueryOutput,
}) => {
  return (
    <QueryResultDataTable
      isRunning={isRunning}
      queryError={isRunning === 'error' ? 'Query error' : null}
      queryResult={queryResult}
      importQueryValidation={importQueryValidation}
      loadDataStage={loadDataStage}
      alterImportQueryStatus={alterImportQueryStatus}
      alterImportQueryOutput={alterImportQueryOutput}
    />
  );
};

export default QueryEditiorResult;
