import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Button, Popover, Spin, Table } from 'antd';
import moment from 'moment';
import React, { Component } from 'react';
import {
  getCompleteUncompleteIcon,
  getPlayCircleIcon,
  Modal,
} from '../../../components/index';
import configConstants from '../../../config/constants';
import LogOutputTooltip from '../../model-build/components/log-output-tooltip';
import {
  callBuildPipelineApi,
  deleteModelData,
  getModelBuildInfoApi,
  getPipelineExecutionLogs,
  getUserPipelineExecution,
} from '../services/services';
import { DataDetails } from './data-details';
import DataErrorLog from './data-error-log';
import './data-table.scss';
// import { TRUE } from "node-sass";
const tableStyles = {};
const columns = [
  {
    title: 'Data Pipe Name',
    dataIndex: 'pipe_name',
    key: 'pipe_name',
    sorter: (a, b) => a.pipe_name.toLowerCase() > b.pipe_name.toLowerCase(),
  },

  {
    title: 'Built',
    dataIndex: 'built',
    key: 'built',
  },
  {
    title: 'Scheduled',
    dataIndex: 'scheduled',
    key: 'scheduled',
  },
  {
    title: 'Last Executed',
    dataIndex: 'last_executed',
    key: 'last_executed',
    width: 210,
    sorter: (a, b) =>
      moment(a.last_executed ? a.last_executed : new Date()).format(
        'YYYY-MM-DD HH:mm'
      ) -
      moment(b.last_executed ? b.last_executed : new Date()).format(
        'YYYY-MM-DD HH:mm'
      ),
  },
  {
    title: '',
    dataIndex: 'info',
    key: 'info',
  },
  {
    title: '',
    dataIndex: 'play',
    key: 'play',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
  },
  {
    title: '',
    dataIndex: 'delete',
    key: 'delete',
  },
];

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRows: [],
      tableColumns: columns,
      loading: false,
      deleteDataVisible: false,
      batchIdToDelete: null,
      executionIdToDelete: null,
      pipelineDeleting: false,
      logDataVisible: false,
      logOutPut: null,
      logOutPutPopover: null,
      pipelineEecutionDataSet: [],
      showDetailsPipeline: false,
      pipelineBuildDetails: null,
      detailsLoading: false,
      logErrorOutPutCollection: {},
      logErrorDetailsLoading: {},
    };
  }

  componentDidMount = () => {
    this.loadTableData();
    this.pageRefreshTimer = setInterval(() => {
      this.loadTableData(false);
    }, configConstants.apiTimeOut);
  };

  componentWillUnmount() {
    clearInterval(this.pageRefreshTimer);
  }

  async loadTableData(formInitialLoad = true) {
    const dataparams = {
      userId: this.props.userData.UserID,
    };
    if (formInitialLoad) {
      await this.displayLoader(true);
    }
    const pipelinesData = await getUserPipelineExecution(dataparams);
    let rowsData = [];
    if (pipelinesData.data.message === 'success') {
      this.setState({
        pipelineEecutionDataSet: pipelinesData.data.body,
      });
      rowsData = await this.processPipelineDataForTable(
        pipelinesData.data.body
      );
    }
    await this.setState({
      dataRows: rowsData,
    });

    await this.displayLoader(false);
  }

  async displayLoader(state) {
    await this.setState({
      loading: state,
    });
  }

  async displayDeleteLoader(state) {
    await this.setState({
      pipelineDeleting: state,
    });
  }

  async processPipelineDataForTable(pipelineData) {
    let returnArray = [];
    pipelineData.forEach((element, index) => {
      const actionCellContent = this.generateLinkAction({
        dataElement: element,
      });
      const playCellContent = this.generateLinkPlay({
        dataElement: element,
      });
      const deleteCellContent = this.generateLinkDelete({
        displaytext: 'Delete',
        pipelineName: element.PipeLineExecutionName,
        excecutionId: element.PileLineExecutionID,
      });
      const infoCellContent = this.generateInfo({
        dataElement: element,
      });

      let dataRow = {
        key: element.ExecutionID,
        pipe_name: element.DataPipe,
        built: getCompleteUncompleteIcon(
          element.ImportDataStatus ? true : false
        ),
        scheduled: getCompleteUncompleteIcon(
          element.SchedulePipeLineStatus ? true : false
        ),
        // schDateTime: this.formatDateToDisplay(element.NextExecutionTime),
        last_executed: element.LastExecutionTime
          ? this.formatDateToDisplay(element.LastExecutionTime)
          : null,
        info: infoCellContent,
        play: playCellContent,
        action: actionCellContent,
        delete: deleteCellContent,
      };

      returnArray.push(dataRow);
      dataRow = null;
    }, this);

    return returnArray;
  }
  getBuildTypeNumber(element) {
    if (element.ImportDataStatus === 1) {
      return 3;
    } else if (element.ImportDataStatus === 0) {
      return 2;
    } else if (element.ImportDataStatus === 2) {
      return 3;
    } else {
      return 1;
    }
  }

  getPageNameForUrl(params) {
    const pipelineName = params.PipelineTypeName;
    return pipelineName; //pipelineName.toLowerCase().replace(/\s/g, "");
  }

  formatDateToDisplay(date) {
    return date ? moment(date).format('YYYY-MM-DD HH:mm') : '-';
  }

  continueBuildProcess = async(link, data , pipelineExecutionId) => {
    const selectedPipelineTypeData = this.state.pipelineEecutionDataSet.filter(
      (dataSet) => dataSet.PileLineExecutionID === data.PileLineExecutionID
    );
    this.props.setSelectedPipeline({
      ...selectedPipelineTypeData[0],
      DataPipeID: selectedPipelineTypeData[0].PipeLineID,
    });
    const info = await getModelBuildInfoApi({
      pipelineExecutionId: pipelineExecutionId,
    });
    let dataBody = "";
    dataBody = info.data.body;
    const bodyCSV = dataBody.includes("Load Type: CSV");
    if(bodyCSV){
      this.props.setDataSourceEdit("csvDetails");
    }
    this.props.history.push(link);
  };

  popOverErrorContent(errorLogData) {
    const { errorLogStep, dataElement } = errorLogData;

    this.getErrorLogoutput({
      pipelineExecutionId: dataElement.PileLineExecutionID,
    });

    if (errorLogStep) {
      return (
        <div className="login-popover-content">
          <LogOutputTooltip
            width={350}
            customClass=""
            logOutPut={
              this.state.logErrorOutPutCollection[
                dataElement.PileLineExecutionID
              ]
            }
            logErrorDetailsLoading={
              this.state.logErrorDetailsLoading[dataElement.PileLineExecutionID]
            }
          />
        </div>
      );
    } else {
      return (
        <div className="login-popover-content">
          <LogOutputTooltip width={350} customClass="" logOutPut={[]} />
        </div>
      );
    }
  }

  generateLinkAction(params) {
    const { dataElement } = params;
    const pipelineExecutionId = dataElement.PileLineExecutionID;
    const pipelineId = dataElement.PipeLineID;
    const buildType = this.getBuildTypeNumber(dataElement);
    let notebookParam = "";
    if(dataElement.DatabaseServerName == "Notebook"){
      notebookParam = "&notebook=1";
    }


    const displayText = dataElement.PipelineScheduledStatus
      ? 'Re-schedule'
      : 'Continue';
    const navLink =
      displayText === 'Continue'
        ? `load-data?pipelineExecutionId=${pipelineExecutionId}&pipelineId=${pipelineId}&buildType=${buildType}${notebookParam}`
        : `load-data?pipelineExecutionId=${pipelineExecutionId}&pipelineId=${pipelineId}&buildType=${3}`;

    return (
      <span
        className="pipeline-nav-link"
        onClick={() => this.continueBuildProcess(`/${navLink}`, dataElement,pipelineExecutionId)}
      >
        <b>{displayText}</b>
      </span>
    );
  }

  /**
   * @modified Sandun M 2021-01-05
   * @description modified to display a popover instead of a popup in info button if an error occurred
   */
  generateInfo = (params) => {
    const { dataElement } = params;

    if (dataElement.ImportDataStatus === 2 || dataElement.Play === 2) {
      return (
        <b className="processing-status">
          <InfoCircleOutlined
            className="model-info-error-icon"
            onClick={() =>
              this.getExecutionInfo({
                pipelineExecutionId: dataElement.PileLineExecutionID,
              })
            }
          />
        </b>
      );
    } else {
      return (
        <b className="processing-status">
          <InfoCircleOutlined
            className="pipeline-info-icon"
            onClick={() =>
              this.getExecutionInfo({
                pipelineExecutionId: dataElement.PileLineExecutionID,
              })
            }
          />
        </b>
      );
    }
  };

  generateLinkPlay(params) {
    const { dataElement } = params;
    if (dataElement.ImportDataStatus && !dataElement.TempFileLocation) {
      // icon should be visoble
      const userId = this.props.userData.UserID;
      if (dataElement.Play !== 0) {
        return getPlayCircleIcon(
          true,
          this.playButtonHandler,
          dataElement.PileLineExecutionID,
          userId
        );
      } else {
        return (
          <b className="processing-status">
            <Spin size="small" />
          </b>
        );
      }
    } else {
      // icon should be disabled
      return getPlayCircleIcon(false);
    }
  }

  playButtonHandler = async (executionId, userId) => {
    const requestData = {
      user_id: userId,
      pipelineExecutionId: executionId,
    };
    try {
      const response = await callBuildPipelineApi(requestData);
      const updatedRowData = this.state.pipelineEecutionDataSet.map(
        (dataRow) => {
          if (dataRow.PileLineExecutionID === executionId) {
            return {
              ...dataRow,
              Play: 0,
            };
          } else {
            return dataRow;
          }
        }
      );
      const rowsData = await this.processPipelineDataForTable(updatedRowData);
      await this.setState({
        dataRows: rowsData,
      });
      if (response.message === 'success') {
        // build pipeline called successfully
      }
    } catch (error) {
      const updatedRowData = this.state.pipelineEecutionDataSet.map(
        (dataRow) => {
          if (dataRow.PileLineExecutionID === executionId) {
            return {
              ...dataRow,
              Play: 2,
            };
          } else {
            return dataRow;
          }
        }
      );
      const rowsData = await this.processPipelineDataForTable(updatedRowData);
      await this.setState({
        dataRows: rowsData,
      });
    }
  };

  async deletePipelineServiceCaller(executionId) {
    const dataParams = {
      user_id: this.props.userData.UserID,
      pipelineExecutionId: executionId,
    };

    await this.displayDeleteLoader(true);
    const response = await deleteModelData(dataParams);
    await this.displayDeleteLoader(false);
    this.handleCancel();
    if (response.data.message === 'success') {
      this.loadTableData();
    }
  }

  async displayDeletePopup(pipelineName, excecutionId) {
    await this.setState({
      deleteDataVisible: true,
      executionIdToDelete: excecutionId,
    });
  }

  async getExecutionInfo(dataParams) {
    await this.setState({ detailsLoading: true, showDetailsPipeline: true });
    const response = await getModelBuildInfoApi(dataParams);
    await this.setState({
      pipelineBuildDetails: response,
      detailsLoading: false,
    });
  }

  generateLinkDelete(params) {
    const { displaytext, pipelineName, excecutionId } = params;
    return (
      <span
        className="pipeline-nav-link"
        onClick={() => {
          this.displayDeletePopup(pipelineName, excecutionId);
        }}
      >
        <b>{displaytext}</b>
      </span>
    );
  }

  async handleCancel() {
    await this.setState({
      deleteDataVisible: false,
      batchIdToDelete: null,
      executionIdToDelete: null,
    });
  }

  async loadErrorLogoutput(dataParams) {
    const response = await getPipelineExecutionLogs(dataParams);
    this.setState({
      logOutPut: response.data.body,
      logDataVisible: true,
    });
  }

  async getErrorLogoutput(dataParams) {
    await this.setState({
      logErrorDetailsLoading: {
        ...this.state.logErrorDetailsLoading,
        [dataParams.pipelineExecutionId]: true,
      },
    });

    const response = await getPipelineExecutionLogs(dataParams);
    this.setState({
      // logOutPutPopover: response.data.body.data
      logErrorOutPutCollection: {
        ...this.state.logErrorOutPutCollection,
        [dataParams.pipelineExecutionId]: response.data.body.data[0][''],
      },
      logErrorDetailsLoading: {
        ...this.state.logErrorDetailsLoading,
        [dataParams.pipelineExecutionId]: false,
      },
    });
  }

  setDataVisible() {
    this.setState({
      logDataVisible: false,
    });
  }

  getExecutionStep(pipelineExecutionData) {
    if (pipelineExecutionData.Play === 2) {
      return 'Play';
    } else if (pipelineExecutionData.ImportDataStatus === 2) {
      return 'Build';
    } else {
      return null;
    }
  }

  toggleDetailsData = () => {
    this.setState({ showDetailsPipeline: !this.state.showDetailsPipeline });
  };

  render() {
    return (
      <div className="pipeline-table-div">
        <Spin spinning={this.state.loading} size="large" tip="Loading...">
          <Table
            dataSource={this.state.dataRows}
            columns={this.state.tableColumns}
            style={tableStyles}
            pagination={{ defaultPageSize: 5 }}
          />
        </Spin>
        <Modal
          visible={this.state.deleteDataVisible}
          onCancel={() => {
            this.handleCancel();
          }}
          width={450}
          customClass="delete-data"
        >
          <div className="modal-cantainer delete-pipeline-data">
            <h2 className="modal-title-container">
              <ExclamationCircleOutlined style={{ color: '#faad14' }} /> Do you
              want to delete this pipeline?
            </h2>
            <div>
              <Button
                className="del-button delete-ok"
                onClick={() => {
                  this.deletePipelineServiceCaller(
                    this.state.executionIdToDelete
                  );
                }}
              >
                Delete
              </Button>
              <Button
                className="del-button delete-cancel"
                onClick={() => {
                  this.handleCancel();
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
        <DataErrorLog
          modalVisible={this.state.logDataVisible}
          width={900}
          customClass={'shedule-modal'}
          handleCancel={() => this.setDataVisible(false)}
          logOutPut={this.state.logOutPut}
        />
        <DataDetails
          showDetailsPipeline={this.state.showDetailsPipeline}
          toggleDetailsData={this.toggleDetailsData}
          detailsData={this.state.pipelineBuildDetails}
          detailsLoading={this.state.detailsLoading}
        />
      </div>
    );
  }
}

export default DataTable;
