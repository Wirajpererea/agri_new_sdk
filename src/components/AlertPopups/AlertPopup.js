import React, {useState} from "react";
import { Modal, Button, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const info = (message) => {
  Modal.info({
    title: "This is a notification message",
    content: <div>{message}</div>,
    okButtonProps: {
      type: "primary",
    },
    onOk() {},
  });
};

const success = (message) => {
  Modal.success({
    content: message,
    okButtonProps: {
      type: "primary",
    },
  });
};

const error = (message) => {
  Modal.error({
    title: "Error",
    content: { message },
  });
};

const warning = ({ message, callback }) => {
  Modal.warning({
    title: message,
    icon: <ExclamationCircleOutlined />,
    onOk() {
      callback();
    },
    okButtonProps: {
      type: "primary",
    },
  });
};

const confirm = ({ message, callback, state, event }) => {
  Modal.confirm({
    title: message,
    icon: <ExclamationCircleOutlined />,
    onCancel() {},
    onOk() {
      callback(event, state);
    },
    okButtonProps: {
      type: "primary",
    },
    cancelButtonProps: {
      type: "primary",
      danger: true,
    },
  });
};

/**
 * <b>New design for a confirmation box</b>
 * 
 * @param {*} param
 * 
 * @author Sandun M
 * @since 2021-01-06
 */
const DspConfirmBox = ({ title, message, callbackOnOk, callbackOnCancel, visibleState, okActivityInProgressState, okActivityInProgressButtonText, okButtonText }) => {

  return (
      <Modal
        title={title}
        visible={visibleState}
        closable={false}
        footer={null}
        width={500}
        className="dsp-confirm-box"
      >
        <div style={{marginTop : '20px'}}>
          <Row>
            <Col span={24}><p style={{fontSize: '25px', textAlign: 'center'}}>
              <ExclamationCircleOutlined style={{color: "#f3b915", marginRight: '10px'}} />
              <b>{message}</b>
            </p></Col>
          </Row>
          <Row style={{marginBottom : '20px'}}>
          <Col span={3}></Col>
            <Col span={9}>
              <Button
                className="user-mgt-form-submit-button active-primary"
                type="primary"
                onClick={e => {
                  callbackOnOk();
                }}
              >
              {okActivityInProgressState ? okActivityInProgressButtonText : okButtonText}
              </Button>
            </Col>
            <Col span={9}>
              <Button
                  className="user-mgt-form-submit-button active-primary-outlined"
                  type="primary"
                  onClick={e => {
                    callbackOnCancel();
                  }}
                >
                  Cancel
              </Button>
            </Col>
            <Col span={3}></Col>
          </Row>
        </div>
      </Modal>
  );
};


export { info, success, error, warning, confirm, DspConfirmBox };
