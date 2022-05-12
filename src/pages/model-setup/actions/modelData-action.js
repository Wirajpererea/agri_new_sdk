import {
getPipelineSelectionDataApi,
getBuildDatasetFieldsApi,
getBuildDatasetTablesApi
} from '../services/modelData-service';


export const CHECK_DATABASE_CONNECTION_PENDING =
  'CHECK_DATABASE_CONNECTION_PENDING';
export const CHECK_DATABASE_CONNECTION_SUCCESS =
  'CHECK_DATABASE_CONNECTION_SUCCESS';
export const CHECK_DATABASE_CONNECTION_ERROR =
  'CHECK_DATABASE_CONNECTION_ERROR';


  export const SET_SELECTED_MODEL_DATA_TO_STATE =
  'SET_SELECTED_MODEL_DATA_TO_STATE';

  export const GET_BUILD_DATASET_FIELDS_PENDING =
    'GET_BUILD_DATASET_FIELDS_PENDING';
  export const GET_BUILD_DATASET_FIELDS_SUCCESS =
    'GET_BUILD_DATASET_FIELDS_SUCCESS';
  export const GET_BUILD_DATASET_FIELDS_ERROR =
    'GET_BUILD_DATASET_FIELDS_ERROR';

  export const GET_BUILD_DATASET_TABLES_PENDING =
    'GET_BUILD_DATASET_TABLES_PENDING';
  export const GET_BUILD_DATASET_TABLES_SUCCESS =
    'GET_BUILD_DATASET_TABLES_SUCCESS';
  export const GET_BUILD_DATASET_TABLES_ERROR =
    'GET_BUILD_DATASET_TABLES_ERROR';

  export const SET_MODEL_SETUP_CURRENT_STEP =
    'SET_MODEL_SETUP_CURRENT_STEP';
  export const SET_MODEL_SETUP_MAX_STEP =
    'SET_MODEL_SETUP_MAX_STEP';

    export const SET_BUILD_DATASET_FILTER_VALUES_BY_INDEX =
    'SET_BUILD_DATASET_FILTER_VALUES_BY_INDEX';


const getBuildDatasetFieldsPending = (payload) => ({
  type: GET_BUILD_DATASET_FIELDS_PENDING,
  payload,
});
const getBuildDatasetFieldsSuccess = (payload, data) => ({
  type: GET_BUILD_DATASET_FIELDS_SUCCESS,
  payload,
  data
});
const getBuildDatasetFieldsError = (payload) => ({
  type: GET_BUILD_DATASET_FIELDS_ERROR,
  payload,
});

const getBuildDatasetTablesPending = (payload) => ({
  type: GET_BUILD_DATASET_TABLES_PENDING,
  payload,
});
const getBuildDatasetTablesSuccess = (payload, data) => ({
  type: GET_BUILD_DATASET_TABLES_SUCCESS,
  payload,
  data
});

const setBuildDatasetFilterValuesByIndex = (payload, data, buildDataIndex) => ({
  type: SET_BUILD_DATASET_FILTER_VALUES_BY_INDEX,
  payload,
  data,
  buildDataIndex
});
const getBuildDatasetTablesError = (payload) => ({
  type: GET_BUILD_DATASET_TABLES_ERROR,
  payload,
});

export const setSelectedModelDataToStateAction = (payload) => ({
  type: SET_SELECTED_MODEL_DATA_TO_STATE,
  payload,
});

export const setSetModelSetupCurrentStepStateAction = (payload) => ({
  type: SET_MODEL_SETUP_CURRENT_STEP,
  payload,
});
export const setSetModelSetupMaxStepStateAction = (payload) => ({
  type: SET_MODEL_SETUP_MAX_STEP,
  payload,
});


export const getBuildDatasetFieldsDataAction = (params, buildDataSetIndex) => {
  return async (dispatch) => {
    dispatch(getBuildDatasetFieldsPending(true));
    dispatch(getBuildDatasetFieldsSuccess(false, []));
    dispatch(getBuildDatasetFieldsError(null));
    try {
      const response = await getBuildDatasetFieldsApi(params);
      dispatch(getBuildDatasetFieldsPending(false));
      if (response.data.message === 'success') {
        dispatch(getBuildDatasetFieldsSuccess(true, response.data.body));
        if(buildDataSetIndex !== null){
          dispatch(setBuildDatasetFilterValuesByIndex(true, response.data.body, buildDataSetIndex));
        }
      } else {
        dispatch(
          getBuildDatasetFieldsError(true, {
            message: 'Build dataset fields data load error',
          })
        );
      }
    } catch (err) {
      dispatch(getBuildDatasetFieldsPending(false));
      dispatch(getBuildDatasetFieldsError({ message: 'Network error' }));
    }
  };
};

