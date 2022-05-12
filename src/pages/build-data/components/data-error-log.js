import React from 'react';
import { DataModalLogOutput, TableComponent } from '../../../components';
import moment from 'moment';
import { Empty } from 'antd';

const DataErrorLog = ({
  modalVisible,
  handleCancel,
  width = 350,
  customClass,
  logOutPut,
}) => {
  return (
    <DataModalLogOutput
      customClass={customClass}
      visible={modalVisible}
      onCancel={handleCancel}
      width={width}
      title="Log Output"
    >
      {logOutPut && logOutPut.data.length > 0 && (
        <div className="modal-cantainer">
          {logOutPut.data[0].message && (
            <span className="details-area">{logOutPut.data[0].message}</span>
          )}
        </div>
      )}

      {logOutPut && !logOutPut.data[0].message && (
        <Empty
          className="empty-logs-data"
          description={'No error messages found'}
        />
      )}
    </DataModalLogOutput>
  );
};

export default DataErrorLog;
