import React from 'react';
import { Modal } from '../../../components';
import { Button } from 'antd';

const ModelAvailableModal = ({
  modalVisible,
  handleCancel,
  width = 350,
  customClass,
  redirectToUserModels,
  redirectToUserData,
  activeModelName,
  title,
  message,
  type,
}) => {
  return (
    <Modal
      customClass={customClass}
      visible={modalVisible}
      onCancel={handleCancel}
      width={width}
    >
      <div className="modal-cantainer">
        <h2 className="modal-title-container">{title}</h2>
        <span className="model-schedule-success-msg">
          {!message && (
            <React.Fragment>
              The <b>{activeModelName}</b> Model is already scheduled. Please
              delete model before building a new <b>{activeModelName}</b> Model.
            </React.Fragment>
          )}
          {message && message}
        </span>
        <Button
          type="primary"
          htmlType="submit"
          onClick={type === 1 ? redirectToUserModels : redirectToUserData}
          className={'form-submit-button-build-pipline active'}
        >
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default ModelAvailableModal;
