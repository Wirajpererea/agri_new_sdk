import debounce from "lodash/debounce";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import SplitPane from "react-split-pane";
import { resizeChart } from "../common/tauChartRef";
import SchemaInfoLoader from "../schema/SchemaInfoLoader";
import SchemaSidebar from "../schema/SchemaSidebar.js";
import QueryEditorResult from "./QueryEditorResult";
import QueryEditorSqlEditor from "./QueryEditorSqlEditor";
import QueryResultHeader from "./QueryResultHeader.js";
import { Button, Row, Col, Spin } from "antd";
import { connect } from "react-redux";
import {
  executeMigrateDataQueryAction,
  alterImportExecuteQueryAction,
  restartPipelineAction,
  executeMigrateDataQueryStatusAction,
} from "../../../pages/load-data/actions/loadData-action";
import configConstants from "../../../config/constants";

const deboucedResearchChart = debounce(resizeChart, 700);

function QueryEditor({
  pipelineExecutionId,
  testQueryRunStatus,
  queryResult,
  executeMigrateDataQuery,
  testQuery,
  importQuery,
  loadDataStage,
  selectedPipeline,
  testImportQueryStatus,
  importQueryValidation,
  importExecuteQuery,
  migrateQueryStatus,
  alterImportQueryStatus,
  alterImportQueryOutput,
  restartPipeline,
  executeMigrateDataStatus,
}) {
  let interval = null;
  const queryId = 1;
  const showSchema = true;
  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, [interval]);

  // Once initialized reset or load query on changes accordingly
  function handleVisPaneResize() {
    deboucedResearchChart(queryId);
  }

  const executeQueryData = () => {
    const { DataPipeID } = selectedPipeline;
    startStatusCheck();
    executeMigrateDataQuery({
      pipelineId: DataPipeID,
      pipelineExecutionId,
      testQuery,
    });
  };

  const startStatusCheck = () => {
    executeMigrateDataStatus(
      { pipelineExecutionId },
      {
        checkStatusSuccess,
        checkStatusFail,
      }
    );
    interval = setInterval(() => {
      executeMigrateDataStatus(
        { pipelineExecutionId },
        {
          checkStatusSuccess,
          checkStatusFail,
        }
      );
    }, configConstants.apiTimeOut);
  };

  const checkStatusSuccess = () => {
    clearInterval(interval);
  };

  const checkStatusFail = () => {
    clearInterval(interval);
  };

  const editorAndVis = <QueryEditorSqlEditor />;

  const editorResultPane = (
    <SplitPane
      split="horizontal"
      minSize={100}
      defaultSize={loadDataStage === 1 ? "60%" : loadDataStage === 2 && "75%"}
      maxSize={-100}
      onChange={handleVisPaneResize}
    >
      {editorAndVis}
      <div>
        <div
          style={{
            position: "absolute",
            top: 30,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <QueryEditorResult
            queryResult={queryResult}
            isRunning={
              loadDataStage === 1 ? testQueryRunStatus : testImportQueryStatus
            }
            loadDataStage={loadDataStage}
            importQueryValidation={importQueryValidation}
            alterImportQueryStatus={alterImportQueryStatus}
            alterImportQueryOutput={alterImportQueryOutput}
          />
        </div>
        <QueryResultHeader
          isRunning={testQueryRunStatus === "pending" ? true : false}
          queryResult={queryResult}
          runQueryStartTime={new Date()}
          loadDataStage={loadDataStage}
        />
      </div>
    </SplitPane>
  );

  const sqlTabPane = showSchema ? (
    <SplitPane
      split="vertical"
      minSize={150}
      defaultSize={280}
      maxSize={-100}
      onChange={handleVisPaneResize}
    >
      <SchemaSidebar
        pipelineExecutionId={pipelineExecutionId}
        loadDataStage={loadDataStage}
        selectedPipeline={selectedPipeline}
      />
      {editorResultPane}
    </SplitPane>
  ) : (
    editorResultPane
  );

  return (
    <div>
      <Spin
        spinning={
          migrateQueryStatus === "pending" ||
          alterImportQueryStatus === "pending"
            ? true
            : false
        }
        className="spinner-active"
        size="large"
      >
        <div
          className={
            loadDataStage === 1
              ? "sql-editor-contianer sql-table-container"
              : loadDataStage === 2 &&
                "sql-editor-contianer sql-query-contianer"
          }
        >
          <div style={{ position: "relative", flexGrow: 1 }}>{sqlTabPane}</div>
          <SchemaInfoLoader
            pipelineExecutionId={pipelineExecutionId}
            loadDataStage={loadDataStage}
          />
        </div>
        {!(
          migrateQueryStatus === "pending" ||
          alterImportQueryStatus === "pending"
        ) ? (
          <React.Fragment>
            {loadDataStage === 1 && (
              <Row>
                <Col span={3}>
                  <div className="restartBtn">
                    <Button
                      className="restart-btn"
                      onClick={() => restartPipeline()}
                    >
                      Restart pipeline
                    </Button>
                  </div>
                </Col>
                <Col span={21}>
                  <div className="submitBtn">
                    <Button
                      className="execut-btn toolbar-btn"
                      onClick={executeQueryData}
                    >
                      Execute
                    </Button>
                  </div>
                </Col>
              </Row>
            )}

            {loadDataStage === 2 && (
              <Row>
                <Col span={3}>
                  <div className="restartBtn">
                    <Button
                      className="restart-btn"
                      onClick={() => restartPipeline()}
                    >
                      Restart pipeline
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </React.Fragment>
        ) : (
          ""
        )}
      </Spin>
    </div>
  );
}

QueryEditor.propTypes = {
  queryId: PropTypes.string.isRequired,
  showVis: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  testQuery: state.loadDataState.testQuery,
  importQuery: state.loadDataState.importQuery,
  pipelineExecutionId: state.loadDataState.pipelineExecutionId,
  testQueryRunStatus: state.loadDataState.testQueryRunStatus,
  queryResult: state.loadDataState.queryResult,
  selectedPipeline: state.loadDataState.selectedPipeline,
  loadDataStage: state.loadDataState.activeLoadDataStage,
  testImportQueryStatus: state.loadDataState.testImportQueryStatus,
  importQueryValidation: state.loadDataState.importQueryValidation,
  migrateQueryStatus: state.loadDataState.migrateQueryStatus,
  alterImportQueryStatus: state.loadDataState.alterImportQueryStatus,
  alterImportQueryOutput: state.loadDataState.alterImportQueryOutput,
});

const mapDispatchToProps = (dispatch) => ({
  executeMigrateDataStatus: (payload, callbackFn) =>
    dispatch(executeMigrateDataQueryStatusAction(payload, callbackFn)),
  executeMigrateDataQuery: (payload) =>
    dispatch(executeMigrateDataQueryAction(payload)),
  importExecuteQuery: (payload) =>
    dispatch(alterImportExecuteQueryAction(payload)),
  restartPipeline: () => dispatch(restartPipelineAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryEditor);
