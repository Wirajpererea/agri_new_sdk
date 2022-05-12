import React, { useEffect } from "react";
import { SqlEditior } from "../../../components";

const QueryWindow = ({
  pipelineExecutionId,
  loadImportExecuteQuery,
  selectedPipeline,
  alterImportQueryStatus,
  goNextStage,
  resetImportData,
  isExecuteOnly,
  clearPrviewTestQuery,
}) => {
  useEffect(() => {
    if (selectedPipeline) {
      const { DataPipeID } = selectedPipeline;
      if (DataPipeID) {
        loadImportExecuteQuery({
          pipelineId: DataPipeID,
        });
      }
    }
  }, [loadImportExecuteQuery, pipelineExecutionId, selectedPipeline]);

  useEffect(() => {
    if (alterImportQueryStatus === "success" && !isExecuteOnly) {
      goNextStage();
      resetImportData();
    }
  }, [alterImportQueryStatus, goNextStage, isExecuteOnly, resetImportData]);
  return <SqlEditior />;
};

export default QueryWindow;
