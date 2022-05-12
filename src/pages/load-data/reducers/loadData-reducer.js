import {
  SET_LOAD_DATA_ACTIVE_STAGE,
  SET_LOAD_PIPELINE_SELECTION_PENDING,
  SET_LOAD_PIPELINE_SELECTION_SUCCESS,
  SET_LOAD_PIPELINE_SELECTION_ERROR,
  SET_SELECTED_PIPELINE,
  CHECK_DATABASE_CONNECTION_PENDING,
  CHECK_DATABASE_CONNECTION_SUCCESS,
  CHECK_DATABASE_CONNECTION_ERROR,
  SET_CREATE_PIPELINE_DATA_PENDING,
  SET_CREATE_PIPELINE_DATA_SUCCESS,
  SET_CREATE_PIPELINE_DATA_ERROR,
  SET_USER_PIPELINE_EXECUTION_PENDING,
  SET_USER_PIPELINE_EXECUTION_SUCCESS,
  SET_USER_PIPELINE_EXECUTION_ERROR,
  SET_TEST_QUERY,
  RUN_PREVIEW_TEST_QUERY_PENDING,
  RUN_PREVIEW_TEST_QUERY_SUCCESS,
  RUN_PREVIEW_TEST_QUERY_ERROR,
  EXECUTE_MIGRATE_QUERY_PENDING,
  EXECUTE_MIGRATE_QUERY_SUCCESS,
  EXECUTE_MIGRATE_QUERY_ERROR,
  EXPORT_PIPELINE_DATA_PENDING,
  EXPORT_PIPELINE_DATA_SUCCESS,
  EXPORT_PIPELINE_DATA_ERROR,
  LOAD_IMPORT_EXECUTE_QUERY_PENDING,
  LOAD_IMPORT_EXECUTE_QUERY_SUCCESS,
  LOAD_IMPORT_EXECUTE_QUERY_ERROR,
  ALTER_IMPORT_EXECUTE_QUERY_PENDING,
  ALTER_IMPORT_EXECUTE_QUERY_SUCCESS,
  ALTER_IMPORT_EXECUTE_QUERY_ERROR,
  RESET_CONNECTION_PIPLINE_DATA,
  LOAD_PREVIEW_TEST_QUERY_PENDING,
  LOAD_PREVIEW_TEST_QUERY_SUCCESS,
  LOAD_PREVIEW_TEST_QUERY_ERROR,
  CLEAR_PREVIEW_TEST_QUERY_SUCCESS,
  CLEAR_IMPORT_QUERY_SUCCESS,
  TEST_IMPORT_QUERY_PENDING,
  TEST_IMPORT_QUERY_SUCCESS,
  TEST_IMPORT_QUERY_ERROR,
  SCHEDULE_DATA_PIPELINE_PENDING,
  SCHEDULE_DATA_PIPELINE_SUCCESS,
  SCHEDULE_DATA_PIPELINE_ERROR,
  RESET_IMPORT_DATA,
  RESET_MIGRATE_DATA,
  RESET_LOAD_DATA,
  RESET_EXPORT_PIPELINE_DATA,
  SET_PIPLINE_EXECUTION_BY_NAVIGATION,
  IMPORT_FILE_DATA_PENDING,
  IMPORT_FILE_DATA_SUCCESS,
  IMPORT_FILE_DATA_ERROR,
  SET_DATA_SOURCE_TYPE,
  RESTART_DATA_PIPELEINE,
  SET_PIPELINE_SELECTION,
  EXECUTE_NOTEBOOK_DATA_SUCCESS,
  EXECUTE_NOTEBOOK_DATA_ERROR,
  EXECUTE_NOTEBOOK_DATA_PENDING,
  RESET_DATA_SOURCE_TYPE,
} from '../actions/loadData-action';

