import React from "react";
import { Modal } from "antd";
import "./DataModal.scss";

const DataModal = ({ children, visible, onCancel, width, customClass, title, footer, }) => {
  return (
    <Modal
      className={
        customClass ? `modal-component${" "}${customClass}` : "modal-component"
      }
      visible={visible}
      footer={footer ? footer : null}
      maskClosable={true}
      onCancel={onCancel}
      width={width}
      title={title? title:""}
    >
      {children}
    </Modal>
  );
};

export default DataModal;
