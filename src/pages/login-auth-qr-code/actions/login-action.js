import { callLoginApi } from "../services/login-service";
import { getUserModelBuildData } from "../../build-model/services/services";
import { updateConnectionApi } from "../../connections/services/services";
import { updateUserApi } from "../../user-management/services/services";

export const SET_LOGIN_PENDING = "SET_LOGIN_PENDING";
export const SET_LOGIN_SUCCESS = "SET_LOGIN_SUCCESS";
export const SET_LOGIN_ERROR = "SET_LOGIN_ERROR";

export const SET_LOGOUT_PENDING = "SET_LOGOUT_PENDING";
export const SET_LOGOUT_SUCCESS = "SET_LOGOUT_SUCCESS";
export const SET_LOGOUT_ERROR = "SET_LOGOUT_ERROR";

export const SET_USER_MODEL_BUILD_PENDING = "SET_USER_MODEL_BUILD_PENDING";
export const SET_USER_MODEL_BUILD_SUCCESS = "SET_USER_MODEL_BUILD_SUCCESS";
export const SET_USER_MODEL_BUILD_ERROR = "SET_USER_MODEL_BUILD_ERROR";

export const SET_FIRST_TIME_LOGIN_STATE = "SET_FIRST_TIME_LOGIN_STATE";

export const UPDATE_CONNECTIONS = "UPDATE_CONNECTIONS";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const RESET_CONNECTIONS_STATUS = "RESET_CONNECTIONS_STATUS";
export const RESET_USER_DATA_STATUS = "RESET_USER_DATA_STATUS";

export const SET_USER_MODEL_GROUP_PENDING = "SET_USER_MODEL_GROUP_PENDING";
export const SET_USER_MODEL_GROUP_SUCCESS = "SET_USER_MODEL_GROUP_SUCCESS";
export const SET_USER_MODEL_GROUP_ERROR = "SET_USER_MODEL_GROUP_ERROR";


const setLoginPending = (isLoginPending) => ({
  type: SET_LOGIN_PENDING,
  isLoginPending,
});

const setLoginSuccess = (
  isLoginSuccess,
  payload,
  config,
  permissions,
  firstTimeLogin,
  connectionData,
  videoData,
  appConfig,
) => ({
  type: SET_LOGIN_SUCCESS,
  isLoginSuccess,
  userData: payload,
  configData: config,
  permissionData: permissions,
  firstTimeLogin,
  connectionData,
  videoData,
  appConfig:appConfig,
});

const setLoginError = (loginError) => ({
  type: SET_LOGIN_ERROR,
  loginError,
});

const setLogOutPending = (isLogOutPending) => ({
  type: SET_LOGOUT_PENDING,
  isLogOutPending,
});

const setLogOutSuccess = (isLogOutSuccess) => ({
  type: SET_LOGOUT_SUCCESS,
  isLogOutSuccess,
});

const setLogOutError = (logOutError) => ({
  type: SET_LOGOUT_ERROR,
  logOutError,
});

const setFirstTimeLogin = (status) => ({
  type: SET_FIRST_TIME_LOGIN_STATE,
  payload: status,
});

const setUserBuildModelsPending = (pending) => ({
  type: SET_USER_MODEL_BUILD_PENDING,
  staus: pending,
});

const setUserBuildModelsSuccess = (success, payload) => ({
  type: SET_USER_MODEL_BUILD_SUCCESS,
  staus: success,
  payload,
});

const setUserBuildModelsError = (error) => ({
  type: SET_USER_MODEL_BUILD_ERROR,
  staus: error,
});

const updateConnections = (status, payload) => ({
  type: UPDATE_CONNECTIONS,
  status,
  payload,
});

const updateUserData = (status, payload) => ({
  type: UPDATE_USER_DATA,
  status,
  payload,
});

const resetConnections = () => ({
  type: RESET_CONNECTIONS_STATUS,
});

const resetUserData = () => ({
  type: RESET_USER_DATA_STATUS,
});


