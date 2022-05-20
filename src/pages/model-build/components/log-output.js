import React from "react";
import { DataModalLogOutput, TableComponent } from "../../../components";
import moment from "moment";
import { Empty } from "antd";

const LogOutput = ({
  modalVisible,
  handleCancel,
  width = 350,
  customClass,
  logOutPut,
}) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "Log_Date",
      width: "22%",
      render: (date) => {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "User",
      dataIndex: "Log_User",
      width: "18%",
    },
    {
      title: "Description",
      dataIndex: "Log_desc",
      width: "45%",
    },
    {
      title: "Script Type",
      dataIndex: "Script_Type",
      width: "15%",
    },
  ];
  const dataSource = logOutPut;

  return (
    <DataModalLogOutput
      customClass={customClass}
      visible={modalVisible}
      onCancel={handleCancel}
      width={width}
      title="Log Output"
    >
      {dataSource.length > 0 && (
        <div className="modal-cantainer">
          {dataSource[0]["Log_Date"] ? (
            <TableComponent
              columns={columns}
              dataSource={dataSource}
              bordered={false}
              customClass="log-output-table"
              pagination={false}
            />
          ) : (
            <Empty className="empty-logs-data" description={"No Log data"} />
          )}
        </div>
      )}
    </DataModalLogOutput>
  );
};

export default LogOutput;
