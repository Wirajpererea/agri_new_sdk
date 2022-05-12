import React, { useState, useEffect } from "react";
import {
  Select,
  TimePicker,
  Checkbox,
  Form,
  Button,
  Row,
  Col,
  Switch,
  Breadcrumb,
  notification,
} from "antd";
import moment from "moment";
import { MessageAlert } from "../../../components";
import {
  CloseOutlined,
  CheckOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from "@ant-design/icons";
import "./sheduleDataPipeline.scss";
import PipelineScheduleSuccessModal from "./pipelineScheduleSuccess";
import { useHistory } from "react-router-dom";
import {
  getAllFilesInFolder,
  updateModelTrainDataApi,
  getPreviousPipelineDataApiBuildDataSet,
} from "../services/modelData-service";
import { List } from "rc-field-form";
import { connect } from "react-redux";

const FormItem = Form.Item;
const { Option } = Select;
const format = "HH:mm";
const options = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const SheduleDataPipeline = ({
  userData,
  pipelineExecutionId,
  selectedPipeline,
  scheduleDataPipeline,
  schedulePipelineStatus,
  dataSource,
  selectedModel,
  navigateToProductionModel,
}) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(null);
  const [schedulePeriodType, setSchedulePeriodType] = useState(null);
  const [scheduleTime, setScheduleTime] = useState(null);
  const [scheduleDays, setScheduleDays] = useState(null);
  const [scheduleDayOfMonth, setScheduleDayOfMonth] = useState(null);
  const [scheduleMonthCount, setScheduleMonthCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState(
    dataSource === "csvDetails" ? false : true
  );
  const [scheduleFinishedStatus, setScheduleFinishedStatus] = useState(null);
  const [filesList, setFilesList] = useState([]);
  const [folderPathList, setFolderPathList] = useState([]);
  const [folderPath, setFolderPath] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [filesDetailsExtensions, setFilesDetailsExtensions] = useState([]);

  const [pipeLineListFileName, setPipeLineList] = useState("");
  const [initialSelectedFile, setInitialSelectedFile] = useState("");
  const [initialSelectedFilePath, setInitialSelectedFilePath] = useState("");
  const [selectedFolderPath, setSelectedFolderPath] = useState([]);
  const [dBFilePath, setDBFilePath] = useState("");

  useEffect(() => {
    if (schedulePipelineStatus === "success") {
      setScheduleFinishedStatus(true);
    }
  }, [schedulePipelineStatus]);

  useEffect(() => {
    initdatainpage();
    intiDataForPreInpage();
  }, []);

  useEffect(() => {}, [folderPathList]);

  const initdatainpage = async () => {
    const fileList = await getAllFilesInFolder();
    setFilesDetailsExtensions(
      fileList.data.body.fileDetails[0].Extensions.split(",")
    );
    var folderss = await folders(
      fileList.data.body.files,
      fileList.data.body.fileDetails[0].Extensions.split(",")
    );
    setFilesList(folderss != undefined ? folderss : []);
  };

  const intiDataForPreInpage = async () => {
    let neededData = {
      modelId: selectedModel.ModelID,
      userId: userData.UserID,
    };
    const checkPreviousDataset = await getPreviousPipelineDataApiBuildDataSet(
      neededData
    );
    if (checkPreviousDataset && checkPreviousDataset != undefined) {
      let fileSelectedPath = checkPreviousDataset.data.body[0].TrainingFile;

      setDBFilePath(fileSelectedPath);
      const splitFilePath =
        fileSelectedPath != undefined ? fileSelectedPath.split(",") : "";
      if (splitFilePath && splitFilePath != undefined) {
        setInitialSelectedFile(splitFilePath[1]);
        setInitialSelectedFilePath(splitFilePath[0]);
      }
    }
  };

  const folders = async (dataList, extensionList) => {
    var filelist = [];
    var folderlist = [];
    var arrayPushData = dataList.filter((item) => {
      if (item.includes(".")) {
        extensionList.filter((ext) => {
          if (item.includes(`.${ext}`)) {
            filelist.push(item);
          }
        });
      } else {
        folderlist.push(item);
      }
    });
    var listneeded = folderlist.concat(filelist);
    return listneeded;
  };

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    if (formDataField === "schedulePeriod") {
      setSchedulePeriodType(values[0]["value"]);
    }
    if (formDataField === "scheduleTime") {
      setScheduleTime(moment(values[0]["value"]).format("HHmmss"));
    }

    if (formDataField === "scheduleDays") {
      const dataValues =
        values[0]["value"].length > 0 ? values[0]["value"].join(",") : null;
      setScheduleDays(dataValues);
    }
    if (formDataField === "dayToStart") {
      setScheduleDayOfMonth(values[0]["value"]);
    }
    if (formDataField === "scheduleMonthInterval") {
      setScheduleMonthCount(values[0]["value"]);
    }

    if (schedulePeriodType) {
      if (schedulePeriodType === "Daily" && scheduleTime) {
        setActiveButton(true);
      }
      if (schedulePeriodType === "Weekly" && scheduleTime && scheduleDays) {
        setActiveButton(true);
      }
      if (
        schedulePeriodType === "Monthly" &&
        scheduleTime &&
        scheduleDayOfMonth &&
        scheduleMonthCount
      ) {
        setActiveButton(true);
      }

      if (schedulePeriodType && scheduleTime) {
        if (schedulePeriodType === "Weekly" && !scheduleDays) {
          setActiveButton(false);
        }
        if (
          schedulePeriodType === "Monthly" &&
          !scheduleDayOfMonth &&
          !scheduleMonthCount
        ) {
          setActiveButton(false);
        }
      }

      if (!schedulePeriodType && !scheduleTime) {
        setActiveButton(false);
      }
    } else {
      setActiveButton(false);
    }
  };

  const sheduleDataPipeline = () => {
    const startDate = moment().format("YYYY-MM-DD HH:mm:ss");
    const { DataPipeID } = selectedPipeline;
    const { UserID } = userData;
    const dataObj = {
      startDate: startDate,
      period: schedulePeriodType,
      time: scheduleTime,
      days: scheduleDays,
      dayToStart: scheduleDayOfMonth,
      noOfMonthsContinue: scheduleMonthCount,
      pipelineExecutionId,
      pipelineId: DataPipeID,
      userId: UserID,
    };
    scheduleDataPipeline(dataObj);
  };
  const onScheduleHandler = (value) => {
    if (dataSource !== "csvDetails") {
      setScheduleStatus(value);
    }
  };

  const redirectToDataPipe = () => {
    history.push("/data");
  };

  const openFilesInFolderPath = () => {};

  const folderClicked = async (folderName) => {
    let currentFolderPath = `${folderPath}\\${folderName}`;
    setFolderPath(currentFolderPath);
    let folderDetails = {
      name: `\\${currentFolderPath}`,
    };
    const fileList = await getAllFilesInFolder(folderDetails);
    var folderss = await folders(
      fileList.data.body.files,
      fileList.data.body.fileDetails[0].Extensions.split(",")
    );
    setFilesList(folderss);

    // setFolderPathList
    let newFolderPath = {
      id: folderPathList.length,
      name: folderName,
      nameOfPath: currentFolderPath,
    };
    setFolderPathList([...folderPathList, newFolderPath]);
  };

  const returnFolder = (item) => {
    return (
      <div style={{ fontSize: "14px" }}>
        <FolderOpenOutlined
          style={{ fontSize: "18px" }}
          onClick={() => folderClicked(item)}
        />{" "}
        {"   "}
        {item}
      </div>
    );
  };

  const returnFile = (item) => {
    return (
      <div style={{ fontSize: "14px" }}>
        <FileOutlined style={{ fontSize: "18px" }} /> {"   "}
        {item}
      </div>
    );
  };

  const onChangePath = async (id) => {
    if (id === -1) {
      const fileList = await getAllFilesInFolder();
      var folderss = await folders(
        fileList.data.body.files,
        fileList.data.body.fileDetails[0].Extensions.split(",")
      );
      setFilesList(folderss);
      setFolderPathList([]);
      setFolderPath("");
    } else {
      let selectedPath = folderPathList.filter((item) => {
        if (item.id === id) {
          return item.name;
        }
      });
      let folderDetailsChange = {
        name: selectedPath[0].nameOfPath,
      };
      const fileList = await getAllFilesInFolder(folderDetailsChange);
      var folderss = await folders(
        fileList.data.body.files,
        fileList.data.body.fileDetails[0].Extensions.split(",")
      );
      setFilesList(folderss);

      let deletedPath = folderPathList.slice(0, id + 1);
      setFolderPathList(deletedPath);
      setFolderPath(selectedPath[0].nameOfPath);
    }
  };

  const onChangeFilter = (i, item, e) => {
    setIsSelected(!isSelected);
    if (item == selectedFile || item == initialSelectedFile) {
      setSelectedFile("");
      setInitialSelectedFile("");
    } else {
      setSelectedFile(item);
    }
    setSelectedFolderPath(folderPathList);
  };

  const saveHandler = async () => {
    const saveFilePath =
      selectedFolderPath[0] != undefined
        ? selectedFolderPath[selectedFolderPath.length - 1].nameOfPath
        : "";
    let saveTrainData;
    if (selectedFile != "") {
      saveTrainData = {
        id: selectedModel.ModelID,
        filename: `${saveFilePath},${selectedFile}`,
      };
    } else {
      saveTrainData = {
        id: selectedModel.ModelID,
        filename: dBFilePath,
      };
    }
    const savedData = await updateModelTrainDataApi(saveTrainData);
    let message =
      savedData.data.body != undefined ? savedData.data.body[0] : null;
    if (message.OprStatus != 1) {
      displayNotification("error", message.ErrorMessage);
    } else {
      displayNotification("success", message.Value);
      navigateToProductionModel();
    }
  };

  const displayNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const checkFile = (fileName) => {
    let isFileName = false;
    let folderPath =
      folderPathList[0] != undefined
        ? folderPathList[folderPathList.length - 1].nameOfPath
        : folderPathList;
    if (
      initialSelectedFilePath == folderPath &&
      initialSelectedFile == fileName &&
      selectedFile == ""
    ) {
      isFileName = true;
    }
    if (selectedFile == fileName && selectedFolderPath === folderPathList) {
      isFileName = true;
    }

    return isFileName;
    // selectedFile === item ? true : false
  };
  const fileCurrentSelection = dBFilePath !== undefined ? dBFilePath.replace(",","\\") : "";
  return (
    <React.Fragment>
      <br /> <br /> <br />
      <h2>Train/Test Model</h2>
      <p>
        Select the script to be run when training the model. This can be an R
        script a python script or a Jupyter notebook file.
      </p>
      <Row>
        <Col>
          <p hidden={dBFilePath === "" ? true : false}>
            Current selection : {fileCurrentSelection}
          </p>
        </Col>
      </Row>
      <div className="file-list">
        <Row>
          <Col span={24} className="path-traindata">
            <Breadcrumb className="breadcrumb-path">
              <Breadcrumb.Item>
                <a onClick={() => onChangePath(-1)}>Home</a>
              </Breadcrumb.Item>
              {folderPathList &&
                folderPathList.length > 0 &&
                folderPathList.map((path) => {
                  return (
                    <Breadcrumb.Item>
                      <a onClick={() => onChangePath(path.id)}>{path.name}</a>
                    </Breadcrumb.Item>
                  );
                })}
            </Breadcrumb>
          </Col>
        </Row>
        <br />
        {filesList != undefined && filesList.length > 0
          ? filesList.map((item, i) => {
              var splitter = item.split(".");
              return (
                <div>
                  <Row>
                    <Col span={1} />
                    <Col span={1}>
                      {splitter.length === 1 ? null : (
                        <Checkbox
                          checked={checkFile(item)}
                          onChange={(e) => onChangeFilter(i, item, e)}
                        />
                      )}
                    </Col>
                    <Col span={15}>
                      {splitter.length === 1
                        ? returnFolder(item)
                        : returnFile(item)}
                    </Col>
                    <Col span={2} />
                  </Row>
                  <br />
                </div>
              );
            })
          : ""}
      </div>
      <Row>
        <Col span={20} />
        <Col span={4}>
          <div className="submit-btn-div-connect">
            <Button
              type="primary"
              htmlType="submit"
              className="form-submit-button active pipeline-button"
              onClick={saveHandler}
              // disabled={activeNextButton ? false : true}
            >
              Save & Next
            </Button>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  selectedModel: state.modelDataState.selectedModel,
  userData: state.mainViewState.userData,
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SheduleDataPipeline);
