import React, { useState, useEffect } from 'react';
import SqlEditor from '../common/SqlEditor';
import { connect } from 'react-redux';
import { setTestQueryAction, resetQueryResultAction } from '../../../pages/load-data/actions/loadData-action';

function QueryEditorSqlEditor({
  setTestQuery,
  testQueryRunStatus,
  importQueryStr,
  activeLoadDataStage,
  alterImportQueryStatus,
  testQueryStr,
  resetQueryResult
}) {
  const [queryState, setQueryState] = useState(
    activeLoadDataStage === 2 ? importQueryStr : testQueryStr
  );

  useEffect(() => {
    setQueryState(activeLoadDataStage === 2 ? importQueryStr : testQueryStr);
  }, [activeLoadDataStage, importQueryStr, testQueryStr]);

  const handleQuerySelectionChange = () => {};
  const onChange = (queryText) => {
    setTestQuery({ queryText, activeLoadDataStage });
    setQueryState(queryText);
    resetQueryResult();
  };

  return (
    <div style={{ padding: 4, height: '100%', width: '100%' }}>
      <SqlEditor
        value={queryState}
        onChange={onChange}
        onSelectionChange={handleQuerySelectionChange}
        testQueryRunStatus={testQueryRunStatus}
        alterImportQueryStatus={alterImportQueryStatus}
        activeLoadDataStage={activeLoadDataStage}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  testQueryStr: state.loadDataState.testQueryStr,
  testQueryRunStatus: state.loadDataState.testQueryRunStatus,
  activeLoadDataStage: state.loadDataState.activeLoadDataStage,
  importQueryStr: state.loadDataState.importQueryStr,
  alterImportQueryStatus: state.loadDataState.alterImportQueryStatus,
});

const mapDispatchToProps = (dispatch) => ({
  setTestQuery: (payload) => dispatch(setTestQueryAction(payload)),
  resetQueryResult: () => dispatch(resetQueryResultAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryEditorSqlEditor);
