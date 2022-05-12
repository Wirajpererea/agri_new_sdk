import React from "react";
import { Spin, Space } from "antd";
import "./SpinKitCube.css";

// http://tobiasahlin.com/spinkit/
export default function SpinKitCube() {
  return (
    <div className="sk-cube-grid">
      <Space size="large">
        <Spin size="large" />
      </Space>
    </div>
  );
}
