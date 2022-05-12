
export const SET_ACTIVE_MODEL_TYPE = "SET_BUILDSET_ACTIVE_MODEL_TYPE_MODEL";

export const SET_USER_MODEL_BUILD_PENDING = "SET_USER_MODEL_BUILD_PENDING";
export const SET_USER_MODEL_BUILD_SUCCESS = "SET_USER_MODEL_BUILD_SUCCESS";
export const SET_USER_MODEL_BUILD_ERROR = "SET_USER_MODEL_BUILD_ERROR";

const setActiveModelType = (payload) => ({
  type: SET_ACTIVE_MODEL_TYPE,
  payload,
});

export const setActiveModelAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(setActiveModelType(dataParams));
  };
};