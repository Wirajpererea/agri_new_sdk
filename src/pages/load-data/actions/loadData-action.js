import {
  getPipelineSelectionDataApi,
  checkDatabaseConnectionApi,
  createPipelineDataApi,
  getUserPipelineExecutionApi,
  getPrviewTestQueryDataApi,
  setMigrateRemoteDataApi,
  exportPipelineDataApi,
  loadImportQueryDataApi,
  alterImportQueryDataApi,
  loadPrviewTestQueryApi,
  testImportQueryValidApi,
  scheduleDataPipelineApi,
  importFileDataApi,
  executeMigrateDataStatusApi,
  executeImportDataStatusApi,
  executeNotebookDataApi,
} from '../services/loadData-service';

export const SET_LOAD_DATA_ACTIVE_STAGE = 'SET_LOAD_DATA_ACTIVE_STAGE';
export const SET_LOAD_PIPELINE_SELECTION_PENDING =
  'SET_LOAD_PIPELINE_SELECTION_PENDING';
export const SET_LOAD_PIPELINE_SELECTION_SUCCESS =
  'SET_LOAD_PIPELINE_SELECTION_SUCCESS';
export const SET_LOAD_PIPELINE_SELECTION_ERROR =
  'SET_LOAD_PIPELINE_SELECTION_ERROR';
export const SET_SELECTED_PIPELINE = 'SET_SELECTED_PIPELINE';

export const CHECK_DATABASE_CONNECTION_PENDING =
  'CHECK_DATABASE_CONNECTION_PENDING';
export const CHECK_DATABASE_CONNECTION_SUCCESS =
  'CHECK_DATABASE_CONNECTION_SUCCESS';
export const CHECK_DATABASE_CONNECTION_ERROR =
  'CHECK_DATABASE_CONNECTION_ERROR';

export const SET_CREATE_PIPELINE_DATA_PENDING =
  'SET_CREATE_PIPELINE_DATA_PENDING';
export const SET_CREATE_PIPELINE_DATA_SUCCESS =
  'SET_CREATE_PIPELINE_DATA_SUCCESS';
export const SET_CREATE_PIPELINE_DATA_ERROR = 'SET_CREATE_PIPELINE_DATA_ERROR';
export const RESET_LOAD_DATA = 'RESET_LOAD_DATA';

export const SET_USER_PIPELINE_EXECUTION_PENDING =
  'SET_USER_PIPELINE_EXECUTION_PENDING';
export const SET_USER_PIPELINE_EXECUTION_SUCCESS =
  'SET_USER_PIPELINE_EXECUTION_SUCCESS';
export const SET_USER_PIPELINE_EXECUTION_ERROR =
  'SET_USER_PIPELINE_EXECUTION_ERROR';
export const SET_TEST_QUERY = 'SET_TEST_QUERY';

export const RUN_PREVIEW_TEST_QUERY_PENDING = 'RUN_PREVIEW_TEST_QUERY_PENDING';
export const RUN_PREVIEW_TEST_QUERY_SUCCESS = 'RUN_PREVIEW_TEST_QUERY_SUCCESS';
export const RUN_PREVIEW_TEST_QUERY_ERROR = 'RUN_PREVIEW_TEST_QUERY_ERROR';

export const EXECUTE_MIGRATE_QUERY_PENDING = 'EXECUTE_MIGRATE_QUERY_PENDING';
export const EXECUTE_MIGRATE_QUERY_SUCCESS = 'EXECUTE_MIGRATE_QUERY_SUCCESS';
export const EXECUTE_MIGRATE_QUERY_ERROR = 'EXECUTE_MIGRATE_QUERY_ERROR';

export const EXPORT_PIPELINE_DATA_PENDING = 'EXPORT_PIPELINE_DATA_PENDING';
export const EXPORT_PIPELINE_DATA_SUCCESS = 'EXPORT_PIPELINE_DATA_SUCCESS';
export const EXPORT_PIPELINE_DATA_ERROR = 'EXPORT_PIPELINE_DATA_ERROR';

export const LOAD_IMPORT_EXECUTE_QUERY_PENDING =
  'LOAD_IMPORT_EXECUTE_QUERY_PENDING';
export const LOAD_IMPORT_EXECUTE_QUERY_SUCCESS =
  'LOAD_IMPORT_EXECUTE_QUERY_SUCCESS';