const initialState = {
  activeLoadDataStage: 0,
  pipelineSelectionLoadPending: false,
  pipelineSelectionLoadSuccess: false,
  pipelineSelectionLoadError: null,
  pipelineSelectionData: [],
  selectedPipeline: null,
  checkDatabaseConnectionPending: false,
  checkDatabaseConnectionSuccess: false,
  checkDatabaseConnectionError: null,
  databaseConnectionResponse: [],
  pipelineCreatePending: false,
  pipelineCreateSuccess: false,
  pipelineCreateError: null,
  pipelineExecutionId: null,
  userPipeLineExecutionsPending: false,
  userPipeLineExecutionsSuccess: false,
  userPipeLineExecutionsError: null,
  userPipeLineExecutions: [],
  testQuery: null,
  testQueryStr: null,
  testQueryStatus: null,
  testQueryRunStatus: false,
  migrateQueryStatus: false,
  exportPiplineStatus: false,
  exportPiplineData: null,
  queryResult: [],
  loadImportQueryStatus: false,
  importQuery: null,
  importQueryStr: null,
  alterImportQueryStatus: false,
  alterImportQueryOutput: null,
  testImportQueryStatus: false,
  importQueryValidation: null,
  schedulePipelineStatus: false,
  importFileDataStatus: false,
  importFileDataMessage: null,
  isExecuteOnly: null,
  dataSource: '',
};

const loadDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOAD_DATA_ACTIVE_STAGE:
      return {
        ...state,
        activeLoadDataStage: action.payload,
      };

    case SET_LOAD_PIPELINE_SELECTION_PENDING:
      return {
        ...state,
        pipelineSelectionLoadPending: action.payload,
      };

    case SET_LOAD_PIPELINE_SELECTION_SUCCESS:
      return {
        ...state,
        pipelineSelectionData: action.data,
        pipelineSelectionLoadSuccess: action.payload,
      };

    case SET_PIPELINE_SELECTION:
      return {
        ...state,
        selectedPipeline: action.data,
      };

    case SET_LOAD_PIPELINE_SELECTION_ERROR:
      return {
        ...state,
        pipelineSelectionLoadError: action.payload,
      };

    case SET_SELECTED_PIPELINE:
      return {
        ...state,
        selectedPipeline: action.payload,
      };

    case CHECK_DATABASE_CONNECTION_PENDING:
      return {
        ...state,
        checkDatabaseConnectionPending: action.payload,
      };

    case CHECK_DATABASE_CONNECTION_SUCCESS:
      return {
        ...state,
        databaseConnectionResponse: action.data,
        checkDatabaseConnectionSuccess: action.payload,
      };

    case CHECK_DATABASE_CONNECTION_ERROR:
      return {
        ...state,
        checkDatabaseConnectionError: action.payload,
        databaseConnectionResponse: action.data,
      };

    case SET_CREATE_PIPELINE_DATA_PENDING:
      return {
        ...state,
        pipelineCreatePending: action.payload,
      };

    case SET_CREATE_PIPELINE_DATA_SUCCESS:
      return {
        ...state,
        pipelineExecutionId: action.data,
        pipelineCreateSuccess: action.payload,
      };

    case SET_CREATE_PIPELINE_DATA_ERROR:
      return {
        ...state,
        pipelineCreateError: action.payload,
      };

    case SET_USER_PIPELINE_EXECUTION_PENDING:
      return {
        ...state,
        userPipeLineExecutionsSuccess: action.status,
      };

    case SET_USER_PIPELINE_EXECUTION_SUCCESS:
      return {
        ...state,
        userPipeLineExecutionsSuccess: action.status,
        userPipeLineExecutions: action.payload,
      };

    case SET_USER_PIPELINE_EXECUTION_ERROR:
      return {
        ...state,
        userPipeLineExecutionsError: action.status,
      };

    case SET_TEST_QUERY:
      return {
        ...state,
        testQuery:
          action.payload.activeLoadDataStage === 1
            ? action.payload.queryText
            : null,

        importQuery:
          action.payload.activeLoadDataStage === 2
            ? action.payload.queryText
            : null,

        testImportQueryStatus:
          action.payload.activeLoadDataStage === 2 ? null : null,
      };

    case RUN_PREVIEW_TEST_QUERY_PENDING:
      return {
        ...state,
        testQueryRunStatus: action.status,
      };

    case RUN_PREVIEW_TEST_QUERY_SUCCESS:
      return {
        ...state,
        testQueryRunStatus: action.status,
        queryResult: action.payload,
      };

    case RUN_PREVIEW_TEST_QUERY_ERROR:
      return {
        ...state,
        testQueryRunStatus: action.status,
      };

    case EXECUTE_MIGRATE_QUERY_PENDING:
      return {
        ...state,
        migrateQueryStatus: action.status,
      };

    case EXECUTE_MIGRATE_QUERY_SUCCESS:
      return {
        ...state,
        migrateQueryStatus: action.status,
      };

    case EXECUTE_MIGRATE_QUERY_ERROR:
      return {
        ...state,
        migrateQueryStatus: action.status,
      };

    case EXPORT_PIPELINE_DATA_PENDING:
      return {
        ...state,
        exportPiplineStatus: action.status,
      };

    case EXPORT_PIPELINE_DATA_SUCCESS:
      return {
        ...state,
        exportPiplineStatus: action.status,
        exportData: action.payload,
      };

    case EXPORT_PIPELINE_DATA_ERROR:
      return {
        ...state,
        exportPiplineStatus: action.status,
      };

    case LOAD_IMPORT_EXECUTE_QUERY_PENDING:
      return {
        ...state,
        loadImportQueryStatus: action.status,
      };

    case LOAD_IMPORT_EXECUTE_QUERY_SUCCESS:
      return {
        ...state,
        loadImportQueryStatus: action.status,
        importQueryStr: action.payload,
        importQuery: action.payload,
      };

    case LOAD_IMPORT_EXECUTE_QUERY_ERROR:
      return {
        ...state,
        loadImportQueryStatus: action.status,
      };

    case ALTER_IMPORT_EXECUTE_QUERY_PENDING:
      return {
        ...state,
        alterImportQueryStatus: action.status,
      };

    case ALTER_IMPORT_EXECUTE_QUERY_SUCCESS:
      return {
        ...state,
        alterImportQueryStatus: action.status,
        alterImportQueryOutput: action.payload,
        queryResult: action.queryData,
        isExecuteOnly: action.isExecuteOnly,
      };

    case ALTER_IMPORT_EXECUTE_QUERY_ERROR:
      return {
        ...state,
        alterImportQueryStatus: action.status,
      };

    case LOAD_PREVIEW_TEST_QUERY_PENDING:
      return {
        ...state,
        testQueryStatus: action.status,
      };

    case LOAD_PREVIEW_TEST_QUERY_SUCCESS:
      return {
        ...state,
        testQueryStatus: action.status,
        testQuery: action.data,
        testQueryStr: action.data,
      };

    case LOAD_PREVIEW_TEST_QUERY_ERROR:
      return {
        ...state,
        testQueryStatus: action.status,
      };

    case RESET_CONNECTION_PIPLINE_DATA:
      return {
        ...state,
        checkDatabaseConnectionPending: false,
        checkDatabaseConnectionSuccess: false,
        checkDatabaseConnectionError: null,
        databaseConnectionResponse: [],
      };

    case CLEAR_PREVIEW_TEST_QUERY_SUCCESS:
      return {
        ...state,
        testQueryRunStatus: null,
        queryResult: [],
        importFileDataStatus: false,
        importFileDataMessage: null,
        dataSource: action.deleteSourceType ? '' : state.dataSource,
      };

    case SET_DATA_SOURCE_TYPE:
      return {
        ...state,
        dataSource: action.payload,
      };

    case RESET_DATA_SOURCE_TYPE:
      return {
        ...state,
        dataSource: null,
      };

    case SCHEDULE_DATA_PIPELINE_PENDING:
      return {
        ...state,
        schedulePipelineStatus: action.status,
      };

    case SCHEDULE_DATA_PIPELINE_SUCCESS:
      return {
        ...state,
        schedulePipelineStatus: action.status,
      };

    case SCHEDULE_DATA_PIPELINE_ERROR:
      return {
        ...state,
        schedulePipelineStatus: action.status,
      };

    case IMPORT_FILE_DATA_PENDING:
      return {
        ...state,
        importFileDataStatus: action.status,
      };

    case IMPORT_FILE_DATA_SUCCESS:
      return {
        ...state,
        importFileDataStatus: action.status,
        importFileDataMessage: action.data,
      };

    case IMPORT_FILE_DATA_ERROR:
      return {
        ...state,
        importFileDataStatus: action.status,
        importFileDataMessage: action.data,
      };

    case CLEAR_IMPORT_QUERY_SUCCESS:
      return {
        ...state,
        importQuery: state.importQueryStr,
        testImportQueryStatus: false,
        importQueryValidation: null,
        alterImportQueryStatus: null,
        alterImportQueryOutput: null,
        queryResult: [],
      };

    case TEST_IMPORT_QUERY_PENDING:
      return {
        ...state,
        testImportQueryStatus: action.status,
        alterImportQueryStatus: null,
      };

    case TEST_IMPORT_QUERY_SUCCESS:
      return {
        ...state,
        testImportQueryStatus: action.status,
        importQueryValidation: action.data,
      };

    case TEST_IMPORT_QUERY_ERROR:
      return {
        ...state,
        testImportQueryStatus: action.status,
        importQueryValidation: action.data,
      };

    case RESET_MIGRATE_DATA:
      return {
        ...state,
        testQuery: null,
        testQueryStr: null,
        testQueryRunStatus: false,
        migrateQueryStatus: false,
        exportPiplineStatus: false,
        exportPiplineData: null,
        queryResult: [],
        importFileDataStatus: false,
        importFileDataMessage: null,
      };

    case RESET_IMPORT_DATA:
      return {
        ...state,
        loadImportQueryStatus: false,
        importQuery: null,
        importQueryStr: null,
        alterImportQueryStatus: false,
        testImportQueryStatus: false,
        importQueryValidation: null,
        isExecuteOnly: null,
      };

    case RESET_EXPORT_PIPELINE_DATA:
      return {
        ...state,
        exportPiplineStatus: false,
        exportData: null,
      };

    case SET_PIPLINE_EXECUTION_BY_NAVIGATION:
      return {
        ...state,
        pipelineExecutionId: action.payload.pipelineExecutionId,
      };

    case RESET_LOAD_DATA:
      return {
        ...initialState,
      };

    case RESTART_DATA_PIPELEINE:
      return {
        ...state,
        activeLoadDataStage: 0,
        checkDatabaseConnectionPending: false,
        checkDatabaseConnectionSuccess: false,
        checkDatabaseConnectionError: null,
        databaseConnectionResponse: [],
        pipelineCreatePending: false,
        pipelineCreateSuccess: false,
        pipelineCreateError: null,
        pipelineExecutionId: null,
        userPipeLineExecutionsPending: false,
        userPipeLineExecutionsSuccess: false,
        userPipeLineExecutionsError: null,
        userPipeLineExecutions: [],
        testQuery: null,
        testQueryStr: null,
        testQueryStatus: null,
        testQueryRunStatus: false,
        migrateQueryStatus: false,
        exportPiplineStatus: false,
        exportPiplineData: null,
        queryResult: [],
        loadImportQueryStatus: false,
        importQuery: null,
        importQueryStr: null,
        alterImportQueryStatus: false,
        testImportQueryStatus: false,
        alterImportQueryOutput: null,
        importQueryValidation: null,
        schedulePipelineStatus: false,
        importFileDataStatus: false,
        importFileDataMessage: null,
        isExecuteOnly: null,
        dataSource: '',
      };

    case EXECUTE_NOTEBOOK_DATA_PENDING:
      return {
        ...state,
        executeNoteBookDataPending: action.status,
      };

    case EXECUTE_NOTEBOOK_DATA_SUCCESS:
      return {
        ...state,
        executeNotebookDataSuccess: action.status,
      };

    case EXECUTE_NOTEBOOK_DATA_ERROR:
      return {
        ...state,
        executeNotebookDataError: action.status,
      };

    default:
      return state;
  }
};

export default loadDataReducer;
