import {
    LOAD_COMPLEX_MODAL
  } from "../actions/globle-action";
  
  const initialState = {
    apartmentComplexModalLoad: false,
  };
  
  const appReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_COMPLEX_MODAL:
        return { ...state, apartmentComplexModalLoad: action.payload };
      default:
        return state;
    }
  };
  
  export default appReducer;
  