export const getBuildDatasetTablesDataAction = () => {
  return async (dispatch) => {
    dispatch(getBuildDatasetTablesPending(true));
    dispatch(getBuildDatasetTablesSuccess(false, []));
    dispatch(getBuildDatasetTablesError(null));
    try {
      const response = await getBuildDatasetTablesApi();
      dispatch(getBuildDatasetTablesPending(false));
      if (response.data.message === 'success') {
        dispatch(getBuildDatasetTablesSuccess(true, response.data.body));
      } else {
        dispatch(
          getBuildDatasetTablesError(true, {
            message: 'Build dataset tables data load error',
          })
        );
      }
    } catch (err) {
      dispatch(getBuildDatasetTablesPending(false));
      dispatch(getBuildDatasetTablesError({ message: 'Network error' }));
    }
  };
};

// const loadPipelineSelectionError = (payload) => ({
//   type: SET_LOAD_PIPELINE_SELECTION_ERROR,
//   payload,
// });


// export const setLoadDataActiveStageAction = (payload) => ({
//   type: SET_LOAD_DATA_ACTIVE_STAGE,
//   payload,
// });

// export const setSelectedPipeLineAction = (payload) => ({
//   type: SET_SELECTED_PIPELINE,
//   payload,
// });

// export const loadPipelineSelectionDataAction = (params) => {
//   return async (dispatch) => {
//     dispatch(loadPipelineSelectionPending(true));
//     dispatch(loadPipelineSelectionSuccess(false, []));
//     dispatch(loadPipelineSelectionError(null));
//     try {
//       const response = await getPipelineSelectionDataApi(params);
//       dispatch(loadPipelineSelectionPending(false));
//       if (response.data.message === 'success') {
//         dispatch(loadPipelineSelectionSuccess(true, response.data.body));
//       } else {
//         dispatch(
//           loadPipelineSelectionError(true, {
//             message: 'Pipeline selection data load error',
//           })
//         );
//       }
//     } catch (err) {
//       dispatch(loadPipelineSelectionPending(false));
//       dispatch(loadPipelineSelectionError({ message: 'Network error' }));
//     }
//   };
// };

// export const createPipelineDataAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(createPipelineDataPending(true));
//     dispatch(createPipelineDataSuccess(false, []));
//     dispatch(createPipelineDataError(null));
//     try {
//       const response = await createPipelineDataApi(dataParams);
//       dispatch(createPipelineDataPending(false));
//       if (response.data.message === 'success') {
//         dispatch(
//           createPipelineDataSuccess(
//             true,
//             response.data.body.PipeLineExecutionID
//           )
//         );
//       } else {
//         dispatch(
//           createPipelineDataError(true, {
//             message: 'Pipeline creation error',
//           })
//         );
//       }
//     } catch (err) {
//       dispatch(createPipelineDataPending(false));
//       dispatch(createPipelineDataError({ message: 'Network error' }));
//     }
//   };
// };

// export const checkDatabseConnectionAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(checkDatabaseConnectionPending(true));
//     dispatch(checkDatabaseConnectionSuccess(false, []));
//     dispatch(checkDatabaseConnectionError(null, null));
//     try {
//       const response = await checkDatabaseConnectionApi(dataParams);
//       dispatch(checkDatabaseConnectionPending(false));
//       if (response.data.message === 'success') {
//         if (response.data.body[0].OprStatus) {
//           dispatch(checkDatabaseConnectionSuccess(true, response.data.body));
//         } else {
//           dispatch(checkDatabaseConnectionError(true, response.data.body));
//         }
//       } else {
//         dispatch(checkDatabaseConnectionError(true, response.data.body));
//       }
//     } catch (err) {
//       dispatch(checkDatabaseConnectionPending(false));
//       dispatch(checkDatabaseConnectionError({ message: 'Connection failed' }));
//     }
//   };
// };

// export const setUserPipelineExecutionAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(setUserPipelineExecutionPending('peding'));
//     dispatch(setUserPipelineExecutionSuccess(null));
//     dispatch(setUserPipelineExecutionError(null));
//     try {
//       const response = await getUserPipelineExecutionApi(dataParams);
//       dispatch(setUserPipelineExecutionPending(null));
//       if (response.data.message === 'success') {
//         dispatch(
//           setUserPipelineExecutionSuccess('success', response.data.body)
//         );
//       } else {
//         dispatch(setUserPipelineExecutionError('error'));
//       }
//     } catch (err) {
//       dispatch(setUserPipelineExecutionPending(null));
//       dispatch(setUserPipelineExecutionError('error'));
//     }
//   };
// };

