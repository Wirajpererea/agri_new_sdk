import {
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
  SET_LOGOUT_PENDING,
  SET_LOGOUT_SUCCESS,
  SET_LOGOUT_ERROR,
  SET_FIRST_TIME_LOGIN_STATE,
  SET_USER_MODEL_BUILD_PENDING,
  SET_USER_MODEL_BUILD_SUCCESS,
  SET_USER_MODEL_BUILD_ERROR,
  UPDATE_CONNECTIONS,
  UPDATE_USER_DATA,
  RESET_CONNECTIONS_STATUS,
  RESET_USER_DATA_STATUS,
  SET_USER_MODEL_GROUP_SUCCESS,
  SET_USER_MODEL_GROUP_PENDING,
  SET_USER_MODEL_GROUP_ERROR
} from "../actions/login-action";

const initialState = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  userData: {},
  configData: [],
  configDataLoadState: null,
  permissionData: [],
  isLogOutSuccess: false,
  isLogOutPending: false,
  logOutError: null,
  firstTimeLogin: undefined,
  connectionData: {},
  videoData: [],
  connectionDataUpdateState: null,
  userDataUpdateState: null,
  userDataUpdateStateBody:null,
  modelGroupsData : [],
  modelGroupsDataState : null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return {
        ...state,
        isLoginPending: action.isLoginPending,
        isLogOutSuccess: false,
      };
    case SET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: action.isLoginSuccess,
        userData: action.userData,
        configData: action.configData,
        permissionData: action.permissionData,
        firstTimeLogin: action.firstTimeLogin,
        connectionData: action.connectionData,
        videoData: action.videoData,
        appConfig: action.appConfig,
      };
    case SET_LOGIN_ERROR:
      return { ...state, loginError: action.loginError };
    case SET_LOGOUT_PENDING:
      return { ...state, isLogOutPending: action.isLogOutPending };
    case SET_LOGOUT_SUCCESS:
      return {
        ...state,
        isLogOutSuccess: action.isLogOutSuccess,
        isLoginSuccess: false,
        userData: {},
        configData: {},
      };
    case SET_LOGOUT_ERROR:
      return { ...state, logOutError: action.logOutError };

    case SET_FIRST_TIME_LOGIN_STATE:
      return { ...state, firstTimeLogin: action.payload };

    case SET_USER_MODEL_BUILD_PENDING:
      return { ...state, configDataLoadState: action.status };

    case SET_USER_MODEL_BUILD_SUCCESS:
      return {
        ...state,
        configData: action.payload,
        configDataLoadState: action.status,
      };

    case SET_USER_MODEL_BUILD_ERROR:
      return { ...state, configDataLoadState: action.status };

    case UPDATE_CONNECTIONS:
      return {
        ...state,
        connectionData: { ...state.connectionData, ...action.payload },
        connectionDataUpdateState: action.status,
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: { ...state.userData, ...action.payload },
        userDataUpdateState: action.status,
        userDataUpdateStateBody: action.payload,
      };

    case RESET_CONNECTIONS_STATUS:
      return {
        ...state,
        connectionDataUpdateState: null,
      };

    case RESET_USER_DATA_STATUS:
      return {
        ...state,
        userDataUpdateState: null,
      };

      case SET_USER_MODEL_GROUP_PENDING:
        return { ...state, modelGroupsDataState: action.status };
  
      case SET_USER_MODEL_GROUP_SUCCESS:
        return {
          ...state,
          modelGroupsData: action.payload,
          modelGroupsDataState: action.status,
        };
  
      case SET_USER_MODEL_GROUP_ERROR:
        return { ...state, modelGroupsDataState: action.status };

    default:
      return state;
  }
};

export default loginReducer;