const setUserModelsGroupPending = (pending) => ({
  type: SET_USER_MODEL_GROUP_PENDING,
  staus: pending,
});

const setUserModelsGroupSuccess = (success, payload) => ({
  type: SET_USER_MODEL_GROUP_SUCCESS,
  staus: success,
  payload,
});

const setUserModelsGroupError = (error) => ({
  type: SET_USER_MODEL_GROUP_ERROR,
  staus: error,
});



export const setUserModelBuildsAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(setUserBuildModelsPending("peding"));
    dispatch(setUserModelsGroupPending("pending"));
    try {
      const response = await getUserModelBuildData(dataParams);
      if (response.data.message === "success") {
        dispatch(setUserBuildModelsSuccess("success", response.data.body.modelData));
        dispatch(setUserModelsGroupSuccess("success", response.data.body.modelGroupsData));
      } else {
        dispatch(setUserBuildModelsError("error"));
        dispatch(setUserModelsGroupError("error"));
      }
    } catch (err) {
      dispatch(setUserBuildModelsError("error"));
      dispatch(setUserModelsGroupError("error"));
    }
  };
};

export const loginAction = (loginData) => {
  return async (dispatch) => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(null));
    try {
      const response = await callLoginApi(loginData);
      console.log(response, "responseresponseresponseresponseresponse");
      dispatch(setLoginPending(false));
      if (response.data.message === "success") {
        sessionStorage.setItem("token", response.data.body.token);
        dispatch(          
          setLoginSuccess(
            true,
            response.data.body.data,
            response.data.body.modelConfig,
            [],
            response.data.body.firstTimeLogin,
            response.data.body.connectionData,
            response.data.body.videoData,
            response.data.body.appConfig,
           
          )         
        );

        console.log(response.data.body.firstTimeLogin, " console.log(response.data.body.firstTimeLogin)")
      } else {
        dispatch(
          setLoginError({ message: "UserName and Password is not found" })
        );
      }
    } catch (err) {
      if (Object.keys(err.response.data.body).length > 0) {
        dispatch(setLoginError({ message: err.response.data.body.message }));
      } else {
        dispatch(setLoginError({ message: "Network error" }));
      }
    }
  };
};

export const logOutAction = (userData) => {
  return async (dispatch) => {
    dispatch(setLogOutPending(true));
    dispatch(setLogOutSuccess(false));
    dispatch(setLogOutError(null));

    try {
      const response = true;
      dispatch(setLogOutPending(false));
      if (response) {
        dispatch(setLogOutSuccess(true));
      } else {
        dispatch(setLogOutError({ message: "User logout fail" }));
      }
    } catch (err) {
      dispatch(setLogOutError({ message: "Network error" }));
    }
  };
};

export const firstTimeLoginAction = (status) => {
  return async (dispatch) => {
    dispatch(setFirstTimeLogin(status));
  };
};

export const updateConnectionAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(updateConnections(null, null));
    try {
      dispatch(updateConnections("pending", null));
      const response = await updateConnectionApi(dataParams);
      if (response.data.message === "success") {
        dispatch(updateConnections("success", response.data.body));
      } else {
        dispatch(updateConnections("error", null));
      }
    } catch (err) {
      dispatch(updateConnections("error", null));
    }
  };
};

export const updateUserDataAction = (dataParams) => {
  return async (dispatch) => {
    dispatch(updateUserData(null, null));
    try {
      dispatch(updateUserData("pending", null));
      const response = await updateUserApi(dataParams);
      if (response.data.message === "success") {
        dispatch(updateUserData("success", response.data.body));
      } else {
        dispatch(updateUserData("error", null));
      }
    } catch (err) {
      dispatch(updateUserData("error", null));
    }
  };
};

export const resetConnectionAction = () => {
  return async (dispatch) => {
    dispatch(resetConnections());
  };
};

export const resetUserDataAction = () => {
  return async (dispatch) => {
    dispatch(resetUserData());
  };
};
