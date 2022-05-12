import React from 'react';
import { Modal } from '../../../components';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const PipelineScheduleSuccessModal = ({
  modalVisible,
  handleCancel,
  width = 350,
  customClass,
}) => {
  const history = useHistory();
  const redirectToModleBuild = () => {
    handleCancel();
    history.push('/data');
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
          Datapipe successfully scheduled
        </h2>
        <span className="model-schedule-success-msg">
          You can maintain all your datapipe schedules in Your Data.
        </span>
        <Button
          type="primary"
          htmlType="submit"
          onClick={redirectToModleBuild}
          className={'form-submit-button-build-pipline active'}
        >
          Exit
        </Button>
      </div>
    </Modal>
  );
};

export default PipelineScheduleSuccessModal;
