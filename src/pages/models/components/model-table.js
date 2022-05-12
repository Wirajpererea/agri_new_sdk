import {
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { Button, Popover, Spin, Table, Tooltip } from 'antd';
import React, { Component } from 'react';
import {
  getCompleteUncompleteIcon,

  getPlayCircleIcon, Modal
} from '../../../components/index';
import configConstants from '../../../config/constants';
import LogOutput from '../../model-build/components/log-output';
import LogOutputTooltip from '../../model-build/components/log-output-tooltip';
import { buildModelDataLogsApi } from '../../model-build/services/services';
import {
  callBuildPipelineApi, deleteModelData,

  getModelBuildInfoApi, getModelsData
} from '../services/services';
import { ModelDetails } from './model-details';
import './model-table.scss';

const tableStyles = {};
const columns = [
  {
    title: 'Model Name',
    dataIndex: 'model_name',
    key: 'model_name',
    sorter: (a, b) => a.model_name.toLowerCase() > b.model_name.toLowerCase(),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Trained',
    dataIndex: 'trained',
    key: 'trained',
  },
  {
    title: 'Tested',
    dataIndex: 'tested',
    key: 'tested',
  },
  {
    title: 'Scheduled',
    dataIndex: 'scheduled',
    key: 'scheduled',
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

class ModelTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRows: [],
      tableColumns: columns,
      loading: false,
      deleteModalVisible: false,
      batchIdToDelete: null,
      executionIdToDelete: null,
      modelDeleting: false,
      logModalVisible: false,
      logOutPut: [],
      modelEecutionDataSet: [],
      showDetailsModel: false,
      modelBuildDetails: null,
      detailsLoading: false,
      logErrorOutPutCollection : {},
      logErrorDetailsLoading : {}
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
      user_id: this.props.userData.UserID,
    };
    if (formInitialLoad) {
      await this.displayLoader(true);
    }
    const modelsData = await getModelsData(dataparams);
    let rowsData = [];
    if (modelsData.data.message === 'success') {
      this.setState({
        modelEecutionDataSet: modelsData.data.body,
      });
      rowsData = await this.processModelDataForTable(modelsData.data.body);
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
      modelDeleting: state,
    });
  }

  async processModelDataForTable(modelData) {
    let returnArray = [];
    modelData.forEach((element, index) => {
      const actionCellContent = this.generateLinkAction({
        dataElement: element,
      });
      const playCellContent = this.generateLinkPlay({
        dataElement: element,
      });
      const deleteCellContent = this.generateLinkDelete({
        displaytext: 'Delete',
        modelName: element.ModelName,
        excecutionId: element.ExecutionID,
      });
      const infoCellContent = this.generateInfo({
        dataElement: element,
      });

      let dataRow = {
        key: element.ExecutionID,
        name: (
          <Tooltip title={element.ModelName}>
            <b className="model-name-td">
              {element.ModelName.length > 10
                ? `${element.ModelName.substring(0, 6)}...`
                : element.ModelName}
            </b>
          </Tooltip>
        ),
        built: getCompleteUncompleteIcon(element.BuildStatus ? true : false),
        validated: getCompleteUncompleteIcon(
          element.ValidationStatus ? true : false
        ),
        trained: getCompleteUncompleteIcon(
          element.TrainStatus !== 0 ? true : false
        ),
        scheduled: getCompleteUncompleteIcon(element.ModelScheduledStatus),
        info: infoCellContent,
        action: actionCellContent,
        delete: deleteCellContent,
        tested: getCompleteUncompleteIcon(
          element.ModelTestedStatus ? true : false
        ),
        play: playCellContent,
        model_name: element.ModelTypeName,
      };

      returnArray.push(dataRow);
      dataRow = null;
    }, this);

    return returnArray;
  }

  getBuildTypeNumber(element) {
    if (element.TestStatus === 1) {
      return 4;
    } else if (element.TrainStatus === 1) {
      return 3;
    } else if (element.TrainStatus === 0) {
      return 2;
    } else {
      return 0;
    }
  }

  getPageNameForUrl(params) {
    const modelName = params.ModelTypeName;
    return modelName.toLowerCase().replace(/\s/g, '');
  }

  continueBuildProcess = (link, data) => {
    const selectedModelTypeData = this.props.modelTypes.filter(
      (dataSet) => dataSet.ModelName === data.ModelTypeName
    );
    this.props.setActiveModel(selectedModelTypeData[0]);
    this.props.history.push(link);
  };

  generateLinkAction(params) {
    const { dataElement } = params;
    const executionId = dataElement.ExecutionID;
    const buildType = this.getBuildTypeNumber(dataElement);
    const page = this.getPageNameForUrl(dataElement);
    const displayText = dataElement.ModelScheduledStatus
      ? 'Re-schedule'
      : 'Continue';
    const navLink =
      displayText === 'Continue'
        ? `${page}?executionId=${executionId}&buildType=${buildType}`
        : `${page}?executionId=${executionId}&buildType=${4}`;

        return (
          <span
            className="model-nav-link"
            onClick={() => this.continueBuildProcess(`/${navLink}`, dataElement)}
          >
            <b>{displayText}</b>
          </span>
        );

  }

  popOverErrorContent(errorLogData){
    const {
      errorLogStep,
      dataElement
    } = errorLogData;

    this.getErrorLogoutput({
      userId: dataElement.UserID,
      modelId: dataElement.ModelID,
      executionId: dataElement.ExecutionID,
      excutionStep: errorLogStep,
    });

    if(errorLogStep){
      return (
        <div className="login-popover-content">
          <LogOutputTooltip
            width={350}
            customClass=""
            logOutPut={this.state.logErrorOutPutCollection[dataElement.ExecutionID]}
            logErrorDetailsLoading={this.state.logErrorDetailsLoading[dataElement.ExecutionID]}
          />
        </div>
      );
    }else{
      return (
        <div className="login-popover-content">
          <LogOutputTooltip
            width={350}
            customClass=""
            logOutPut={[]}
          />
        </div>
      );
    }
  };

  generateInfo = (params) => {
    const { dataElement } = params;
    if(
      dataElement.TrainStatus === 2 ||
      dataElement.Play === 2 ||
      dataElement.TestStatus === 2
    ){
      // on error      
      return (
        <b className="processing-status">
          <InfoCircleOutlined
            className="model-info-error-icon"
            onClick={() => this.getExecutionInfo({
              executionId: dataElement.ExecutionID,
              userId: dataElement.UserID,
            })}
          />
        </b>
      )
    }else{
      // on normal
      return (
        <b className="processing-status">
          <InfoCircleOutlined
            className="model-info-icon"
            onClick={() => this.getExecutionInfo({
              executionId: dataElement.ExecutionID,
              userId: dataElement.UserID,
            })}
          />
        </b>
      );
    }
  };

  generateLinkPlay(params) {
    const { dataElement } = params;
    if (dataElement.ModelScheduledStatus) {
      // icon should be visoble
      const userId = this.props.userData.UserID;
      if (dataElement.Play !== 0) {
        return getPlayCircleIcon(
          true,
          this.playButtonHandler,
          dataElement.ExecutionID,
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
      execution_id: executionId,
    };
    try {
      const response = await callBuildPipelineApi(requestData);
      const updatedRowData = this.state.modelEecutionDataSet.map((dataRow) => {
        if (dataRow.ExecutionID === executionId) {
          return {
            ...dataRow,
            Play: 0,
          };
        } else {
          return dataRow;
        }
      });
      const rowsData = await this.processModelDataForTable(updatedRowData);
      await this.setState({
        dataRows: rowsData,
      });
      if (response.message === 'success') {
        // build pipeline called successfully
      }
    } catch (error) {
      const updatedRowData = this.state.modelEecutionDataSet.map((dataRow) => {
        if (dataRow.ExecutionID === executionId) {
          return {
            ...dataRow,
            Play: 2,
          };
        } else {
          return dataRow;
        }
      });
      const rowsData = await this.processModelDataForTable(updatedRowData);
      await this.setState({
        dataRows: rowsData,
      });
    }
  };

  async deleteModelServiceCaller(executionId) {
    const dataParams = {
      user_id: this.props.userData.UserID,
      execution_id: executionId,
    };

    await this.displayDeleteLoader(true);
    const response = await deleteModelData(dataParams);
    await this.displayDeleteLoader(false);
    this.handleCancel();
    if (response.data.message === 'success') {
      this.loadTableData();
    }
  }

  async displayDeletePopup(modelName, excecutionId) {
    await this.setState({
      deleteModalVisible: true,
      executionIdToDelete: excecutionId,
    });
  }

  async getExecutionInfo(dataParams) {
    await this.setState({ detailsLoading: true, showDetailsModel: true });
    const response = await getModelBuildInfoApi(dataParams);
    await this.setState({
      modelBuildDetails: response.data.body[0][''],
      detailsLoading: false,
    });
  }

  generateLinkDelete(params) {
    const { displaytext, modelName, excecutionId } = params;
    return (
      <span
        className="model-nav-link"
        onClick={() => {
          this.displayDeletePopup(modelName, excecutionId);
        }}
      >
        <b>{displaytext}</b>
      </span>
    );
  }

  async handleCancel() {
    await this.setState({
      deleteModalVisible: false,
      batchIdToDelete: null,
      executionIdToDelete: null,
    });
  }

  async loadErrorLogoutput(dataParams) {
    const response = await buildModelDataLogsApi(dataParams);
    this.setState({
      logOutPut: response.data.body,
      logModalVisible: true,
    });

  }

  async getErrorLogoutput(dataParams) {
    await this.setState({
      logErrorDetailsLoading : {
        ...this.state.logErrorDetailsLoading,
        [dataParams.executionId] : true
      }
    });
    const response = await buildModelDataLogsApi(dataParams);

    await this.setState({
          logErrorOutPutCollection : {
            ...this.state.logErrorOutPutCollection,
            [dataParams.executionId] : response.data.body[0][""]
          },
          logErrorDetailsLoading : {
            ...this.state.logErrorDetailsLoading,
            [dataParams.executionId] : false
          }
        });

  }

  setModalVisible() {
    this.setState({
      logModalVisible: false,
    });
  }

  getExecutionStep(modelExecutionData) {
    if (modelExecutionData.Play === 2) {
      return 'Play';
    } else if (modelExecutionData.TestStatus === 2) {
      return 'Train';
    } else if (modelExecutionData.TrainStatus === 2) {
      return 'Train';
    } else {
      return null;
    }
  }

  toggleDetailsModal = () => {
    this.setState({ showDetailsModel: !this.state.showDetailsModel });
  };

  render() {
    return (
      <div className="models-table-div">
        <Spin spinning={this.state.loading} size="large" tip="Loading...">
          <Table
            dataSource={this.state.dataRows}
            columns={this.state.tableColumns}
            style={tableStyles}
            pagination={{ defaultPageSize: 5 }}
          />
        </Spin>
        <Modal
          visible={this.state.deleteModalVisible}
          onCancel={() => {
            this.handleCancel();
          }}
          width={450}
          customClass="delete-modal"
        >
          <div className="modal-cantainer delete-model-modal">
            <h2 className="modal-title-container">
              <ExclamationCircleOutlined style={{ color: '#faad14' }} /> Do you
              want to delete this model?
            </h2>
            <div>
              <Button
                className="del-button delete-ok"
                onClick={() => {
                  this.deleteModelServiceCaller(this.state.executionIdToDelete);
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
        <LogOutput
          modalVisible={this.state.logModalVisible}
          width={900}
          customClass={'shedule-modal'}
          handleCancel={() => this.setModalVisible(false)}
          logOutPut={this.state.logOutPut}
        />
        <ModelDetails
          showDetailsModel={this.state.showDetailsModel}
          toggleDetailsModal={this.toggleDetailsModal}
          detailsData={this.state.modelBuildDetails}
          detailsLoading={this.state.detailsLoading}
        />
      </div>
    );
  }
}

export default ModelTable;
