import React from 'react';
import './buildData.scss';
import { Card } from '../../components';
import ModelTable from './components/data-table';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setActiveModelAction } from '../../actions/globle-action';
import { setSelectedPipelineAction,setDataSourceTypeAction } from '../load-data/actions/loadData-action';

const DataBuild = ({
  userData,
  setActiveModel,
  modelTypes,
  setUserPipelineExecution,
  setSelectedPipeline,
  setDataSource
}) => {
  const history = useHistory();
  const setDataSourceEdit = (status) => {
    setDataSource(status);
  }
  return (
    <Card customClass="data-build-card user-data-card">
      <div className="data-build-header">
        <h2>Your Data</h2>
      </div>
      <ModelTable
        userData={userData}
        setActiveModel={setActiveModel}
        modelTypes={modelTypes}
        history={history}
        setUserPipelineExecution={setUserPipelineExecution}
        setSelectedPipeline={setSelectedPipeline}
        setDataSourceEdit={setDataSourceEdit}

      />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  modelTypes: state.mainViewState.configData,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveModel: (payload) => dispatch(setActiveModelAction(payload)),
  setSelectedPipeline: (payload) =>
    dispatch(setSelectedPipelineAction(payload)),
  setDataSource: (payload) => dispatch(setDataSourceTypeAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataBuild);
