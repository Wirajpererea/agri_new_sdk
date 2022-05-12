import React from "react";
import { Modal } from "antd";

import "./DataModalLogOutput.scss";

const DataModalLogOutput = ({ children, visible, onCancel, width, customClass, title }) => {
  return (
    <Modal
      className= "modal-component-logOutput"
      visible={visible}
      footer={null}
      maskClosable={false}
      onCancel={onCancel}
      width={width}
      title={title? title:""}
    >
      {children}
    </Modal>
  );
};

export default DataModalLogOutput;