export const LOAD_IMPORT_EXECUTE_QUERY_ERROR =
  'LOAD_IMPORT_EXECUTE_QUERY_ERROR';

export const ALTER_IMPORT_EXECUTE_QUERY_PENDING =
  'ALTER_IMPORT_EXECUTE_QUERY_PENDING';
export const ALTER_IMPORT_EXECUTE_QUERY_SUCCESS =
  'ALTER_IMPORT_EXECUTE_QUERY_SUCCESS';
export const ALTER_IMPORT_EXECUTE_QUERY_ERROR =
  'ALTER_IMPORT_EXECUTE_QUERY_ERROR';

export const RESET_CONNECTION_PIPLINE_DATA = 'RESET_CONNECTION_PIPLINE_DATA';

export const LOAD_PREVIEW_TEST_QUERY_PENDING =
  'LOAD_PREVIEW_TEST_QUERY_PENDING';

export const LOAD_PREVIEW_TEST_QUERY_SUCCESS =
  'LOAD_PREVIEW_TEST_QUERY_SUCCESS';

export const LOAD_PREVIEW_TEST_QUERY_ERROR = 'LOAD_PREVIEW_TEST_QUERY_ERROR';

export const CLEAR_PREVIEW_TEST_QUERY_SUCCESS =
  'CLEAR_PREVIEW_TEST_QUERY_SUCCESS';

export const CLEAR_IMPORT_QUERY_SUCCESS = 'CLEAR_IMPORT_QUERY_SUCCESS';

export const TEST_IMPORT_QUERY_PENDING = 'TEST_IMPORT_QUERY_PENDING';

export const TEST_IMPORT_QUERY_SUCCESS = 'TEST_IMPORT_QUERY_SUCCESS';

export const TEST_IMPORT_QUERY_ERROR = 'TEST_IMPORT_QUERY_ERROR';

export const RESET_MIGRATE_DATA = 'RESET_MIGRATE_DATA';

export const RESET_IMPORT_DATA = 'RESET_IMPORT_DATA';

export const SCHEDULE_DATA_PIPELINE_PENDING = 'SCHEDULE_DATA_PIPELINE_PENDING';

export const SCHEDULE_DATA_PIPELINE_SUCCESS = 'SCHEDULE_DATA_PIPELINE_SUCCESS';

export const SCHEDULE_DATA_PIPELINE_ERROR = 'SCHEDULE_DATA_PIPELINE_ERROR';

export const RESET_EXPORT_PIPELINE_DATA = 'RESET_EXPORT_PIPELINE_DATA';

export const IMPORT_FILE_DATA_PENDING = 'IMPORT_FILE_DATA_PENDING';

export const IMPORT_FILE_DATA_SUCCESS = 'IMPORT_FILE_DATA_SUCCESS';

export const IMPORT_FILE_DATA_ERROR = 'IMPORT_FILE_DATA_ERROR';

export const SET_PIPLINE_EXECUTION_BY_NAVIGATION =
  'SET_PIPLINE_EXECUTION_BY_NAVIGATION';

export const SET_DATA_SOURCE_TYPE = 'SET_DATA_SOURCE_TYPE';

export const RESTART_DATA_PIPELEINE = 'RESTART_DATA_PIPELEINE';

export const SET_PIPELINE_SELECTION = 'SET_PIPELINE_SELECTION';

export const EXECUTE_NOTEBOOK_DATA_PENDING = 'EXECUTE_NOTEBOOK_DATA_PENDING';

export const EXECUTE_NOTEBOOK_DATA_SUCCESS = 'EXECUTE_NOTEBOOK_DATA_SUCCESS';

export const EXECUTE_NOTEBOOK_DATA_ERROR = 'EXECUTE_NOTEBOOK_DATA_ERROR';

export const RESET_DATA_SOURCE_TYPE = 'RESET_DATA_SOURCE_TYPE';

const loadPipelineSelectionPending = (payload) => ({
  type: SET_LOAD_PIPELINE_SELECTION_PENDING,
  payload,
});

const loadPipelineSelectionSuccess = (payload, data) => ({
  type: SET_LOAD_PIPELINE_SELECTION_SUCCESS,
  data,
  payload,
});

