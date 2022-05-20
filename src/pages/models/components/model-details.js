import React from "react";
import { Modal } from "../../../components";
import { Spin } from "antd";

export const ModelDetails = ({
  showDetailsModel,
  toggleDetailsModal,
  detailsData,
  detailsLoading,
}) => {
  return (
    <Modal
      visible={showDetailsModel}
      onCancel={toggleDetailsModal}
      title="Model Details"
      customClass="model-details-modal"
    >
      {detailsLoading && (
        <div className="loader-componet">
          <Spin spinning={detailsLoading} size="large" tip="Loading..." />
        </div>
      )}

      {!detailsLoading && (
        <div className="details-area">
          {detailsData
            ? detailsData.split(",").map((dataSet, index) => (
                <span
                  className={
                    dataSet.replace(/\s/g, "") === "JOBSCHEDULE" ||
                    dataSet.replace(/\s/g, "") === "MODELACCURACY" ||
                    dataSet.replace(/\s/g, "") === "VARIABLEIMPORTANCE" ||
                    dataSet.replace(/\s/g, "") === "API"
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
