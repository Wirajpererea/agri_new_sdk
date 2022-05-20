import React, { useState } from "react";
import {
  Radio,
  Row,
  Col,
  Select,
  Button,
  Input,
  Menu,
  Dropdown,
  message,
  Space,
  Tooltip,
  Table,
  Alert,
  Checkbox,
  Form,
  notification,
  InputNumber,
} from "antd";
import "./model.scss";
import { useEffect } from "react";
import { MessageAlert } from "../../../components";
import { connect } from "react-redux";
import {
  DownOutlined,
  UserOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./connectAndPreviewData.scss";
import EditView from "./connectAndPreviewDataEdit";

import {
  getPreviousPipelineDataApi,
  updatPipelineValidateDataApi,
} from "../services/modelData-service";
import { getBuildDatasetFieldsDataAction } from "../actions/modelData-action";
import { number } from "prop-types";
import { stubFalse } from "lodash";

const { Option } = Select;

const ValidateModelDataset = ({
  goNextStage,
  loadPipelineSelectionData,
  pipelineSelectionData,
  setSelectedPipeLine,
  selectedPipeline,
  createPipelineData,
  userData,
  pipelineCreatePending,
  pipelineCreateSuccess,
  pipelineCreateError,
  exportPipelineData,
  exportDataFileUrl,
  exportPiplineStatus,
  resetExportPipeline,
  toggleCreateModelView,
  newlyInsertedPipelineName,
  toggleEditModelView,
  setNewlyInsertedPipelineName,
  modelsList,
  valueList,
  filterList,
  getBuildDatasetFieldsData,
  selectedModel,
  pipeLineData,
  navigateToTrainDatset,
}) => {
  const [activeNextButton, setActiveNextButton] = useState(true);
  const [activeEditPipelineButton, setActiveEditPipelineButton] =
    useState(false);
  const [activeDownloadButton, setActiveDownloadButton] = useState(false);
  const [radioBtnIE, setRadioBtnIE] = useState(1);
  const [modelSelectionDataState, setmodelSelectionDataState] = useState([]);
  const [count, setCount] = useState(1);
  const [pipeLineList, setPipeLineList] = useState([]);
  const [pipeLineValue, setPipeLineValue] = useState("");
  const [pipeLineFilterValue, setPipeLineFilterValue] = useState("");
  const [pipeLineInitialFilterValue, setPipeLineInitialFilterValue] =
    useState("");

  const [alertMessage, setAlertMessage] = useState(true);
  const pipelineListRef = React.useRef(null);
  const [filter, setFilter] = useState(true);
  const [filterAdd, setFilterAdd] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [editedPipeLineList, setEditedPipeLineList] = useState([]);
  const [minimumperiodListValue, setMinimumperiodListValue] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    intiDataInpage();
  }, []);

  useEffect(() => {}, [alertMessage]);

  useEffect(() => {
    if (pipelineCreateSuccess) {
      goNextStage();
    }
  }, [goNextStage, pipelineCreateSuccess]);

  useEffect(() => {
    if (exportPiplineStatus === "success") {
      const host = window.location.origin;
      const newFileUrl = `${host}${exportDataFileUrl}`;
      downloadFile(newFileUrl);
      resetExportPipeline();
    }
  }, [exportDataFileUrl, exportPiplineStatus, resetExportPipeline]);

  useEffect(() => {
    setmodelSelectionDataState(modelsList);
  }, [modelsList]);

  const intiDataInpage = async () => {
    let neededData = {
      modelId: selectedModel.ModelID,
      userId: userData.UserID,
    };
    const checkPreviousDataset = await getPreviousPipelineDataApi(neededData);
    const updatedPreviousDataSet = checkPreviousDataset.data.body && checkPreviousDataset.data.body.length > 0 && checkPreviousDataset.data.body.map((item) => {
      let updatedItem = {
        ...item,
        IgnoreFailures:item.IgnoreFailures !== null ? item.IgnoreFailures:true,
        IgnoreWarnings:item.IgnoreWarnings !== null ? item.IgnoreWarnings:true,
      }
      return updatedItem;
    })
    setEditedPipeLineList(updatedPreviousDataSet);
  };

  const resetWindow = () => {
    window.location.reload();
  };

  const onChangeIEHandler = (e) => {
    setRadioBtnIE(e.target.value);
  };

  const downloadFile = (newFileUrl) => {
    let element = document.createElement("a");
    element.setAttribute("href", newFileUrl);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  /**
   * <b>Front end search to select the matching pipeline</b>
   * @author Sandun M
   * @since 2021-1-12
   */
  const pipelineSearch = async (value) => {
    const typingValue = value;
    let filteredSelection = [];
    let exactMatchFound = false;
    let possibleMatches = [];
    if (typingValue != "") {
      pipelineSelectionData.forEach((pipelineElement, index) => {
        let element = pipelineElement;
        if (typeof element.searchMatch !== "undefined") {
          delete element.searchMatch;
        }
        if (element.DataPipe.match(new RegExp(typingValue, "gi"))) {
          if (!exactMatchFound) {
            if (element.DataPipe.toLowerCase() == typingValue.toLowerCase()) {
              // exact match
              exactMatchFound = true;
              element.searchMatch = true;
            } else {
              possibleMatches.push(index);
            }
          }
          filteredSelection.push(element);
        } else {
          filteredSelection.push(element);
        }
      });

      if (!exactMatchFound && possibleMatches.length > 0) {
        const mostPossibleMatch = filteredSelection[possibleMatches[0]];
        filteredSelection[possibleMatches[0]] = {
          ...mostPossibleMatch,
          searchMatch: true,
        };
      }
    } else {
      filteredSelection = pipelineSelectionData;
    }

    await setmodelSelectionDataState(filteredSelection);

    if (pipelineListRef.current) {
      pipelineListRef.current.scrollIntoView();
    }
  };

  /**
   * <b>Front end search to select the matching pipeline</b>
   * @author Sandun M
   * @since 2021-1-12
   */

  const handleMenuClick = async (e) => {
    setPipeLineValue(e);
    let selectedTable = {
      selectedTable: e,
    };
    await getBuildDatasetFieldsData(selectedTable);
  };
  const handleMenuFilterClick = (e) => {
    setPipeLineFilterValue(e);
  };
  const handleMenuInitialFilterClick = (e) => {
    setPipeLineInitialFilterValue(e);
  };

  const optionsArray = [
    {
      key: 0,
      value: "FIRST",
    },
    {
      key: 1,
      value: "SEC",
    },
    {
      key: 2,
      value: "THI",
    },
    {
      key: 3,
      value: "FOR",
    },
  ];

  const deleteFromList = (e, index) => {
    setPipeLineList(pipeLineList.filter((item) => item.count !== e));
    setAlertMessage(true);
    setCount(count - 1);
  };

  const addHandler = () => {
    if (count >= 11) {
      setAlertMessage(false);
    } else {
      let addedObject = {
        count: count,
        dataSet: "Data Set " + count,
        modelDatasetValue: pipeLineValue,
        modelDatasetFilterValue:
          filterAdd == false ? pipeLineInitialFilterValue : "",
      };

      const updatedList = [...pipeLineList, addedObject];
      setPipeLineList(updatedList);
      setCount(count + 1);
      setPipeLineValue("");
      setPipeLineInitialFilterValue("");
      setFilterAdd(true);
    }
  };

  const saveHandler = async () => {
    let data = {
      modelId: selectedModel.ModelID,
      userId: userData.UserID,
      dataset: editedPipeLineList,
    };

    setActiveNextButton(false);
    const savedata = await updatPipelineValidateDataApi(data);
    let message =
      savedata.data.body != undefined ? savedata.data.body[0] : null;
    if (message.OprStatus != 1) {
      displayNotification("error", message.ErrorMessage);
    } else {
      setActiveNextButton(true);
      displayNotification("success", message.Value);
      navigateToTrainDatset();
    }
  };

  const displayNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const onChange = (e, id, option) => {
    var newList = [];
    switch (option) {
      case "IgnoreFailures":
        newList = editedPipeLineList.map((item) => {
          if (item.ID === id) {
            const updatedItem = {
              ...item,
              IgnoreFailures: e.target.checked,
            };
            return updatedItem;
          }
          return item;
        });
        return setEditedPipeLineList(newList);

      case "IgnoreWarnings":
        newList = editedPipeLineList.map((item) => {
          if (item.ID === id) {
            const updatedItems = {
              ...item,
              IgnoreWarnings: e.target.checked,
            };
            return updatedItems;
          }
          return item;
        });
        return setEditedPipeLineList(newList);

      case "MinimumPeriod":
        newList = editedPipeLineList.map((item) => {
          if (item.ID === id) {
            const updatedItemsMinimumPeriod = {
              ...item,
              MinimumPeriod: e,
            };
            return updatedItemsMinimumPeriod;
          }
          return item;
        });
        return setEditedPipeLineList(newList);

      case "MinimumPeriodVal":
        newList = editedPipeLineList.map((item) => {
          if (item.ID === id) {
            const updatedItemsMinimumPeriodVal = {
              ...item,
              MinimumPeriodVal: e.target.value,
            };
            return updatedItemsMinimumPeriodVal;
          }
          return item;
        });
        return setEditedPipeLineList(newList);

      default:
        return setEditedPipeLineList(editedPipeLineList);
    }
  };

  const minimumperiodList = [
    {
      key: "Year",
      value: "Year",
    },
    {
      key: "Month",
      value: "Month",
    },
    {
      key: "Day",
      value: "Day",
    },
  ];

  const editChange = (id) => {
    setIsEdit(id);
  };

  return (
    <div>
      <div>
        <br /> <br /> <br />
        <h2>Validate Data</h2>
        <p>
          Modify validation checks by adding a minimum period required to train
          the model. Selecting Ignore Warnings and/or Ignore Failures will mean
          the model will continue training even if the dataset fails validation
          checks.{" "}
        </p>
        <div className="heading-data-pipeline">
          <Row style={{ fontWeight: "bold", padding: 5 }}>
            <Col
              style={{ textAlign: "center", fontSize: "12px" }}
              span={2}
              className="data-set"
            ></Col>
            <Col
              style={{ textAlign: "center", fontSize: "12px" }}
              span={5}
              className="data-set"
            >
              Data Set
            </Col>
            <Col
              style={{ textAlign: "center", fontSize: "12px" }}
              span={5}
              className="data-set"
            >
              Filter
            </Col>
            <Col span={1} />
            <Col style={{ textAlign: "center", fontSize: "12px" }} span={1}>
              Ignore Failures
            </Col>
            <Col span={1} />
            <Col style={{ textAlign: "center", fontSize: "12px" }} span={1}>
              Ignore Warnings
            </Col>
            <Col span={9} />
          </Row>
        </div>
        <br />
        {/* ******************************GRID START ******************************* */}
        <div className="pipeline-list">
          {editedPipeLineList
            ? editedPipeLineList.map((item, i) => {
                return (
                  <Row
                    style={{
                      alignItems: "center",
                      borderBottom: "1px solid  rgb(204, 204, 204)",
                      paddingTop: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    <Col
                      style={{ textAlign: "center", fontSize: "12px" }}
                      span={2}
                    >
                      {i + 1}
                    </Col>
                    <Col
                      style={{ textAlign: "center", fontSize: "12px" }}
                      span={5}
                    >
                      {item.Dataset}
                    </Col>
                    <Col
                      style={{ textAlign: "center", fontSize: "12px" }}
                      span={5}
                    >
                      {item.FilterField}
                    </Col>
                    <Col span={1} />
                    <Col
                      style={{ textAlign: "center", fontSize: "12px" }}
                      span={1}
                    >
                      <Checkbox
                        disabled={isEdit === item.ID ? false : true}
                        id="failuresId"
                        checked={
                          item.IgnoreFailures === null || !item.IgnoreFailures
                            ? false
                            : true
                        }
                        onChange={(e) => onChange(e, item.ID, "IgnoreFailures")}
                      />
                    </Col>
                    <Col span={1} />
                    <Col
                      style={{ textAlign: "center", fontSize: "12px" }}
                      span={1}
                    >
                      <Checkbox
                        disabled={isEdit === item.ID ? false : true}
                        id="warningsId"
                        checked={
                          item.IgnoreWarnings === null || !item.IgnoreWarnings
                            ? false
                            : true
                        }
                        onChange={(e) => onChange(e, item.ID, "IgnoreWarnings")}
                      />
                    </Col>
                    <Col span={1} />
                    <Col
                      style={{ textAlign: "center", fontSize: "12px" }}
                      span={3}
                    >
                      <Form.Item
                        className="dropdown-model"
                        hidden={item.Dateflag === 1 ? true : false}
                        initialValue=""
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          style={{ fontSize: "12px" }}
                          disabled={isEdit === item.ID ? false : true}
                          onChange={(e) =>
                            onChange(e, item.ID, "MinimumPeriod")
                          }
                          placeholder="Select a value"
                          value={
                            item.MinimumPeriod === null
                              ? "Select a min. period"
                              : item.MinimumPeriod
                          }
                        >
                          {minimumperiodList &&
                            minimumperiodList.map((element, index) => (
                              <Option key={index} value={element.value}>
                                {element.value}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col
                      style={{ textAlign: "center", fontSize: "12px" }}
                      span={2}
                    >
                      <Form.Item
                        style={{ display: "table-cell" }}
                        max={4}
                        hidden={item.Dateflag === 1 ? true : false}
                      >
                        <Input
                          maxlength="4"
                          style={{ fontSize: "12px" }}
                          value={
                            item.MinimumPeriodVal === null
                              ? ""
                              : item.MinimumPeriodVal
                          }
                          disabled={isEdit === item.ID ? false : true}
                          onChange={(e) =>
                            onChange(e, item.ID, "MinimumPeriodVal")
                          }
                          placeholder=""
                        />
                      </Form.Item>
                    </Col>
                    <Col span={1} />

                    <Col span={1}>
                      {isEdit === item.ID ? (
                        <CheckCircleOutlined
                          className="action-correct"
                          onClick={async () => {
                            setIsEdit(false);
                          }}
                        />
                      ) : (
                        <EditOutlined
                          className="action-edit"
                          onClick={() => editChange(item.ID)}
                        />
                      )}

                      {/* )} */}
                    </Col>
                  </Row>
                );
              })
            : null}
          {/* ******************************** GRID END ************************************ */}
        </div>
        {/* END FROM WITH NEXT BUTTON */}
        <br /> <br />
        <Row>
          <Col span={4}></Col>
          <Col span={16} />
          <Col span={4}>
            <div className="submit-btn-div-connect">
              <Button
                type="primary"
                htmlType="submit"
                className="form-submit-button active pipeline-button"
                onClick={saveHandler}
                disabled={activeNextButton ? false : true}
              >
                Save & Next
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  modelsList: state.mainViewState.configData,
  valueList: state.modelDataState.buildDatasetValueFields,
  filterList: state.modelDataState.buildDatasetFilterFields,
  userData: state.mainViewState.userData,
  selectedModel: state.modelDataState.selectedModel,
});

const mapDispatchToProps = (dispatch) => ({
  getBuildDatasetFieldsData: (payload) =>
    dispatch(getBuildDatasetFieldsDataAction(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidateModelDataset);