const loadPipelineSelectionError = (payload) => ({
  type: SET_LOAD_PIPELINE_SELECTION_ERROR,
  payload,
});

//

const createPipelineDataPending = (payload) => ({
  type: SET_CREATE_PIPELINE_DATA_PENDING,
  payload,
});

const createPipelineDataSuccess = (payload, data) => ({
  type: SET_CREATE_PIPELINE_DATA_SUCCESS,
  data,
  payload,
});

const createPipelineDataError = (payload) => ({
  type: SET_CREATE_PIPELINE_DATA_ERROR,
  payload,
});

//

const checkDatabaseConnectionPending = (payload) => ({
  type: CHECK_DATABASE_CONNECTION_PENDING,
  payload,
});

const checkDatabaseConnectionSuccess = (payload, data) => ({
  type: CHECK_DATABASE_CONNECTION_SUCCESS,
  data,
  payload,
});

const checkDatabaseConnectionError = (payload, data) => ({
  type: CHECK_DATABASE_CONNECTION_ERROR,
  payload,
  data,
});

const setUserPipelineExecutionPending = (pending) => ({
  type: SET_USER_PIPELINE_EXECUTION_PENDING,
  status: pending,
});

const setUserPipelineExecutionSuccess = (success, payload) => ({
  type: SET_USER_PIPELINE_EXECUTION_SUCCESS,
  status: success,
  payload,
});

const setUserPipelineExecutionError = (error) => ({
  type: SET_USER_PIPELINE_EXECUTION_ERROR,
  status: error,
});

const runPrviewTestQueryPending = (status) => ({
  type: RUN_PREVIEW_TEST_QUERY_PENDING,
  status,
});

const runPrviewTestQuerySuccess = (status, payload) => ({
  type: RUN_PREVIEW_TEST_QUERY_SUCCESS,
  status,
  payload,
});

const runPrviewTestQueryError = (status) => ({
  type: RUN_PREVIEW_TEST_QUERY_ERROR,
  status,
});

const executeMigrateDataQueryPending = (status) => ({
  type: EXECUTE_MIGRATE_QUERY_PENDING,
  status,
});

const executeMigrateDataQuerySuccess = (status) => ({
  type: EXECUTE_MIGRATE_QUERY_SUCCESS,
  status,
});

const executeMigrateDataQueryError = (status) => ({
  type: EXECUTE_MIGRATE_QUERY_ERROR,
  status,
});

const exportPipelineDataPending = (status) => ({
  type: EXPORT_PIPELINE_DATA_PENDING,
  status,
});

const exportPipelineDataSuccess = (status, payload) => ({
  type: EXPORT_PIPELINE_DATA_SUCCESS,
  status,
  payload,
});

const exportPipelineDataError = (status) => ({
  type: EXPORT_PIPELINE_DATA_ERROR,
  status,
});

const loadImportExecuteQueryPending = (status) => ({
  type: LOAD_IMPORT_EXECUTE_QUERY_PENDING,
  status,
});

const loadImportExecuteQuerySuccess = (status, payload) => ({
  type: LOAD_IMPORT_EXECUTE_QUERY_SUCCESS,
  status,
  payload,
});

const loadImportExecuteQueryError = (status) => ({
  type: LOAD_IMPORT_EXECUTE_QUERY_ERROR,
  status,
});

const alterImportExecuteQueryPending = (status) => ({
  type: ALTER_IMPORT_EXECUTE_QUERY_PENDING,
  status,
});

const alterImportExecuteQuerySuccess = (
  status,
  payload,
  queryData,
  isExecuteOnly
) => ({
  type: ALTER_IMPORT_EXECUTE_QUERY_SUCCESS,
  status,
  payload,
  queryData,
  isExecuteOnly,
});

const alterImportExecuteQueryError = (status) => ({
  type: ALTER_IMPORT_EXECUTE_QUERY_ERROR,
  status,
});

const loadPrviewTestQueryPending = (status) => ({
  type: LOAD_PREVIEW_TEST_QUERY_PENDING,
  status,
});

const loadPrviewTestQuerySuccess = (status, data) => ({
  type: LOAD_PREVIEW_TEST_QUERY_SUCCESS,
  status,
  data,
});

const loadPrviewTestQueryError = (status) => ({
  type: LOAD_PREVIEW_TEST_QUERY_ERROR,
  status,
});

