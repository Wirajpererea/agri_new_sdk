import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  Pagination,
  notification,
  Spin,
  Empty,
  Tooltip,
  Typography,
  Table,
} from "antd";
import { connect } from "react-redux";
import "./videoManagement.scss";

import { Card } from "../../components";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UndoOutlined,
} from "@ant-design/icons";

import { DspConfirmBox } from "../../components/AlertPopups/AlertPopup";

import {
  createVideoApi,
  getVideosDataApi,
  deleteVideoDataApi,
  updateVideoApi,
} from "./services/services";

const FormItem = Form.Item;
const { Paragraph } = Typography;

const VideoManagement = () => {
  const [form] = Form.useForm();

  const [videoDataState, setVideoDataState] = useState([]);
  const [newvideoDataState, setNewvideoDataState] = useState(false);
  const [editingvideoDataState, setEditingvideoDataState] = useState(false);
  const [dataLoading, setDataLoadingState] = useState(false);
  const [currentlyViewingPage, setCurrentlyViewingPage] = useState(1);
  const [totalRecordsCount, setTotalRecordsCount] = useState(10);
  const [dspConfirmBoxVisible, setDspConfirmBoxVisible] = useState(false);
  const [videoIdToDelete, setVideoIdToDelete] = useState(false);
  const [videoDeleteInProgress, setVideoDeleteInProgress] = useState(false);
  const [videoSaveInProgress, setVideoSaveInProgress] = useState(false);
  const [videoIdEditActionInProgress, setVideoIdEditActionInProgress] =
    useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const columns = [
    {
      title: "Video URL",
      width: 500,
      dataIndex: "",
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="videoUrl"
              onChange={(event) => {
                setEditData({
                  ...editData,
                  Url: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.ID === editData.ID) {
          return (
            <Input
              name="videoUrl"
              value={editData !== null ? editData.Url : tableRow.Url}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  Url: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>{tableRow.Url}</span>;
        }
      },
    },
    {
      title: "",
      key: "operation",
      width: 150,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Row>
              <Col span={12}>
                <Button
                  onClick={() => save()}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: "center", marginTop: "5px" }}>
                <UndoOutlined style={{ fontSize: "16px" }} onClick={cancel} />
              </Col>
            </Row>
          );
        } else if (editData !== null && tableRow.ID === editData.ID) {
          return (
            <Row>
              <Col span={12}>
                <Button
                  onClick={() => editExistingUrl()}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: "center", marginTop: "5px" }}>
                <UndoOutlined style={{ fontSize: "16px" }} onClick={cancel} />
              </Col>
            </Row>
          );
        } else {
          return <Button onClick={() => edit(tableRow)}>Edit</Button>;
        }
      },
    },
    {
      title: "",
      key: "operation",
      width: 100,
      render: (tableRow) => {
        return (
          <span>
            <Button
              onClick={() => {
                handleDeleteExistingUser({
                  ID: tableRow.ID,
                });
              }}
              style={{
                marginRight: 8,
              }}
            >
              Delete
            </Button>
          </span>
        );
      },
    },
  ];

  const save = async () => {
    try {
      let updatedData = {
        videoUrl: editData.Url,
      };
      handleNewUserDataSubmit(updatedData);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const editExistingUrl = async () => {
    let updatedExistingUrl = {
      videoUrl: editData.Url,
      videoId: editData.ID,
    };
    const editurl = await handleEditUserDataSubmit(updatedExistingUrl);
  };

  const edit = (record) => {
    setEditData(record);
  };

  const cancel = () => {
    setEditData(null);
    //  setNewAddUser(false);
    loadUsers();
  };

  const onAddUserClick = () => {
    setVideoDataState([{ newlyAdded: true }, ...videoDataState]);

    if (!newvideoDataState) {
      setNewvideoDataState({
        Url: "",
      });
    } else {
      console.log("Please save the existing video url");
    }
  };

  const onNewUserDelete = () => {
    setNewvideoDataState(false);
  };

  const onEditUserClick = (data) => {
    if (!editingvideoDataState) {
      setEditingvideoDataState(data);
    } else {
      console.log("Please save the existing video");
    }
  };

  const handleNewUserDataSubmit = async (data) => {
    try {
      setVideoSaveInProgress(true);
      const newUserSaveResponse = await createVideoApi(data);
      setVideoSaveInProgress(false);
      setEditData(null);
      if (newUserSaveResponse.data.message == "success") {
        displayNotification("success", "New video saved successfully!");
        setNewvideoDataState(false);
        loadUsers();
      } else {
        displayNotification("error", "New video saving failed!");
      }
    } catch (error) {
      console.log("error occured", error);
      displayNotification("error", "New video saving failed!");
    }
  };

  const handleEditUserDataSubmit = async (data) => {
    try {
      setVideoIdEditActionInProgress(editingvideoDataState.ID);
      const updateResponse = await updateVideoApi(data);
      setVideoIdEditActionInProgress(false);
      setEditData(null);
      if (updateResponse.data.message == "success") {
        displayNotification("success", "Video details updated successfully!");
        setEditingvideoDataState(false);
        loadUsers();
      } else {
        displayNotification("error", "Video details update failed!");
      }
    } catch (error) {
      displayNotification("error", "Video details update failed!");
    }
  };

  const handleDeleteExistingUser = async (data) => {
    const { ID } = data;
    setDspConfirmBoxVisible(true);
    setVideoIdToDelete(ID);
  };

  const displayNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const loadUsers = async (params) => {
    const page =
      typeof params !== "undefined" && typeof params.page !== "undefined"
        ? params.page
        : 1;
    setDataLoadingState(true);
    setVideoDataState([]);
    let dataParams = {
      page: page,
    };

    const userData = await getVideosDataApi(dataParams);
    setVideoDataState(userData.data.body);
    setCurrentlyViewingPage(parseInt(userData.data.page));
    setTotalRecordsCount(userData.data.total_rows);
    setDataLoadingState(false);
  };

  const pageChangeHandler = (page, rowCount) => {
    loadUsers({
      page: page,
    });
  };

  return (
    <div>
      <Card
        style={{ width: "95%" }}
        customClass="user-management-card page-section"
      >
        <Row className="user-mgt-search-input-row">
          <Col span={12}>
            <Row>
              <Col span={24}>
                <h2 className="title">Video Management</h2>
              </Col>
            </Row>
          </Col>
          <Col span={8}></Col>
          <Col span={4}>
            <div className="submit-btn-div">
              <Button
                type="ghost"
                htmlType="submit"
                className="user-mgt-form-submit-button active"
                disabled={false}
                onClick={onAddUserClick}
              >
                + Add Video
              </Button>
            </div>
          </Col>
        </Row>

        <Spin tip="Loading..." spinning={dataLoading} size="large">
          {/* TABLE******************************************************************************** */}
          <div className="user-data-editable">
            <Table
              rowClassName="editable-row"
              dataSource={videoDataState}
              columns={columns}
            />
            <DspConfirmBox
              title=""
              message="Do you want to delete the selected url?"
              callbackOnOk={async () => {
                try {
                  setVideoDeleteInProgress(true);
                  const deleteUserResponse = await deleteVideoDataApi({
                    videoId: videoIdToDelete,
                  });

                  setVideoDeleteInProgress(false);
                  if (deleteUserResponse.data.message == "success") {
                    setDspConfirmBoxVisible(false);
                    displayNotification(
                      "success",
                      "Video deleted successfully!"
                    );
                    loadUsers();
                  } else {
                    setDspConfirmBoxVisible(false);
                    displayNotification("error", "Video deletion failed!");
                  }
                } catch (error) {
                  setDspConfirmBoxVisible(false);
                  displayNotification("error", "Video deletion failed!");
                }
              }}
              callbackOnCancel={() => {
                setDspConfirmBoxVisible(false);
                setVideoIdToDelete(false);
              }}
              visibleState={dspConfirmBoxVisible}
              okActivityInProgressState={videoDeleteInProgress}
              okActivityInProgressButtonText="Deleting..."
              okButtonText="Delete"
            />
          </div>
        </Spin>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  userDataUpdateState: state.mainViewState.userDataUpdateState,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VideoManagement);
