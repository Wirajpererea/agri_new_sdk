import React from 'react';
import ErrorBlock from './ErrorBlock';
import InfoBlock from './InfoBlock';
import QueryResultDataTable from './QueryResultDataTable';
import QueryResultRunning from './QueryResultRunning';

function QueryResultContainer({
  isRunning,
  queryError,
  queryResult,
  loadDataStage,
  importQueryValidation,
  alterImportQueryStatus,
  alterImportQueryOutput,
}) {
  if (loadDataStage === 2) {
    if (queryError) {
      return <ErrorBlock>{importQueryValidation}</ErrorBlock>;
    } else {
      if (alterImportQueryStatus) {
        if (alterImportQueryStatus === 'success') {
          if (Object.keys(queryResult).length > 0) {
            return <QueryResultDataTable queryResult={queryResult} />;
          } else {
            const result = alterImportQueryOutput;
            return (
              <InfoBlock>
                {result.NoOfRowsEffected
                  ? `Query execute successfully (${result.NoOfRowsEffected} rows affected)`
                  : 'Query execute successfully'}
              </InfoBlock>
            );
          }
        }
        if (alterImportQueryStatus === 'error') {
          return <ErrorBlock>Query execute error</ErrorBlock>;
        }
      } else {
        return <InfoBlock>{importQueryValidation}</InfoBlock>;
      }
    }
  }
  if (isRunning === 'pending') {
    return <QueryResultRunning />;
  }
  if (queryError) {
    return <ErrorBlock>{queryError}</ErrorBlock>;
  }
  if (!isRunning) {
    return null;
  }
  if (
    queryResult.length > 0 &&
    queryResult.row.length === 0 &&
    isRunning === 'success'
  ) {
    return (
      <InfoBlock>
        Query finished
        <br />
        No rows returned
      </InfoBlock>
    );
  }
  return <QueryResultDataTable queryResult={queryResult} />;
}

export default QueryResultContainer;
