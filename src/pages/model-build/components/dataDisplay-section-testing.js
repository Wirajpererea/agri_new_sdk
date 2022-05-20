import React, { useState } from "react";
import { Row, Col, Tooltip } from "antd";
import { Chart } from "react-google-charts";
import TestDataMetrix from "./testData-metrix";
import { FullscreenOutlined } from "@ant-design/icons";
import { Modal } from "../../../components";

const DataDisplaySectonTesting = ({ testData }) => {
  const [showDetailsModel, setShowDetailsModel] = useState(false);

  const DataContiner = () => (
    <React.Fragment>
      <Row gutter={[50, 10]} justify="end">
        <Col span={24}>
          <span className="validation-headers top-header">Accuracy</span>
          <TestDataMetrix
            metrixData={
              testData["metrixData"].length > 0 ? testData["metrixData"] : []
            }
          />
        </Col>
      </Row>

      {testData["featureData"].length !== 1 && (
        <Row gutter={[0, 10]} justify="end">
          <Col span={24}>
            <span className="validation-headers">Variable importance</span>
            {testData["featureData"].length !== 1 ? (
              <Chart
                height={"400px"}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={
                  testData["featureData"].length === 1
                    ? []
                    : testData["featureData"]
                }
                options={{
                  width: 900,
                  title: "Relative Importance",
                  legend: { position: "none" },
                  chartArea: { width: "55%" },
                  hAxis: {
                    title: "Overall Imp Rank",
                    viewWindow: { min: 0, max: 100 },
                    textStyle: {
                      fontSize: 9,
                      bold: false,
                      italic: false,
                      color: "#000000",
                    },
                    titleTextStyle: {
                      italic: false,
                    },
                  },
                  vAxis: {
                    title: "Feature",
                    textStyle: {
                      fontSize: 9,
                      bold: false,
                      italic: false,
                      color: "#000000",
                    },
                    titleTextStyle: {
                      italic: false,
                    },
                  },
                  bars: "horizontal",
                  colors: ["#3582c5"],
                }}
              />
            ) : (
              <span className="varible-importance-empty">
                Variable importance data is empty
              </span>
            )}
          </Col>
        </Row>
      )}
    </React.Fragment>
  );

  const toggleDataInfoModal = () => {
    setShowDetailsModel(!showDetailsModel);
  };

  return (
    <div className="data-grid-view">
      <div className="card-container">
        <div className="report-single-tab">
          <Row gutter={[50, 10]} justify="end">
            <Tooltip title="Show details">
              <FullscreenOutlined
                className="data-info-icon"
                onClick={toggleDataInfoModal}
              />
            </Tooltip>
          </Row>
          <DataContiner />

          {showDetailsModel && (
            <Modal
              visible={showDetailsModel}
              onCancel={toggleDataInfoModal}
              title="Testing Data Details"
              customClass="data-info-modal"
            >
              <DataContiner />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataDisplaySectonTesting;
