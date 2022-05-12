import { SET_ACTIVE_MODEL_TYPE } from "../actions/globle-action";

const initialState = {
  selectedModelTypeData: null,
};

const globleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_MODEL_TYPE:
      return { ...state, selectedModelTypeData: action.payload };

    default:
      return state;
  }
};

export default globleReducer;
