import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage/session";
import { 
  SET_LOGOUT_SUCCESS,
 // SET_ALREADY_LOGGED_ERROR,
  SET_LOGOUT_PENDING,
  SET_LOGOUT_ERROR,
  SET_FIRST_TIME_LOGIN_STATE,
  // CHECK_ACCOUNT_STATUS_RESET,
 } from "../pages/login/actions/login-action";

  import { setIdleTime } from '../utils/utils';


import loginReducer from "../pages/login/reducers/login-reducer";
import createAccountReducer from "../pages/create-account/reducers/createAccount-reducer";
import globleReducer from "./globle-reducer";
import loadDataReducer from "../pages/load-data/reducers/loadData-reducer";

// const rootReducer = (state, action) => {
//   if (action.type === SET_LOGOUT_SUCCESS) {
//     storage.removeItem("persist:root");
//     state = undefined;
//   }
//   return appReducer(state, action);
// };


const rootReducer = (state, action) => {
  if (
    action.type &&
    Object.keys(state).length > 0 &&
    state.mainViewState.isLoginSuccess &&
    !state.mainViewState.loadTFA
  ) {
    if (
     // action.type === SET_ALREADY_LOGGED_ERROR ||
      action.type === SET_LOGOUT_PENDING ||
      action.type === SET_LOGOUT_SUCCESS ||
      action.type === SET_LOGOUT_ERROR ||
      action.type === SET_FIRST_TIME_LOGIN_STATE 
     // action.type === CHECK_ACCOUNT_STATUS_RESET
    ) {
      if (action.type === SET_LOGOUT_SUCCESS) {
        storage.removeItem('persist:root');
        state = undefined;
      }
    } else {
      setIdleTime(
        state.mainViewState.appConfig &&
          state.mainViewState.appConfig.length > 0
          ? state.mainViewState.appConfig[0].Value * 60 * 1000
          : 30 * 60 * 1000,
        {
          userId: state.mainViewState.userData.UserID,
        }
      );
    }
  }
  return appReducer(state, action);
};

const appReducer = combineReducers({
  mainViewState: loginReducer,
  globleState: globleReducer,
  createAccountState: createAccountReducer,
  loadDataState: loadDataReducer
});

export default rootReducer;
