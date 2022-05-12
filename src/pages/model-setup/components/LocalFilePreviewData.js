import React, { useState, useEffect } from 'react';
import {
  Form,
  Table,
  Button,
  Space,
  Select,
  Switch,
  Row,
  Col,
  Empty,
  Input,
  InputNumber,
  Spin,
} from 'antd';
import { Resizable } from 'react-resizable';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { MessageAlert } from '../../../components';
import './LocalFilePreviewData.scss';

const { Option } = Select;
const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const LocalFilePreviewData = ({
  csvName,
  csvFile,
  headerStatusHandler,
  seporatorHandler,
  skipNRowsHandler,
  defaultDeliminator,
  importFileDataHandler,
  importFileDataStatus,
  importFileDataMessage,
  restartPipeline,
  skipRowCount,
  isCustomHeader,
}) => {
  const [processedCSVSet, setProcessedCSVSet] = useState([]);
  const [tableRow, setTableRow] = useState([]);
  const [columns, setColumns] = useState([]);
  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  useEffect(() => {
    gettingTableHeaderData(csvFile[0]);
    gettingTableContentRow(csvFile);
  }, [csvFile]);

  const gettingTableHeaderData = (csvHeadersArray) => {
    const headerRowContent = [];
    for (let i = 0; i < csvHeadersArray.length; i++) {
      let dataContent = {
        title: csvHeadersArray[i],
        dataIndex: csvHeadersArray[i],
        key: i,
        width: 200,
      };
      headerRowContent.push(dataContent);
    }
    setColumns(headerRowContent);
  };

  const gettingTableContentRow = (csvDataset) => {
    const fileData = [];
    const rowCounter = [];
    for (var x = 1; x < csvDataset.length; x++) {
      const dataRow = csvDataset[x];

      if (!dataRow.every((item) => item === '')) {
        let dataRowObj = {};
        dataRow.forEach(function (element, index) {
          const fieldName = csvDataset[0][index];
          dataRowObj[fieldName] = element;
        });
        dataRowObj.key = x;
        fileData.push(dataRowObj);
        rowCounter.push(x);
      }
      setTableRow([0, ...rowCounter]);
    }
    setProcessedCSVSet(fileData);
  };

  const handleResize = (index) => (e, { size }) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumns(nextColumns);
  };

  const columnsData = columns.map((col, index) => ({
    ...col,
    onHeaderCell: (column) => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  const onChangeHeaderSwitch = (val) => {
    headerStatusHandler(val);
  };

  const handleChangeSeporator = (val) => {
    seporatorHandler(val);
  };

  const numericInputHandler = (e) => {
    const { value } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      skipNRowsHandler(value);
    }
  };
  return (
    <React.Fragment>
      <Spin
        spinning={importFileDataStatus === 'pending' ? true : false}
        className="spinner-active"
        size="large"
      >
        <div>
          <p className="csv-text">
            <span className="file-name-text">File Name:</span>
            <span className="file-name-text-title"> {csvName}</span>
          </p>
          <Row style={{ marginBottom: 16 }}>
            <Col className="params-div" span={7}>
              <label className="params-info">Separator</label>
              <Select
                style={{ width: 120 }}
                onChange={handleChangeSeporator}
                className="csv-selection"
                value={defaultDeliminator}
                defaultValue={'comma'}
              >
                <Option value="comma">Comma</Option>
                <Option value="space">Space</Option>
                <Option value="tab">Tab</Option>
              </Select>
            </Col>
            <Col className="params-div" span={8}>
              <label className="params-info">Skip first N rows</label>

              <Input
                min={1}
                max={10}
                style={{ width: 120 }}
                value={skipRowCount}
                onChange={numericInputHandler}
                className="skip-for-n-rows"
              />
            </Col>
            <Col className="params-div header-status-div" span={8}>
              <label className="params-info">First row as header</label>

              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={onChangeHeaderSwitch}
                defaultChecked={!isCustomHeader}
                checked={!isCustomHeader}
              />
            </Col>
          </Row>

          <Table
            bordered
            components={components}
            columns={columnsData}
            dataSource={processedCSVSet}
            size={'small'}
            pagination={false}
            scroll={{ x: 1300, y: 350 }}
            clssName="csv-table"
            style={{ fontSize: 40 }}
            //showHeader={headerStatus}
          />
          <Row>
            <Col span={5}>
              <div className="restartBtn">
                <Button
                  className="restart-btn"
                  onClick={() => restartPipeline()}
                >
                  Restart pipeline
                </Button>
              </div>
            </Col>
            <Col span={16}>
              {importFileDataStatus === 'error' && (
                <MessageAlert
                  customClass="long-msg"
                  type={'error'}
                  message={importFileDataMessage}
                />
              )}
            </Col>
            <Col span={3}>
              <div className="submitBtn">
                <Button className="execut-btn" onClick={importFileDataHandler}>
                  Execute
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Spin>
    </React.Fragment>
  );
};

export default LocalFilePreviewData;