// export const loadPrviewTestQueryAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(loadPrviewTestQuerySuccess(null, null));
//     dispatch(loadPrviewTestQueryError(null));
//     dispatch(loadPrviewTestQueryPending('peding'));
//     try {
//       const response = await loadPrviewTestQueryApi(dataParams);
//       dispatch(loadPrviewTestQueryPending(null));
//       if (response.data.message === 'success') {
//         if (response.data.body[0].ParseStatus) {
//           const query = response.data.body[0].ProcedureCode;
//           dispatch(loadPrviewTestQuerySuccess('success', query));
//         } else {
//           dispatch(loadPrviewTestQueryError('error'));
//         }
//       } else {
//         dispatch(loadPrviewTestQueryError('error'));
//       }
//     } catch (err) {
//       dispatch(loadPrviewTestQueryPending(null));
//       dispatch(loadPrviewTestQueryError('error'));
//     }
//   };
// };

// export const setTestQueryAction = (sqlQueryData) => ({
//   type: SET_TEST_QUERY,
//   payload: sqlQueryData,
// });

// export const runPrviewTestQueryAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(runPrviewTestQuerySuccess(null, []));
//     dispatch(runPrviewTestQueryError(null));
//     dispatch(runPrviewTestQueryPending('pending'));
//     try {
//       const response = await getPrviewTestQueryDataApi(dataParams);
//       dispatch(runPrviewTestQueryPending(null));
//       if (response.data.message === 'success') {
//         dispatch(runPrviewTestQuerySuccess('success', response.data.body));
//       } else {
//         dispatch(runPrviewTestQueryError('error'));
//       }
//     } catch (err) {
//       dispatch(runPrviewTestQueryPending(null));
//       dispatch(runPrviewTestQueryError('error'));
//     }
//   };
// };

// export const clearPrviewTestQueryAction = (deleteSourceType = null) => ({
//   type: CLEAR_PREVIEW_TEST_QUERY_SUCCESS,
//   deleteSourceType,
// });

// export const clearImportQueryAction = () => ({
//   type: CLEAR_IMPORT_QUERY_SUCCESS,
// });

// export const executeMigrateDataQueryAction = (dataParams) => {
//   return async (dispatch) => {
//     try {
//       await setMigrateRemoteDataApi(dataParams);
//     } catch (err) {
//       dispatch(executeMigrateDataQueryError('success'));
//     }
//   };
// };

// export const exportPipelineDataAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(exportPipelineDataSuccess(null));
//     dispatch(exportPipelineDataError(null));
//     dispatch(exportPipelineDataPending('pending'));
//     try {
//       const response = await exportPipelineDataApi(dataParams);
//       dispatch(exportPipelineDataPending(null));
//       if (response.data.message === 'success') {
//         dispatch(exportPipelineDataSuccess('success', response.data.body));
//       } else {
//         dispatch(exportPipelineDataError('error'));
//       }
//     } catch (err) {
//       dispatch(exportPipelineDataPending(null));
//       dispatch(exportPipelineDataError('error'));
//     }
//   };
// };

// export const loadImportExecuteQueryAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(loadImportExecuteQuerySuccess(null, null));
//     dispatch(loadImportExecuteQueryError(null));
//     dispatch(loadImportExecuteQueryPending('pending'));
//     dispatch(testImportQuerySuccess(null, null));
//     dispatch(testImportQueryError(null, null));
//     try {
//       const response = await loadImportQueryDataApi(dataParams);
//       dispatch(loadImportExecuteQueryPending(null));
//       if (response.data.message === 'success') {
//         if (response.data.body[0].ParseStatus) {
//           const query = response.data.body[0].ProcedureCode;
//           dispatch(loadImportExecuteQuerySuccess('success', query));
//         } else {
//           dispatch(loadImportExecuteQueryError('error'));
//         }
//       } else {
//         dispatch(loadImportExecuteQueryError('error'));
//       }
//     } catch (err) {
//       dispatch(loadImportExecuteQueryPending(null));
//       dispatch(loadImportExecuteQueryError('error'));
//     }
//   };
// };

// export const alterImportExecuteQueryAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(alterImportExecuteQuerySuccess(null, null, {}, null));
//     dispatch(alterImportExecuteQueryError(null));
//     dispatch(alterImportExecuteQueryPending('pending'));
//     try {
//       const response = await alterImportQueryDataApi(dataParams);
//       dispatch(alterImportExecuteQueryPending(null));
//       if (response.data.message === 'success') {
//         dispatch(
//           alterImportExecuteQuerySuccess(
//             'success',
//             response.data.body.dataStatus,
//             response.data.body.data ? response.data.body.data : {},
//             dataParams.isExecuteOnly
//           )
//         );
//       } else {
//         dispatch(alterImportExecuteQueryError('error'));
//       }
//     } catch (err) {
//       dispatch(alterImportExecuteQueryPending(null));
//       dispatch(alterImportExecuteQueryError('error'));
//     }
//   };
// };

