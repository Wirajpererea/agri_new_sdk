import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import {
  runPrviewTestQueryAction,
  clearPrviewTestQueryAction,
  testCurrentImportQueryAction,
  clearImportQueryAction,
  executeMigrateDataQueryAction,
  alterImportExecuteQueryAction,
  executeImportDataQueryStatusAction,
} from '../../../../pages/load-data/actions/loadData-action';

import './ToolbarRunButton.scss';
function ToolbarRunButton({
  isRunning,
  runPrviewTestQuery,
  testQuery,
  testQueryStr,
  pipelineExecutionId,
  clearPrviewTestQuery,
  clearImportQuery,
  loadDataStage,
  testCurrentImportQuery,
  importQuery,
  selectedPipeline,
  executeMigrateDataQuery,
  importExecuteQuery,
  testImportQueryStatus,
  executeImportDataQueryStatus,
}) {
  let interval = null;
  const runQuery = () => {
    runPrviewTestQuery({
      testQuery,
      pipelineExecutionId,
    });
  };

  const testImportQuery = () => {
    testCurrentImportQuery({
      importQuery,
    });
  };

  const importExecuteQueryData = (isExecuteOnly) => {
    const { DataPipeID } = selectedPipeline;
    importExecuteQuery({
      isExecuteOnly,
      pipelineId: DataPipeID,
      pipelineExecutionId,
      importQuery,
    });
    // startStatusCheck(isExecuteOnly);
  };

  // const startStatusCheck = (isExecuteOnly) => {
  //   interval = setInterval(() => {
  //     executeImportDataQueryStatus(
  //       {
  //         isExecuteOnly,
  //         pipelineExecutionId,
  //         importQuery,
  //       },
  //       {
  //         checkStatusSuccess,
  //         checkStatusFail,
  //       }
  //     );
  //   }, configConstants.apiTimeOut);
  // };

  // const checkStatusSuccess = () => {
  //   clearInterval(interval);
  // };

  // const checkStatusFail = () => {
  //   clearInterval(interval);
  // };

  return (
    <React.Fragment>
      {loadDataStage === 1 && (
        <React.Fragment>
          <Button
            className="execut-btn toolbar-btn"
            variant="primary"
            onClick={() => clearPrviewTestQuery(false)}
            disabled={isRunning === 'pending' ? true : false}
          >
            Clear
          </Button>
          <Button
            className="execut-btn toolbar-btn"
            variant="primary"
            onClick={runQuery}
            disabled={isRunning === 'pending' || !testQuery ? true : false}
          >
            {loadDataStage === 1 ? 'Run' : 'Test'}
          </Button>
          <span
            style={{
              fontSize: '11px',
              marginLeft: 'auto',
              order: '2',
              marginRight: '10px',
            }}
          >
            Max 100 rows displayed
          </span>
        </React.Fragment>
      )}
      {loadDataStage === 2 && (
        <React.Fragment>
          <Button
            className="check-syntax-btn toolbar-btn"
            variant="primary"
            onClick={testImportQuery}
            disabled={isRunning === 'pending' ? true : false}
          >
            Check Syntax
          </Button>
          <Button
            className="execut-btn toolbar-btn"
            onClick={() =>
              testImportQueryStatus === 'success'
                ? importExecuteQueryData(true)
                : null
            }
            variant="primary"
            disabled={testImportQueryStatus !== 'success' ? true : false}
          >
            Execute
          </Button>
          <Button
            className="save-execut-btn toolbar-btn"
            variant="primary"
            onClick={() =>
              testImportQueryStatus === 'success'
                ? importExecuteQueryData(false)
                : null
            }
            disabled={testImportQueryStatus !== 'success' ? true : false}
          >
            Save and Execute
          </Button>
          <span
            style={{
              fontSize: '11px',
              marginLeft: 'auto',
              order: '2',
              marginRight: '10px',
            }}
          >
            Max 100 rows displayed
          </span>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

ToolbarRunButton.propTypes = {
  isRunning: PropTypes.bool.isRequired,
  runQuery: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  testQuery: state.loadDataState.testQuery,
  testQueryStr: state.loadDataState.testQueryStr,
  importQuery: state.loadDataState.importQuery,
  pipelineExecutionId: state.loadDataState.pipelineExecutionId,
  selectedPipeline: state.loadDataState.selectedPipeline,
  testImportQueryStatus: state.loadDataState.testImportQueryStatus,
});

const mapDispatchToProps = (dispatch) => ({
  executeImportDataQueryStatus: (payload, callbackFn) =>
    dispatch(executeImportDataQueryStatusAction(payload, callbackFn)),
  runPrviewTestQuery: (payload) => dispatch(runPrviewTestQueryAction(payload)),
  clearPrviewTestQuery: (payload) =>
    dispatch(clearPrviewTestQueryAction(payload)),
  clearImportQuery: (payload) => dispatch(clearImportQueryAction(payload)),
  testCurrentImportQuery: (payload) =>
    dispatch(testCurrentImportQueryAction(payload)),
  executeMigrateDataQuery: (payload) =>
    dispatch(executeMigrateDataQueryAction(payload)),
  importExecuteQuery: (payload) =>
    dispatch(alterImportExecuteQueryAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarRunButton);
