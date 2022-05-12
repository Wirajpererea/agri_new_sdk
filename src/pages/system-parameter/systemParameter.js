import React, { useEffect, useState } from "react";
import { Table, Button, Input, Col, Row, notification, Spin } from "antd";
import { Card, DspConfirmBox } from "../../components";
import "./systemParameter.scss";
import {
  getSystemParameter,
  addSystemParameter,
  updateSystemParameter,
  deleteSystemParameter,
} from "./services/systemParameterService";

const SystemParameter = (props) => {
  const [tabeleData, setTableData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [newAddUser, setNewAddUser] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [dspConfirmBoxVisible, setDspConfirmBoxVisible] = useState(false);
  const [deletingId, setDeletingId] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "",
      // className: "data-dictionary-row-header",
      key: "document",
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="sysName"
              onChange={(event) => {
                setEditData({
                  ...editData,
                  sysName: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.ID === editData.ID) {
          return (
            <Input
              name="sysName"
              value={editData !== null ? editData.sysName : tableRow.Name}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  sysName: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>{tableRow.Name}</span>;
        }
      },
    },
    {
      title: "Value",
      dataIndex: "",
      // className: "data-dictionary-row-header",
      key: "Value",
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="sysValue"
              onChange={(event) => {
                setEditData({
                  ...editData,
                  value: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.ID === editData.ID) {
          return (
            <Input
              name="sysValue"
              value={editData !== null ? editData.value : tableRow.Value}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  value: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>{tableRow.Value}</span>;
        }
      },
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Row>
              <Col span={12}>
                <Button
                  onClick={() => save()}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: "center", marginTop: "5px" }}>
                {/* <UndoOutlined style={{ fontSize: "16px" }} onClick={cancel} /> */}
              </Col>
            </Row>
          );
        } else if (editData !== null && tableRow.ID === editData.ID) {
          return (
            <Row>
              <Col span={12}>
                <Button
                  onClick={() => save()}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: "center", marginTop: "5px" }}>
                {/* <UndoOutlined style={{ fontSize: "16px" }} onClick={cancel} /> */}
              </Col>
            </Row>
          );
        } else {
          return <Button onClick={() => edit(tableRow)}>Edit</Button>;
        }
      },
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (tableRow) => {
        return (
          <span>
            <Button
              onClick={() => {
                deleteSysParameter(tableRow.ID);
              }}
              style={{
                marginRight: 8,
              }}
            >
              Delete
            </Button>
          </span>
        );
      },
    },
  ];

  const deleteSysParameter = async (id) => {
    setDspConfirmBoxVisible(true);
    setDeletingId(id);
  };

  const displayNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const addSysParameter = async () => {
    try {
      setDataLoading(true);
      const addSysParam = await addSystemParameter(editData);
      if (addSysParam.data.message === "success") {
        displayNotification("success", "New parameter saved successfully!");
      } else {
        displayNotification("error", "New parameter saving failed!");
      }
      getData();
      setDataLoading(false);
      setNewAddUser(false);
    } catch (error) {
      setDataLoading(false);
      displayNotification("error", "New user parameter saving failed!");
    }
  };

  const updateSysParameter = async () => {
    try {
      setDataLoading(true);
      const updateSysParam = await updateSystemParameter(editData);
      if (updateSysParam.data.message === "success") {
        displayNotification("success", "Parameter updated successfully!");
      } else {
        displayNotification("error", "Parameter update failed!");
      }
      getData();
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
      displayNotification("error", "Parameter update failed!");
    }
  };

  const save = async () => {
    try {
      setDataLoading(true);
      if (newAddUser && editData != null) {
        await addSysParameter();
      } else {
        await updateSysParameter();
        setEditData(null);
      }
      setDataLoading(false);
    } catch (errInfo) {
      setDataLoading(false);
    }
  };
  const edit = (record) => {
    setEditData({
      ...record,
      sysName: record.Name,
      value: record.Value,
    });
  };

  const getData = async () => {
    setDataLoading(true);
    const documentData = await getSystemParameter();
    setTableData(documentData.data.body.sysParams);
    setDataLoading(false);
  };
  const onAddUserClick = () => {
    setNewAddUser(true);
    setTableData([{ newlyAdded: true }, ...tabeleData]);
  };
  return (
    <div className="system-parameter-container">
      <Card className="data-dictionary-card">
        <Row>
          <Col span={18}>
            <h2 className="data-dictionary-header">System Settings</h2>
          </Col>
          <Col span={6}>
            <Button
              type="ghost"
              htmlType="submit"
              className="user-mgt-form-submit-button active"
              disabled={false}
              onClick={onAddUserClick}
            >
              + Add Settings
            </Button>
          </Col>
        </Row>
        <Spin tip="Loading..." spinning={dataLoading} size="large">
          <Table
            className="data-dictionary-table"
            dataSource={tabeleData}
            columns={columns}
          />
          <DspConfirmBox
            title=""
            message="Do you want to delete the selected parameter?"
            callbackOnOk={async () => {
              try {
                setDataLoading(true);
                let dataParams = {
                  id: deletingId,
                };
                const delSysParam = await deleteSystemParameter(dataParams);
                if (delSysParam.data.message === "success") {
                  displayNotification(
                    "success",
                    "Parameter deleted successfully!"
                  );
                } else {
                  displayNotification("error", "Parameter deleting failed!");
                }
                setDspConfirmBoxVisible(false);
                getData();
                setDataLoading(false);
              } catch (error) {
                setDataLoading(false);
                displayNotification("error", "Parameter deleting failed!");
              }
            }}
            callbackOnCancel={() => {
              setDspConfirmBoxVisible(false);
              setDeletingId(false);
            }}
            visibleState={dspConfirmBoxVisible}
            okActivityInProgressButtonText="Deleting..."
            okButtonText="Delete"
          />
        </Spin>
      </Card>
    </div>
  );
};

export default SystemParameter;
