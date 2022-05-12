import React from "react";
import { Table, Tag, Space } from "antd";

import "./Table.scss";

const TableComponent = ({
  columns,
  dataSource,
  customClass,
  pagination = true,
}) => {
  return (
    <Table
      className={
        customClass ? `message-table-${" "}${customClass}` : "message-table"
      }
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
    />
  );
};

export default TableComponent;