const testImportQueryPending = (status) => ({
  type: TEST_IMPORT_QUERY_PENDING,
  status,
});

const testImportQuerySuccess = (status, data) => ({
  type: TEST_IMPORT_QUERY_SUCCESS,
  status,
  data,
});

const testImportQueryError = (status, data) => ({
  type: TEST_IMPORT_QUERY_ERROR,
  status,
  data,
});

const scheduleDataPipelinePending = (status) => ({
  type: SCHEDULE_DATA_PIPELINE_PENDING,
  status,
});

const scheduleDataPipelineSuccess = (status, data) => ({
  type: SCHEDULE_DATA_PIPELINE_SUCCESS,
  status,
  data,
});

const scheduleDataPipelineError = (status, data) => ({
  type: SCHEDULE_DATA_PIPELINE_ERROR,
  status,
  data,
});

const importFileDataPending = (status) => ({
  type: IMPORT_FILE_DATA_PENDING,
  status,
});

const importFileDataSuccess = (status, data) => ({
  type: IMPORT_FILE_DATA_SUCCESS,
  status,
  data,
});

const importFileDataError = (status, data) => ({
  type: IMPORT_FILE_DATA_ERROR,
  status,
  data,
});

export const setLoadDataActiveStageAction = (payload) => ({
  type: SET_LOAD_DATA_ACTIVE_STAGE,
  payload,
});

export const setSelectedPipeLineAction = (payload) => ({
  type: SET_SELECTED_PIPELINE,
  payload,
});

export const loadPipelineSelectionDataAction = () => {
  return async (dispatch) => {
    dispatch(loadPipelineSelectionPending(true));
    dispatch(loadPipelineSelectionSuccess(false, []));
    dispatch(loadPipelineSelectionError(null));
    try {
      const response = await getPipelineSelectionDataApi();
      dispatch(loadPipelineSelectionPending(false));
      if (response.data.message === 'success') {
        dispatch(loadPipelineSelectionSuccess(true, response.data.body));
      } else {
        dispatch(
          loadPipelineSelectionError(true, {
            message: 'Pipeline selection data load error',
          })
        );
      }
    } catch (err) {
      dispatch(loadPipelineSelectionPending(false));
      dispatch(loadPipelineSelectionError({ message: 'Network error' }));
    }
  };
};

export const createPipelineDataAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(createPipelineDataPending(true));
    dispatch(createPipelineDataSuccess(false, []));
    dispatch(createPipelineDataError(null));
    try {
      const response = await createPipelineDataApi(dataParams);
      dispatch(createPipelineDataPending(false));
      if (response.data.message === 'success') {
        dispatch(
          createPipelineDataSuccess(
            true,
            response.data.body.PipeLineExecutionID
          )
        );
        return true;
      } else {
        dispatch(
          createPipelineDataError(true, {
            message: 'Pipeline creation error',
          })
        );
        return false;
      }
    } catch (err) {
      dispatch(createPipelineDataPending(false));
      dispatch(createPipelineDataError({ message: 'Network error' }));
    }
  };
};

export const checkDatabseConnectionAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(checkDatabaseConnectionPending(true));
    dispatch(checkDatabaseConnectionSuccess(false, []));
    dispatch(checkDatabaseConnectionError(null, null));
    try {
      const response = await checkDatabaseConnectionApi(dataParams);
      dispatch(checkDatabaseConnectionPending(false));
      if (response.data.message === 'success') {
        if (response.data.body[0].OprStatus) {
          dispatch(checkDatabaseConnectionSuccess(true, response.data.body));
        } else {
          dispatch(checkDatabaseConnectionError(true, response.data.body));
        }
      } else {
        dispatch(checkDatabaseConnectionError(true, response.data.body));
      }
    } catch (err) {
      dispatch(checkDatabaseConnectionPending(false));
      dispatch(checkDatabaseConnectionError({ message: 'Connection failed' }));
    }
  };
};

