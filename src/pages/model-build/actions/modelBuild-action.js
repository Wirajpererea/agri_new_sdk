import { buildModelInitialApi } from "../services/services";
export const SET_BUILD_MODEL = "SET_BUILD_MODEL";
export const RESET_BUILD_MODEL = "RESET_BUILD_MODEL";
export const SET_BUILD_MODEL_BY_EXECUTION_ID =
  "SET_BUILD_MODEL_BY_EXECUTION_ID";
  export const SET_CURRENT_BUILD_MODEL_STAGE =
  "SET_CURRENT_BUILD_MODEL_STAGE";

const setBuildModel = (status, payload) => ({
  type: SET_BUILD_MODEL,
  status,
  payload,
});

const resetBuildModel = () => ({
  type: RESET_BUILD_MODEL,
});

const setCurrrentModelBuildStage = (payload) => ({
  type: SET_CURRENT_BUILD_MODEL_STAGE,
  payload
});

const setBuildModelByExecutionId = (status, payload) => ({
  type: SET_BUILD_MODEL_BY_EXECUTION_ID,
  status,
  payload,
});

export const startBuildModelAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(setBuildModel(null, null));
    try {
      dispatch(setBuildModel("pending", null));
      const response = await buildModelInitialApi(dataParams);
      if (response.data.message === "success") {
        dispatch(setBuildModel("success", response.data.body[0]));
      } else {
        dispatch(setBuildModel("error", null));
      }
    } catch (err) {
      dispatch(setBuildModel("error", null));
    }
  };
};

export const setExistingModelBuild = (data) => {
  return async (dispatch) => {
    dispatch(setBuildModelByExecutionId("success", data));
  };
};

export const resetModelBuild = () => {
  return async (dispatch) => {
    dispatch(resetBuildModel());
  };
};

export const setCurrrentModelBuildStageAction = (data) => {
  return async (dispatch) => {
    dispatch(setCurrrentModelBuildStage(data));
  };
};