// export const testCurrentImportQueryAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(testImportQuerySuccess(null, null));
//     dispatch(testImportQueryError(null, null));
//     dispatch(testImportQueryPending('pending'));
//     try {
//       const response = await testImportQueryValidApi(dataParams);
//       dispatch(testImportQueryPending(null));
//       if (response.data.message === 'success') {
//         if (response.data.body[0].ParseStatus) {
//           dispatch(
//             testImportQuerySuccess('success', 'Query parsed successfully')
//           );
//         } else {
//           dispatch(
//             testImportQueryError('error', response.data.body[0].ErrorMessage)
//           );
//         }
//       } else {
//         dispatch(testImportQueryError('error', 'Server error'));
//       }
//     } catch (err) {
//       dispatch(testImportQueryPending(null));
//       dispatch(testImportQueryError('error', 'Server error'));
//     }
//   };
// };

// export const scheduleDataPipelineAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(scheduleDataPipelineSuccess(null, null));
//     dispatch(scheduleDataPipelineError(null, null));
//     dispatch(scheduleDataPipelinePending('pending'));
//     try {
//       const response = await scheduleDataPipelineApi(dataParams);
//       dispatch(scheduleDataPipelinePending(null));
//       if (response.data.message === 'success') {
//         if (response.data.body[0].OprStatus) {
//           dispatch(scheduleDataPipelineSuccess('success', ''));
//         } else {
//           dispatch(
//             scheduleDataPipelineError(
//               'error',
//               response.data.body[0].ErrorMessage
//             )
//           );
//         }
//       } else {
//         dispatch(scheduleDataPipelineError('error', 'Server error'));
//       }
//     } catch (err) {
//       dispatch(scheduleDataPipelinePending(null));
//       dispatch(scheduleDataPipelineError('error', 'Server error'));
//     }
//   };
// };

// export const importFileDataAction = (dataParams) => {
//   return async (dispatch) => {
//     dispatch(importFileDataSuccess(null, null));
//     dispatch(importFileDataError(null, null));
//     dispatch(importFileDataPending('pending'));
//     try {
//       const response = await importFileDataApi(dataParams);
//       dispatch(importFileDataPending(null));
//       if (response.data.message === 'success') {
//         if (response.data.body[0].OprStatus) {
//           dispatch(importFileDataSuccess('success', ''));
//         } else {
//           dispatch(
//             importFileDataError('error', response.data.body[0].ErrorMessage)
//           );
//         }
//       } else {
//         dispatch(importFileDataError('error', 'Server error'));
//       }
//     } catch (err) {
//       dispatch(importFileDataPending(null));
//       dispatch(importFileDataError('error', 'Server error'));
//     }
//   };
// };

// export const setExistingPiplineExecutionAction = (dataParams) => ({
//   type: SET_PIPLINE_EXECUTION_BY_NAVIGATION,
//   payload: dataParams,
// });

// export const executeMigrateDataQueryStatusAction = (dataParams, callbackFn) => {
//   return async (dispatch) => {
//     const { checkStatusSuccess, checkStatusFail } = callbackFn;
//     dispatch(executeMigrateDataQuerySuccess(null));
//     dispatch(executeMigrateDataQueryError(null));
//     dispatch(executeMigrateDataQueryPending('pending'));
//     try {
//       const response = await executeMigrateDataStatusApi(dataParams);
//       if (response.data.message === 'success') {
//         if (response.data.body[0]['ParseStatus'] === 1) {
//           checkStatusSuccess();
//           dispatch(executeMigrateDataQueryPending(null));
//           dispatch(executeMigrateDataQuerySuccess('success'));
//         }
//         if (response.data.body[0]['ParseStatus'] === 2) {
//           checkStatusFail();
//           dispatch(executeMigrateDataQueryPending(null));
//           dispatch(executeMigrateDataQueryError('error'));
//         }
//       } else {
//         dispatch(executeMigrateDataQueryPending(null));
//         dispatch(executeMigrateDataQueryError('error'));
//       }
//     } catch (err) {
//       checkStatusFail();
//       dispatch(executeMigrateDataQueryPending(null));
//       dispatch(executeMigrateDataQueryError('error'));
//     }
//   };
// };
