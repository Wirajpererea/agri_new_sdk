import React, { useEffect } from 'react';
import { SqlEditior } from '../../../components';
import './serverPreviewData.scss';
import { connect } from 'react-redux';
import { loadPrviewTestQueryAction } from '../actions/loadData-action';

const ServerPreviewData = ({ loadPrviewTestQuery, selectedPipeline }) => {
  useEffect(() => {
    if (selectedPipeline) {
      const { DataPipeID } = selectedPipeline;
      loadPrviewTestQuery({
        pipelineId: DataPipeID,
      });
    }
  }, [loadPrviewTestQuery, selectedPipeline]);
  return <SqlEditior />;
};

const mapStateToProps = (state) => ({
  selectedPipeline: state.loadDataState.selectedPipeline,
});

const mapDispatchToProps = (dispatch) => ({
  loadPrviewTestQuery: (payload) =>
    dispatch(loadPrviewTestQueryAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServerPreviewData);