export const setUserPipelineExecutionAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(setUserPipelineExecutionPending('peding'));
    dispatch(setUserPipelineExecutionSuccess(null));
    dispatch(setUserPipelineExecutionError(null));
    try {
      const response = await getUserPipelineExecutionApi(dataParams);
      dispatch(setUserPipelineExecutionPending(null));
      if (response.data.message === 'success') {
        dispatch(
          setUserPipelineExecutionSuccess('success', response.data.body)
        );
      } else {
        dispatch(setUserPipelineExecutionError('error'));
      }
    } catch (err) {
      dispatch(setUserPipelineExecutionPending(null));
      dispatch(setUserPipelineExecutionError('error'));
    }
  };
};

export const loadPrviewTestQueryAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(loadPrviewTestQuerySuccess(null, null));
    dispatch(loadPrviewTestQueryError(null));
    dispatch(loadPrviewTestQueryPending('peding'));
    try {
      const response = await loadPrviewTestQueryApi(dataParams);
      dispatch(loadPrviewTestQueryPending(null));
      if (response.data.message === 'success') {
        if (response.data.body[0].ParseStatus) {
          const query = response.data.body[0].ProcedureCode;
          dispatch(loadPrviewTestQuerySuccess('success', query));
        } else {
          dispatch(loadPrviewTestQueryError('error'));
        }
      } else {
        dispatch(loadPrviewTestQueryError('error'));
      }
    } catch (err) {
      dispatch(loadPrviewTestQueryPending(null));
      dispatch(loadPrviewTestQueryError('error'));
    }
  };
};

export const setTestQueryAction = (sqlQueryData) => ({
  type: SET_TEST_QUERY,
  payload: sqlQueryData,
});

export const runPrviewTestQueryAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(runPrviewTestQuerySuccess(null, []));
    dispatch(runPrviewTestQueryError(null));
    dispatch(runPrviewTestQueryPending('pending'));
    try {
      const response = await getPrviewTestQueryDataApi(dataParams);
      dispatch(runPrviewTestQueryPending(null));
      if (response.data.message === 'success') {
        dispatch(runPrviewTestQuerySuccess('success', response.data.body));
      } else {
        dispatch(runPrviewTestQueryError('error'));
      }
    } catch (err) {
      dispatch(runPrviewTestQueryPending(null));
      dispatch(runPrviewTestQueryError('error'));
    }
  };
};

export const clearPrviewTestQueryAction = (deleteSourceType = null) => ({
  type: CLEAR_PREVIEW_TEST_QUERY_SUCCESS,
  deleteSourceType,
});

export const clearImportQueryAction = () => ({
  type: CLEAR_IMPORT_QUERY_SUCCESS,
});

export const executeMigrateDataQueryAction = (dataParams) => {
  return async (dispatch) => {
    try {
      await setMigrateRemoteDataApi(dataParams);
    } catch (err) {
      dispatch(executeMigrateDataQueryError('success'));
    }
  };
};

export const exportPipelineDataAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(exportPipelineDataSuccess(null));
    dispatch(exportPipelineDataError(null));
    dispatch(exportPipelineDataPending('pending'));
    try {
      const response = await exportPipelineDataApi(dataParams);
      dispatch(exportPipelineDataPending(null));
      if (response.data.message === 'success') {
        dispatch(exportPipelineDataSuccess('success', response.data.body));
      } else {
        dispatch(exportPipelineDataError('error'));
      }
    } catch (err) {
      dispatch(exportPipelineDataPending(null));
      dispatch(exportPipelineDataError('error'));
    }
  };
};

export const loadImportExecuteQueryAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(loadImportExecuteQuerySuccess(null, null));
    dispatch(loadImportExecuteQueryError(null));
    dispatch(loadImportExecuteQueryPending('pending'));
    dispatch(testImportQuerySuccess(null, null));
    dispatch(testImportQueryError(null, null));
    try {
      const response = await loadImportQueryDataApi(dataParams);
      dispatch(loadImportExecuteQueryPending(null));
      if (response.data.message === 'success') {
        if (response.data.body[0].ParseStatus) {
          const query = response.data.body[0].ProcedureCode;
          dispatch(loadImportExecuteQuerySuccess('success', query));
        } else {
          dispatch(loadImportExecuteQueryError('error'));
        }
      } else {
        dispatch(loadImportExecuteQueryError('error'));
      }
    } catch (err) {
      dispatch(loadImportExecuteQueryPending(null));
      dispatch(loadImportExecuteQueryError('error'));
    }
  };
};

