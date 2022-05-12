import {
    SET_CREATE_ACCOUNT_STAGE
  } from "../actions/createAccount-action";
  
  const initialState = {
    currentStage: null,
  };
  
  const createAccountReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CREATE_ACCOUNT_STAGE:
        return { ...state, currentStage: action.payload };
      default:
        return state;
    }
  };
  
  export default createAccountReducer;
  