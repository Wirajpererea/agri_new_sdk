export const SET_CREATE_ACCOUNT_STAGE = "SET_CREATE_ACCOUNT_STAGE";

const setCreateAccountStage = (payload) => ({
  type: SET_CREATE_ACCOUNT_STAGE,
  payload,
});

export const setCreateAccountStageAction = (stage) => {
  return async (dispatch) => {
    dispatch(setCreateAccountStage(stage));
  };
};