export const alterImportExecuteQueryAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(alterImportExecuteQuerySuccess(null, null, {}, null));
    dispatch(alterImportExecuteQueryError(null));
    dispatch(alterImportExecuteQueryPending('pending'));
    try {
      const response = await alterImportQueryDataApi(dataParams);
      dispatch(alterImportExecuteQueryPending(null));
      if (response.data.message === 'success') {
        dispatch(
          alterImportExecuteQuerySuccess(
            'success',
            response.data.body.dataStatus,
            response.data.body.data ? response.data.body.data : {},
            dataParams.isExecuteOnly
          )
        );
      } else {
        dispatch(alterImportExecuteQueryError('error'));
      }
    } catch (err) {
      dispatch(alterImportExecuteQueryPending(null));
      dispatch(alterImportExecuteQueryError('error'));
    }
  };
};

export const testCurrentImportQueryAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(testImportQuerySuccess(null, null));
    dispatch(testImportQueryError(null, null));
    dispatch(testImportQueryPending('pending'));
    try {
      const response = await testImportQueryValidApi(dataParams);
      dispatch(testImportQueryPending(null));
      if (response.data.message === 'success') {
        if (response.data.body[0].ParseStatus) {
          dispatch(
            testImportQuerySuccess('success', 'Query parsed successfully')
          );
        } else {
          dispatch(
            testImportQueryError('error', response.data.body[0].ErrorMessage)
          );
        }
      } else {
        dispatch(testImportQueryError('error', 'Server error'));
      }
    } catch (err) {
      dispatch(testImportQueryPending(null));
      dispatch(testImportQueryError('error', 'Server error'));
    }
  };
};

export const scheduleDataPipelineAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(scheduleDataPipelineSuccess(null, null));
    dispatch(scheduleDataPipelineError(null, null));
    dispatch(scheduleDataPipelinePending('pending'));
    try {
      const response = await scheduleDataPipelineApi(dataParams);
      dispatch(scheduleDataPipelinePending(null));
      if (response.data.message === 'success') {
        if (response.data.body[0].OprStatus) {
          dispatch(scheduleDataPipelineSuccess('success', ''));
        } else {
          dispatch(
            scheduleDataPipelineError(
              'error',
              response.data.body[0].ErrorMessage
            )
          );
        }
      } else {
        dispatch(scheduleDataPipelineError('error', 'Server error'));
      }
    } catch (err) {
      dispatch(scheduleDataPipelinePending(null));
      dispatch(scheduleDataPipelineError('error', 'Server error'));
    }
  };
};

export const importFileDataAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(importFileDataSuccess(null, null));
    dispatch(importFileDataError(null, null));
    dispatch(importFileDataPending('pending'));
    try {
      const response = await importFileDataApi(dataParams);
      dispatch(importFileDataPending(null));
      if (response.data.message === 'success') {
        if (response.data.body[0].OprStatus) {
          dispatch(importFileDataSuccess('success', ''));
        } else {
          dispatch(
            importFileDataError('error', response.data.body[0].ErrorMessage)
          );
        }
      } else {
        dispatch(importFileDataError('error', 'Server error'));
      }
    } catch (err) {
      dispatch(importFileDataPending(null));
      dispatch(importFileDataError('error', 'Server error'));
    }
  };
};

export const setExistingPiplineExecutionAction = (dataParams) => ({
  type: SET_PIPLINE_EXECUTION_BY_NAVIGATION,
  payload: dataParams,
});

export const setDataSourceTypeAction = (dataParams) => ({
  type: SET_DATA_SOURCE_TYPE,
  payload: dataParams,
});

export const resetDataSourceTypeAction = () => ({
  type: RESET_DATA_SOURCE_TYPE,
});

export const restartPipelineAction = () => ({
  type: RESTART_DATA_PIPELEINE,
});

export const resetPipelineConnectionAction = () => ({
  type: RESET_CONNECTION_PIPLINE_DATA,
});

export const setSelectedPipelineAction = (data) => ({
  type: SET_PIPELINE_SELECTION,
  data,
  payload: 'success',
});

export const resetMigrateDataAction = () => ({
  type: RESET_MIGRATE_DATA,
});

export const resetImportDataAction = () => ({
  type: RESET_IMPORT_DATA,
});

export const resetExportPipelineAction = () => ({
  type: RESET_EXPORT_PIPELINE_DATA,
});

