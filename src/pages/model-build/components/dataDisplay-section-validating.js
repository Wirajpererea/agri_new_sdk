import React, { useState } from "react";
import { Row, Col, Table, Tooltip } from "antd";
import { FullscreenOutlined } from "@ant-design/icons";
import { Modal } from "../../../components";

const columns = [
  {
    title: "result",
    dataIndex: "result",
    key: "result",
    width: "80%",
    className: "table-single-item",
    render: (text, record) => <p className="warning-tags">{text}</p>,
  },

  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
    className: "table-single-item",
    render: (text, record) => (
      <p className={`status-label ${record.dataIndex}`}>{text}</p>
    ),
  },
];
const DataDisplaySectonValidating = ({ validationData }) => {
  const [showDetailsModel, setShowDetailsModel] = useState(false);

  const toggleDataInfoModal = () => {
    setShowDetailsModel(!showDetailsModel);
  };

  const DataContiner = () => (
    <React.Fragment>
      <Row gutter={[50, 10]} justify="end">
        <Col span={24}>
          <span className="validation-headers top-header">Dataset info</span>
          {validationData && Object.keys(validationData).length > 0 ? (
            validationData.dataSetInfo.map((dataSet, index) => (
              <Row key={index} className="items-row report-tab">
                <Col span={19}>
                  <p className="title-content">{dataSet.result}</p>
                </Col>
                <Col span={5}>
                  <p>{dataSet.status}</p>
                </Col>
              </Row>
            ))
          ) : (
            <Col span={17}>
              <p className="title-content">Dataset info empty</p>
            </Col>
          )}
        </Col>
      </Row>
      <Row gutter={[0, 10]} justify="end">
        <Col span={24}>
          <span className="validation-headers">Data validation</span>
          <Table
            className="warnings-table"
            pagination={false}
            showHeader={false}
            columns={columns}
            dataSource={
              validationData && validationData.warnnings.length > 0
                ? validationData.warnnings
                : []
            }
          />
        </Col>
      </Row>
    </React.Fragment>
  );

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
        </div>
      </div>
      {showDetailsModel && (
        <Modal
          visible={toggleDataInfoModal}
          onCancel={toggleDataInfoModal}
          title="Validation Details"
          customClass="data-info-modal validate-data"
        >
          <div className="report-single-tab">
            <DataContiner />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DataDisplaySectonValidating;
