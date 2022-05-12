import {
  SET_BUILD_MODEL,
  RESET_BUILD_MODEL,
  SET_BUILD_MODEL_BY_EXECUTION_ID,
  SET_CURRENT_BUILD_MODEL_STAGE,
} from "../actions/modelBuild-action";

const initialState = {
  modelBuildStartStatus: null,
  executionId: null,
  EndResult: null,
  executionData: {},
  modelBuildStage: 0,
};

const modelBuildReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUILD_MODEL:
      return {
        ...state,
        modelBuildStartStatus: action.status,
        executionData: action.payload,
      };
    case SET_BUILD_MODEL_BY_EXECUTION_ID:
      return {
        ...state,
        modelBuildStartStatus: action.status,
        executionData: action.payload,
      };
    case SET_CURRENT_BUILD_MODEL_STAGE:
      return {
        ...state,
        modelBuildStage: action.payload,
      };
    case RESET_BUILD_MODEL:
      return {
        ...state,
        executionId: null,
        modelBuildStartStatus: null,
        EndResult: null,
        executionData: null,
      };
    default:
      return state;
  }
};

export default modelBuildReducer;