export const resetLoadDataAction = () => ({
  type: RESET_LOAD_DATA,
});

export const executeNoteBookDataPending = (status) => ({
  type: EXECUTE_NOTEBOOK_DATA_PENDING,
  status,
});

export const executeNoteBookDataSuccess = (status) => ({
  type: EXECUTE_NOTEBOOK_DATA_SUCCESS,
  status,
});

export const executeNoteBookDataError = (status) => ({
  type: EXECUTE_NOTEBOOK_DATA_ERROR,
  status,
});

export const executeMigrateDataQueryStatusAction = (dataParams, callbackFn) => {
  return async (dispatch) => {
    const { checkStatusSuccess, checkStatusFail } = callbackFn;
    dispatch(executeMigrateDataQuerySuccess(null));
    dispatch(executeMigrateDataQueryError(null));
    dispatch(executeMigrateDataQueryPending('pending'));
    try {
      const response = await executeMigrateDataStatusApi(dataParams);
      if (response.data.message === 'success') {
        if (response.data.body[0]['ParseStatus'] === 1) {
          checkStatusSuccess();
          dispatch(executeMigrateDataQueryPending(null));
          dispatch(executeMigrateDataQuerySuccess('success'));
        }
        if (response.data.body[0]['ParseStatus'] === 2) {
          checkStatusFail();
          dispatch(executeMigrateDataQueryPending(null));
          dispatch(executeMigrateDataQueryError('error'));
        }
      } else {
        dispatch(executeMigrateDataQueryPending(null));
        dispatch(executeMigrateDataQueryError('error'));
      }
    } catch (err) {
      checkStatusFail();
      dispatch(executeMigrateDataQueryPending(null));
      dispatch(executeMigrateDataQueryError('error'));
    }
  };
};

export const executeImportDataQueryStatusAction = (dataParams, callbackFn) => {
  return async (dispatch) => {
    const { checkStatusSuccess, checkStatusFail } = callbackFn;
    dispatch(alterImportExecuteQuerySuccess(null, null, {}, null));
    dispatch(alterImportExecuteQueryError(null));
    dispatch(alterImportExecuteQueryPending('pending'));
    try {
      const response = await alterImportQueryDataApi(dataParams);
      dispatch(alterImportExecuteQueryPending(null));
      if (response.data.message === 'success') {
        if (response.data.body[0]['ParseStatus'] === 1) {
          checkStatusSuccess();
          dispatch(
            alterImportExecuteQuerySuccess(
              'success',
              response.data.body.dataStatus,
              response.data.body.data ? response.data.body.data : {},
              dataParams.isExecuteOnly
            )
          );
        }
        if (response.data.body[0]['ParseStatus'] === 2) {
          checkStatusFail();
          dispatch(alterImportExecuteQueryError('success'));
        }
      } else {
        dispatch(alterImportExecuteQueryError('error'));
      }
    } catch (err) {
      dispatch(alterImportExecuteQueryPending(null));
      dispatch(alterImportExecuteQueryError('error'));
    }
  };
};

export const executeNoteBookDataAction = (dataParams, callbackFn) => {
  return async (dispatch) => {
    const { onSuccess, onFail } = callbackFn;
    try {
      dispatch(executeNoteBookDataPending(true));
      dispatch(executeNoteBookDataSuccess(null));
      dispatch(executeNoteBookDataError(null));

      const response = await executeNotebookDataApi(dataParams);
      dispatch(executeNoteBookDataPending(null));
      if (response.data.message === 'success') {
        if (response.data.body[0]['ParseStatus'] === 1) {
          dispatch(executeNoteBookDataSuccess('success'));
          onSuccess();
        }
        if (response.data.body[0]['ParseStatus'] === 2) {
          dispatch(executeNoteBookDataError('error'));
          onFail();
        }
      } else {
        dispatch(executeNoteBookDataError('error'));
        onFail();
      }
    } catch (err) {
      dispatch(executeNoteBookDataPending(null));
      dispatch(executeNoteBookDataError('error'));
      onFail();
    }
  };
};

export const resetQueryResultAction = () => {
  return async (dispatch) => {
    dispatch(testImportQuerySuccess(null, null));
    dispatch(testImportQueryError(null, null));
  }
}
