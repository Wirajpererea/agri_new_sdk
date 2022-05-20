import React from "react";
import "./models.scss";
import { Card } from "../../components";
import ModelTable from "./components/model-table";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setActiveModelAction } from "../../actions/globle-action";

const ModelBuild = ({ userData, setActiveModel, modelTypes }) => {
  const history = useHistory();
  return (
    <Card customClass="model-build-card user-model-card">
      <div className="model-build-header">
        <h2>Your Models</h2>
      </div>
      <ModelTable
        userData={userData}
        setActiveModel={setActiveModel}
        modelTypes={modelTypes}
        history={history}
      />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  modelTypes: state.mainViewState.configData,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveModel: (payload) =>
    dispatch(setActiveModelAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelBuild);
