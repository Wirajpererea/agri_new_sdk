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
  EditOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./connectAndPreviewDataEdit.scss";

import {
  updatPipelineDataApi,
} from "../services/modelData-service";
import {
  getBuildDatasetFieldsDataAction,
} from "../actions/modelData-action";

const { Option } = Select;

const ConnectAndPreviewData = ({
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
  editPipeLineList,
  navigateToValidateDatset,
  filterFieldsByIndex,
}) => {
  //------------- global params-----------
  let isAddDatasetValidationErrorMessageDisplaying = false;
  let notificationDisplayTime = 4500; // not used by the notification component yet
  //------------- end of global params-----------

  const [activeNextButton, setActiveNextButton] = useState(true);
  const [activeEditPipelineButton, setActiveEditPipelineButton] =
    useState(false);
  const [activeDownloadButton, setActiveDownloadButton] = useState(false);
  const [radioBtnIE, setRadioBtnIE] = useState(1);
  const [modelSelectionDataState, setmodelSelectionDataState] = useState([]);
  const [count, setCount] = useState(editPipeLineList.length + 1);
  const [pipeLineList, setPipeLineList] = useState([]);
  const [editedPipeLineList, setEditedPipeLineList] =
    useState(editPipeLineList);
  const [beforeEditPipeLineList, setBeforeEditPipeLineList] =
    useState(editPipeLineList);

  const [pipeLineValue, setPipeLineValue] = useState("");
  const [pipeLineFilterValue, setPipeLineFilterValue] = useState("");
  const [pipeLineInitialFilterValue, setPipeLineInitialFilterValue] =
    useState("");
  const [intialfiltervalue, setIntialfiltervalue] = useState("");
  const [alertMessage, setAlertMessage] = useState(true);
  const pipelineListRef = React.useRef(null);
  const [filter, setFilter] = useState(true);
  const [filterAdd, setFilterAdd] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [filterId, setFilterId] = useState([]);
  const [isEdit, setIsEdit] = useState([]);
  const [newlyAddedDatasetId, setNewLyAddedDatasetId] = useState(100);

  useEffect(() => {
    setEditedPipeLineList(editPipeLineList);
    setBeforeEditPipeLineList(editPipeLineList);
  }, [editPipeLineList]);

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

  const selectImportHandler = (value) => {
    const selectedValue = value.target.value;

    if (selectedValue) {
      const selectedPipline = modelsList.filter(
        (data) => data.ModelID === selectedValue
      );
      setSelectedPipeLine(selectedPipline[0]);
      setActiveEditPipelineButton(true);
    }
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
  const pipelineSearchChangeHandler = async (event) => {
    const typingValue = event.target.value;
    pipelineSearch(typingValue);
  };
  const handleMenuClick = async (e, index) => {
    setPipeLineValue(e);
    let selectedTables = {
      selectedTable: e,
    };
    await getBuildDatasetFieldsData(selectedTables, index);
  };
  const handleMenuFilterClick = (e) => {
    setPipeLineFilterValue(e);
  };
  const handleMenuInitialFilterClick = (e) => {
    // setPipeLineInitialFilterValue(e);
    setIntialfiltervalue(e);
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
  const menu = (
    <Menu onClick={() => handleMenuClick()}>
      {valueList &&
        valueList != undefined &&
        valueList.map((element, index) => (
          <Menu.Item key={index} value={element.Dataset}>
            {element.Dataset}
          </Menu.Item>
        ))}
    </Menu>
  );
  const filterMenu = (
    <Menu onClick={handleMenuFilterClick}>
      {optionsArray &&
        optionsArray.map((element, index) => (
          <Menu.Item key={index} value={element.value}>
            {element.value}
          </Menu.Item>
        ))}
    </Menu>
  );
  const filterInitialMenu = (
    <Menu onClick={handleMenuInitialFilterClick}>
      {optionsArray &&
        optionsArray.map((element, index) => (
          <Menu.Item key={index} value={element.value}>
            {element.value}
          </Menu.Item>
        ))}
    </Menu>
  );

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      count: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      count: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Data Set",
      dataIndex: "dataSet",
      key: "dataSet",
    },
    {
      title: "Value",
      dataIndex: "pipeLineValue",
      key: "pipeLineValue",
    },
    {
      title: "Action",
      dataIndex: "count",
      key: "count",
      render: (e) => (
        <div className="action">
          <MinusCircleOutlined onClick={() => deleteFromList(e)} />
        </div>
      ),
    },
  ];

  const deleteFromList = (e, index) => {
    setPipeLineList(pipeLineList.filter((item) => item.count !== e));
    setAlertMessage(true);
    setCount(count - 1);
  };

  const addHandler = async () => {
    if (pipeLineValue != "") {
      if (editedPipeLineList.length >= 10) {
        setAlertMessage(false);
      } else {
        let addedObject = {
          Dataset: pipeLineValue,
          FilterField: filterList.length > 0 ? intialfiltervalue : "",
          Filter:
            filterList.length > 0 && intialfiltervalue != "" ? true : false,
          ID: `NEW${newlyAddedDatasetId}`,
          IgnoreFailures: false,
          IgnoreWarnings: false,
          MinimumPeriod: "",
          MinimumPeriodVal: "",
        };
        setNewLyAddedDatasetId(newlyAddedDatasetId + 1);
        let updatedListEdited = editedPipeLineList;
        updatedListEdited.push(addedObject);

        let updatedList = [...pipeLineList, addedObject];
        setPipeLineList(updatedList);
        setBeforeEditPipeLineList(editedPipeLineList);
        setEditedPipeLineList(updatedListEdited);
        setCount(count + 1);
        setPipeLineValue("");
        setPipeLineInitialFilterValue("");
        setFilterAdd(true);
        setIntialfiltervalue("");
      }
      let selecteddata = {
        selectedTable: pipeLineValue,
      };
      const filtervalues = await getBuildDatasetFieldsData(selecteddata);
    } else {
      if (!isAddDatasetValidationErrorMessageDisplaying) {
        isAddDatasetValidationErrorMessageDisplaying = true;
        displayNotification("error", "Please select values!");
        setTimeout(() => {
          isAddDatasetValidationErrorMessageDisplaying = false;
        }, notificationDisplayTime);
      }
    }
  };

  const clearList = () => {
    setPipeLineList([]);
    setCount(1);
    setPipeLineValue("");
    setPipeLineFilterValue("");
    setPipeLineInitialFilterValue("");
    setAlertMessage(true);
  };

  const onChangeFilter = async (i, id, e) => {
    // setFilter(!filter)
    const updatedList = editedPipeLineList.map((item) => {
      if (item.ID == id) {
        const updatedItem = {
          ...item,
          Filter: !item.Filter,
        };
        return updatedItem;
      }

      return item;
    });
    setEditedPipeLineList(updatedList);
  };
  const onChangeFilterAdd = (id) => {
    setFilterAdd(!filterAdd);
  };

  const saveHandler = async () => {
    let data = {
      modelId: selectedModel.ModelID,
      userId: userData.UserID,
      dataset: editedPipeLineList,
    };

    setActiveNextButton(false);
    const savedata = await updatPipelineDataApi(data);
    let message =
    savedata.data.body != undefined ? savedata.data.body[0] : null;
    if(message.OprStatus != 1){
      displayNotification("error", message.ErrorMessage);
    }
    else{
       setActiveNextButton(true);
       navigateToValidateDatset();
       displayNotification("success", message.Message);
    }
   
  };

  const displayNotification = async (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const editChange = async (i, value, filtervalue, index) => {
    setIsEdit([...isEdit, i]);
    setPipeLineValue(value);
    let selectedTables = {
      selectedTable: value,
    };
    const editfilterdataset = await getBuildDatasetFieldsData(
      selectedTables,
      index
    );
  };

  const deleteEditChange = async (index) => {
    if (isEdit.indexOf(index) != -1) {
      await setEditedPipeLineList([]);
      let deleteUpdatedList = editedPipeLineList.filter(
        (item) => item.ID !== index
      );
      setBeforeEditPipeLineList([]);
      setEditedPipeLineList(deleteUpdatedList);
      setBeforeEditPipeLineList(deleteUpdatedList);
      const changedEditList = isEdit;
      changedEditList.splice(changedEditList.indexOf(index), 1);

      setIsEdit(changedEditList);
    } else {
      displayNotification("error", "Please select the edit option");
      setTimeout(() => {}, notificationDisplayTime);
    }
  };

  const submitChange = async (id, index) => {
  
    const newList = editedPipeLineList.map((item) => {
      if (item.ID === id) {
        const updatedItem = {
          ID: id,
          Dataset: pipeLineValue,
          FilterField: intialfiltervalue,
          Filter: intialfiltervalue != "" ? true : false,
          IgnoreFailures: false,
          IgnoreWarnings: false,
          MinimumPeriod: "",
          MinimumPeriodVal: ""
        };

        return updatedItem;
      }

      return item;
    });
    setEditedPipeLineList(newList);
    const changedEditList = isEdit;
    changedEditList.splice(changedEditList.indexOf(id), 1);

    await setIsEdit(changedEditList);
    setIntialfiltervalue("");
    setPipeLineValue("");
  };

  return (
    <div>
      <br /> <br /> <br />
      <h2>Build Dataset</h2>
      <p>
        Select the table of data the model will use. Select the column to filter
        on as required.
      </p>
      <div className="heading-data-pipeline">
        <Row style={{ fontWeight: "bold", padding: 5 }}>
          <Col
            span={3}
            style={{ textAlign: "center", fontSize: "12px" }}
            className="data-set"
          >
            
          </Col>
          <Col
            span={6}
            style={{ textAlign: "center", fontSize: "12px" }}
            className="data-set"
          >
            Data Set
          </Col>
          <Col span={1} />
          <Col
            span={3}
            style={{ textAlign: "center", fontSize: "12px" }}
            className="data-set"
          >
            Action
          </Col>
        </Row>
      </div>
      <br />
      {/* ******************************GRID START ******************************* */}
      <div className="pipeline-list">
        {editedPipeLineList != undefined && editedPipeLineList.length > 0
          ? editedPipeLineList.map((item, i) => {
              return (
                <div className="grid-preview-data">
                  <Row
                    style={{
                      alignItems: "center",
                      paddingTop: "15px",
                      paddingBottom: "15px",
                    }}
                  >
                    <Col
                      style={{ textAlign: "center", fontSize: "12px" }}
                      span={3}
                    >
                      {i + 1}
                    </Col>
                    <Col span={6}>
                      <div className="submit-btn-div ">
                        <Form.Item
                          className="dropdown"
                          initialValue={item.Dataset}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            style={{ fontSize: "12px" }}
                            onChange={(e) => handleMenuClick(e, i)}
                            placeholder="Select a value"
                            defaultValue={item.Dataset}
                            disabled={
                              isEdit.indexOf(item.ID) != -1 ? false : true
                            }
                          >
                            {valueList &&
                              valueList.map((element, index) => (
                                <Option key={index} value={element.Dataset}>
                                  {element.Dataset}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={1} />
                    <Col
                      span={3}
                      style={{ textAlign: "center", fontSize: "12px" }}
                    >
                      <MinusCircleOutlined
                        disabled={isEdit.indexOf(item.ID) !== -1 ? false : true}
                        className={
                          isEdit.indexOf(item.ID) != -1
                            ? "action"
                            : "action-disabled"
                        }
                        onClick={() => deleteEditChange(item.ID)}
                      />
                    </Col>
                    <Col span={2}>
                      <Checkbox
                        disabled={isEdit.indexOf(item.ID) !== -1 ? false : true}
                        checked={item.Filter == true ? true : false}
                        onChange={(e) => onChangeFilter(i, item.ID, e)}
                        className="data-set"
                      >
                        Filter
                      </Checkbox>
                    </Col>
                    <Col span={5}>
                      <div className="submit-btn-div ">
                        <Form.Item
                          className="dropdown"
                          initialValue={item.FilterField}
                          disabled={filterId.indexOf(i) !== -1 ? false : true}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            style={{ fontSize: "12px" }}
                            disabled={
                              isEdit.indexOf(item.ID) !== -1 &&
                              item.Filter == true
                                ? false
                                : true
                            }
                            onChange={handleMenuInitialFilterClick}
                            placeholder="Select a value"
                            defaultValue={item.FilterField}
                          >
                            {filterFieldsByIndex[i] &&
                              filterFieldsByIndex[i].map((element, index) => (
                                <Option key={index} value={element.COLUMN_NAME}>
                                  {element.COLUMN_NAME}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={1} />
                    <Col span={1}>
                      {isEdit.indexOf(item.ID) != -1 ? (
                        <CheckCircleOutlined
                          className="action-correct"
                          onClick={() => submitChange(item.ID, i)}
                        />
                      ) : (
                        <EditOutlined
                          className="action-edit"
                          onClick={() =>
                            editChange(
                              item.ID,
                              item.Dataset,
                              item.FilterField,
                              i
                            )
                          }
                        />
                      )}
                    </Col>
                  </Row>
                </div>
              );
            })
          : ""}
        {/* ******************************** GRID END ************************************ */}
        <br />
        <Row
          style={{ marginBottom: "20px" }}
          hidden={editedPipeLineList.length >= 10 ? true : false}
        >
          <Col span={3} style={{ textAlign: "center" }} className="data-set">
            <label>{editedPipeLineList.length + 1}</label>
          </Col>
          <Col span={6}>
            <div className="submit-btn-div ">
              <Form.Item
                className="dropdown"
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
                  onChange={(e) =>
                    handleMenuClick(e, editedPipeLineList.length)
                  }
                  placeholder="Select a value"
                  value={pipeLineValue == "" ? "Select a value" : pipeLineValue}
                >
                  {valueList &&
                    valueList.map((element, index) => (
                      <Option key={index} value={element.Dataset}>
                        {element.Dataset}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col span={1} />

          <Col
            span={3}
            style={{ textAlign: "center" }}
            className="submit-btn-div-connect-plus"
          >
            <PlusCircleOutlined className="action-add" onClick={addHandler} />
          </Col>
          <Col span={2}>
            <Checkbox
              value={filterAdd}
              checked={!filterAdd}
              onChange={onChangeFilterAdd}
              className="data-set"
            >
              Filter
            </Checkbox>
          </Col>
          <Col span={5}>
            <div className="submit-btn-div">
              <Form.Item
                initialValue=""
                disabled={filterAdd}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ fontSize: "12px" }}
                  disabled={filterAdd}
                  onChange={handleMenuInitialFilterClick}
                  placeholder="Select a value"
                  value={
                    filterList.length > 0
                      ? intialfiltervalue
                      : "Select a filter value"
                  }
                >
                  {pipeLineValue != "" &&
                    filterList &&
                    filterList.map((element, index) => (
                      <Option key={index} value={element.COLUMN_NAME}>
                        {element.COLUMN_NAME}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col span={1} />
        </Row>
      </div>
      {/* END FROM WITH NEXT BUTTON */}
      <br /> <br />
      <Row hidden={alertMessage}>
        <Col span={12}>
          <Alert
            message="Warning"
            description="Maximum pipelines supported is 10"
            type="warning"
            showIcon
            closable
          />
        </Col>
      </Row>
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
  );
};

const mapStateToProps = (state) => ({
  modelsList: state.mainViewState.configData,
  valueList: state.modelDataState.buildDatasetValueFields,
  filterList: state.modelDataState.buildDatasetFilterFields,
  userData: state.mainViewState.userData,
  selectedModel: state.modelDataState.selectedModel,
  filterFieldsByIndex: state.modelDataState.buildDatasetFilterFieldsByIndex,
});

const mapDispatchToProps = (dispatch) => ({
  getBuildDatasetFieldsData: (payload, index = null) =>
    dispatch(getBuildDatasetFieldsDataAction(payload, index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectAndPreviewData);
