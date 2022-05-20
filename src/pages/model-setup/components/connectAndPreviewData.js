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
} from "@ant-design/icons";
import "./connectAndPreviewData.scss";
import EditView from "./connectAndPreviewDataEdit";

import {
  getModelPipeLineList,
  saveConnectAndPreviewData,
  getPreviousPipelineDataApi,
  getPreviousPipelineDataApiBuildDataSet
} from "../services/modelData-service";
import {
  getBuildDatasetFieldsDataAction,
  setSelectedModelDataToStateAction,
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
  pipeLineData,
  navigateToValidateDatset,
}) => {
  const [activeImportButton, setActiveImportButton] = useState(false);
  const [activeExportButton, setActiveExportButton] = useState(false);
  const [activeNextButton, setActiveNextButton] = useState(true);
  const [activeEditPipelineButton, setActiveEditPipelineButton] = useState(
    false
  );
  const [activeDownloadButton, setActiveDownloadButton] = useState(false);
  const [radioBtnIE, setRadioBtnIE] = useState(1);
  const [modelSelectionDataState, setmodelSelectionDataState] = useState([]);
  const [count, setCount] = useState(1);
  const [pipeLineList, setPipeLineList] = useState([]);
  const [pipeLineValue, setPipeLineValue] = useState("");
  const [pipeLineFilterValue, setPipeLineFilterValue] = useState("");
  const [pipeLineInitialFilterValue, setPipeLineInitialFilterValue] = useState(
    ""
  );

  const [alertMessage, setAlertMessage] = useState(true);
  const pipelineListRef = React.useRef(null);
  const [filter, setFilter] = useState(true);
  const [filterAdd, setFilterAdd] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [editedPipeLineList, setEditedPipeLineList] = useState([]);

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

  //   const editPipeLineList = [
  //   {
  //     Id:0,
  //     value:"[Log].[VarImp2]",
  //     filterValu:"RunDtm"
  //   },
  //   {
  //     Id:1,
  //     value:"[training].[IPNELAdmissions]",
  //     filterValu:"AdmissionDate"
  //   },
  //   {
  //     Id:2,
  //     value:"CCC",
  //     filterValu:"Cfilter"
  //   },
  // ]
  const intiDataInpage = async () => {
    let neededData = {
      modelId: selectedModel.ModelID,
      userId: userData.UserID,
    };
    const checkPreviousDataset = await getPreviousPipelineDataApiBuildDataSet(neededData);
    setEditedPipeLineList(checkPreviousDataset.data.body);
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

  const selectImportHandler = (value) => {
    const selectedValue = value.target.value;

    if (selectedValue) {
      const selectedPipline = modelsList.filter(
        (data) => data.ModelID === selectedValue
      );
      setSelectedPipeLine(selectedPipline[0]);
      // setActiveExportButton(selectedPipline[0]["Export"]);
      setActiveNextButton(true);
      setActiveEditPipelineButton(true);
    }
  };

  const goNextInPipeline = () => {
    // const { DataPipeID } = selectedPipeline;
    // const { UserID } = userData;
    createPipelineData({
      // pipeLineId: DataPipeID,
      // userId: UserID,
    });
  };

  const downloadPipelineData = () => {
    const { DataPipeID, DataPipe } = selectedPipeline;
    const { UserID } = userData;
    exportPipelineData({
      pipelineName: DataPipe,
      pipeLineId: DataPipeID,
      userId: UserID,
    });
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
  const menu = (
    <Menu onClick={handleMenuClick}>
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

  const formValidations = () => {
    let isValid = true;

    if(pipeLineValue == ""){
      isValid = false;
    }

    return isValid;

  }

  const addHandler = () => {
    let isValid = formValidations();
    if(isValid){
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
    }
    else{
      displayNotification("error", "Please fill out the fields");
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

  const onChangeFilter = (item) => {
    setFilter(!filter);
    setSelectedFilter(item);
  };
  const onChangeFilterAdd = () => {
    setFilterAdd(!filterAdd);
  };

  const saveHandler = () => {
    let data = {
      modelId: selectedModel.ModelID,
      userId: userData.UserID,
      dataset: pipeLineList,
    };

    setActiveNextButton(false);
    const savedata = saveConnectAndPreviewData(data);
    displayNotification("success", "Build dataset created successfully!");
    setActiveNextButton(true);

    navigateToValidateDatset();
  };

  const displayNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  return (
    <div>
        <EditView
          navigateToValidateDatset={navigateToValidateDatset}
          editPipeLineList={editedPipeLineList}
        />
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
)(ConnectAndPreviewData);
