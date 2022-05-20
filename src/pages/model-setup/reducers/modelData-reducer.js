import {
  SET_SELECTED_MODEL_DATA_TO_STATE,
  GET_BUILD_DATASET_FIELDS_PENDING,
  GET_BUILD_DATASET_FIELDS_SUCCESS,
  GET_BUILD_DATASET_TABLES_ERROR,
  GET_BUILD_DATASET_TABLES_PENDING,
  GET_BUILD_DATASET_TABLES_SUCCESS,
  SET_MODEL_SETUP_CURRENT_STEP,
  SET_MODEL_SETUP_MAX_STEP,
  SET_BUILD_DATASET_FILTER_VALUES_BY_INDEX
} from '../actions/modelData-action';

const initialState = {
  selectedModel : {},
  buildDatasetFilterFields : [],
  buildDatasetValueFields : [],
  buildDatasetPending : false,
  modelSetupCurrentStep : 0,
  modelSetupMaxStep : 0,
  buildDatasetFilterFieldsByIndex : {}
};

const modelDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_MODEL_DATA_TO_STATE:
      return {
        ...state,
        selectedModel: action.payload,
      };
    case GET_BUILD_DATASET_FIELDS_SUCCESS:
      return {
        ...state,
        buildDatasetFilterFields: action.data,
      };
    case GET_BUILD_DATASET_FIELDS_PENDING:
      return {
        ...state,
        buildDatasetPending : action.payload
      };
    case GET_BUILD_DATASET_TABLES_SUCCESS:
      return {
        ...state,
        buildDatasetValueFields : action.data
      };
    case SET_MODEL_SETUP_CURRENT_STEP:
      return {
        ...state,
        modelSetupCurrentStep : action.payload
      };
    case SET_MODEL_SETUP_MAX_STEP:
      return {
        ...state,
        modelSetupMaxStep : action.payload
      };
    case SET_BUILD_DATASET_FILTER_VALUES_BY_INDEX:
      const filterDataFromState = typeof state.buildDatasetFilterFieldsByIndex !== "undefined" ? state.buildDatasetFilterFieldsByIndex : [];
      return {
        ...state,
        buildDatasetFilterFieldsByIndex : {
          ...filterDataFromState,
          [action.buildDataIndex] : action.data
        }
      };

    default:
      return state;
  }
};

export default modelDataReducer;
