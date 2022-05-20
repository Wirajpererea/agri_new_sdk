import React from "react";
import { Modal } from "../../../components";
import { Button } from "antd";
import { useHistory } from "react-router-dom";

const BuildSuccessModal = ({
  modalVisible,
  handleCancel,
  width = 350,
  customClass,
}) => {
  const history = useHistory();
  const redirectToModleBuild = () => {
    handleCancel();
    history.push("/models");
  };
  return (
    <Modal
      customClass={customClass}
      visible={modalVisible}
      onCancel={handleCancel}
      width={width}
    >
      <div className="modal-cantainer">
        <h2 className="modal-title-container">
          Are you sure you want to leave this section?
        </h2>
        <span className="model-schedule-success-msg">
          You can maintain all your models in the configuration manager
        </span>
        <Button
          type="primary"
          htmlType="submit"
          onClick={redirectToModleBuild}
          className={"form-submit-button-build-pipline active"}
        >
          Exit
        </Button>
      </div>
    </Modal>
  );
};

export default BuildSuccessModal;
