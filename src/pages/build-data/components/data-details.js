import React from "react";
import { Modal } from "../../../components";
import { Spin } from "antd";

export const DataDetails = ({
  showDetailsPipeline,
  toggleDetailsData,
  detailsData,
  detailsLoading,
}) => {
  return (
    <Modal
      visible={showDetailsPipeline}
      onCancel={toggleDetailsData}
      title="Data Pipe Details"
      customClass="model-details-data pipeline-model-info"
    >
      {detailsLoading && (
        <div className="loader-componet">
          <Spin spinning={detailsLoading} size="large" tip="Loading..." />
        </div>
      )}

      {!detailsLoading && (
        <div className="details-area">
          {detailsData
            ? 
            detailsData.data.body.split(",").map((dataSet, index) => (
              <span
                className={
                  dataSet.replace(/\s/g, "") === "JOBSCHEDULE"
                    ? "details-str headings"
                    : "details-str "
                }
                key={index}
              >
                {dataSet}
              </span>
            ))
            : "No information currently available"}
        </div>
      )}
    </Modal>
  );
};
