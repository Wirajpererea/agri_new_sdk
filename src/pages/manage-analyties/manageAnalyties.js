import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  Typography,
  Table,
  Radio,
  Select,
  notification,
  Tag,
  Spin,
} from "antd";
import { connect } from "react-redux";
import "./manageAnalyties.scss";
import { Modal, Card } from "../../components";
import { SettingFilled } from "@ant-design/icons";
import { DspConfirmBox } from "../../components/AlertPopups/AlertPopup";
import {
  handleNewUrlDataSubmit,
  getVideosDataApi,
  deleteVideoDataApi,
  handleEditUrlDataSubmit,
  handleNewModalDataUpdate,
  getGroupApi,
} from "./services/services";
import _ from "lodash";
const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const VideoManagement = ({ userData }) => {
  const [form] = Form.useForm();
  const [videoDataState, setVideoDataState] = useState([]);
  const [newvideoDataState, setNewvideoDataState] = useState(false);
  const [editingvideoDataState, setEditingvideoDataState] = useState(false);
  const [dataLoading, setDataLoadingState] = useState(false);
  const [currentlyViewingPage, setCurrentlyViewingPage] = useState(1);
  const [totalRecordsCount, setTotalRecordsCount] = useState(10);
  const [dspConfirmBoxVisible, setDspConfirmBoxVisible] = useState(false);
  const [videoIdToDelete, setVideoIdToDelete] = useState();
  const [videoDeleteInProgress, setVideoDeleteInProgress] = useState(false);
  const [videoSaveInProgress, setVideoSaveInProgress] = useState(false);
  const [videoIdEditActionInProgress, setVideoIdEditActionInProgress] =
    useState(false);
  const [editData, setEditData] = useState(null);

  const [result, setResult] = useState([]);
  const [tagArrayList, setTagArrayList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [visibleModalSettings, setVisibleModalSettings] = useState(false);
  const [authentication, setAuthentication] = useState("");
  const [authorityUri, setAuthorityUri] = useState(null);
  const [scope, setScope] = useState(null);
  const [apiUrl, setApiUrl] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [workspaceId, setWorkspaceId] = useState(null);
  const [reportId, setReportId] = useState(null);
  const [pbiUsername, setPbiUsername] = useState(null);
  const [pbiPassword, setpbiPassword] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [tenantId, settenantId] = useState(null);
  const [modalId, setModalId] = useState();
  const [modalNewData, setModalNewData] = useState("");

  const [addNewButtonDisable, setAddNewButtonDisable] = useState(false);
  const [paginationState, setPaginationState] = useState();
  const [editableField, setEditable] = useState();
  const [searchList, setSearchList] = useState([]);
  const [updatedList, setUpdatedList] = useState([]);
  const [targetValueList, setTargetValueList] = useState("");
  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    groupDataUsers();
  }, []);
  useEffect(() => {
    onCancelClick();
    loadUsers();
  }, []);

  const handleChange = (value) => {
    setEditData({
      ...editData,
      Tags: `${value}`,
    });
  };
  const handleGroupChange = (value) => {
    setEditData({
      ...editData,
      Groups: `${value}`,
    });
  };

  const onCancelClick = () => {
    setVisibleModalSettings(false);
  };

  const columns = [
    {
      title: "URL",
      width: 50,
      dataIndex: "",
      editable: true,
      fixed: "left",
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              autoFocus={{ cursor: "start" }}
              name="videoUrl"
              value={editData !== null ? editData?.url : tableRow.url}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  url: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.id === editData.id) {
          return (
            <Input
              name="videoUrl"
              value={editData !== null ? editData.url : tableRow.url}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  url: event.target.value,
                });
              }}
            />
          );
        } else {
          return (
            <span>
              {tableRow.url.length > 50
                ? tableRow.url.substring(0, 50) + "..."
                : tableRow.url}
            </span>
          );
        }
      },
    },

    {
      title: "Name",
      width: 50,
      dataIndex: "",
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <span>
              <Input
                name="name"
                value={editData !== null ? editData.name : tableRow.name}
                onChange={(event) => {
                  setEditData({
                    ...editData,
                    name: event.target.value,
                  });
                }}
              />
            </span>
          );
        } else if (editData !== null && tableRow.id === editData.id) {
          return (
            <span>
              <Input
                name="name"
                value={editData !== null ? editData.name : tableRow.name}
                onChange={(event) => {
                  setEditData({
                    ...editData,
                    name: event.target.value,
                  });
                }}
              />
            </span>
          );
        } else {
          return <span>{tableRow.name}</span>;
        }
      },
    },

    {
      title: "Active",
      key: "",
      width: 50,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <span>
              <Checkbox
                name="checkBox"
                checked={editData != null ? editData.Active : false}
                onChange={(event) => {
                  setEditData({
                    ...editData,
                    Active: event.target.checked,
                  });
                }}
              />
            </span>
          );
        } else if (editData !== null && tableRow.id === editData.id) {
          return (
            <span>
              <Checkbox
                name="checkBox"
                checked={editData != null ? editData.Active : false}
                onChange={(event) => {
                  setEditData({
                    ...editData,
                    Active: event.target.checked === true ? 1 : 0,
                  });
                }}
              />
            </span>
          );
        } else {
          return (
            <span>
              <Checkbox
                name="checkBox"
                checked={tableRow.Active === 1 ? true : false}
                disabled={true}
              />
            </span>
          );
        }
      },
    },

    {
      title: "Open in new tab",
      key: "",
      width: 50,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <span>
              <Radio
                name="radio"
                checked={editData != null ? editData.isNewTab : false}
                onClick={() => newTabClickHandler(tableRow)}
              />
            </span>
          );
        } else if (editData !== null && tableRow.id === editData.id) {
          return (
            <span>
              <Radio
                name="radio"
                checked={editData.isNewTab}
                onClick={() => editTabClickHandler(tableRow)}
              />
            </span>
          );
        } else {
          return (
            <span>
              <Radio name="radio" checked={tableRow.isNewTab} disabled={true} />
            </span>
          );
        }
      },
    },

    {
      title: "Open in iframe",
      key: "",
      width: 50,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <span>
              <Radio
                name="radio"
                checked={editData != null ? editData.isIframe : false}
                onClick={() => newIframeOnClickHandler(tableRow)}
              />
            </span>
          );
        } else if (editData !== null && tableRow.id === editData.id) {
          return (
            <span>
              <Radio
                name="radio"
                checked={editData.isIframe}
                onClick={() => editIframeClickHandler(tableRow)}
              />
            </span>
          );
        } else {
          return (
            <span>
              <Radio name="radio" checked={tableRow.isIframe} disabled={true} />
            </span>
          );
        }
      },
    },
    {
      title: "Tags",
      key: "",
      width: 50,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <span>
              <Row>
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  onChange={handleChange}
                >
                  {tagArrayList.push(
                    <Option key={tagArrayList.name}>{tagArrayList.name}</Option>
                  )}
                </Select>
              </Row>
            </span>
          );
        } else if (editData !== null && tableRow.id === editData.id) {
          let initialTagsForUrl;

          if (tableRow.Tags != null && tableRow.Tags[0] != "") {
            initialTagsForUrl = tableRow.Tags;
          } else {
            initialTagsForUrl = [];
          }

          return (
            <span>
              <Row>
                <Select
                  mode="tags"
                  defaultValue={initialTagsForUrl}
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  onChange={handleChange}
                >
                  {tagArrayList.push(
                    <Option key={tagArrayList.name}>{tagArrayList.name}</Option>
                  )}
                </Select>
              </Row>
            </span>
          );
        } else {
          return (
            <span>
              {tableRow.Tags != null &&
                tableRow.Tags.map((item) => {
                  return <Tag>{item}</Tag>;
                })}
            </span>
          );
        }
      },
    },
    {
      title: "Groups",
      key: "",
      width: 50,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <span>
              <Row>
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  onChange={handleGroupChange}
                >
                  {groupList &&
                    groupList.length > 0 &&
                    groupList.map((item) => {
                      return (
                        <Option key={item.UserID} value={item.Groups}>
                          {item.Groups}
                        </Option>
                      );
                    })}
                </Select>
              </Row>
            </span>
          );
        } else if (editData !== null && tableRow.id === editData.id) {
          let initialGroupForUrl;

          if (tableRow.Groups != null && tableRow.Groups[0] != "") {
            initialGroupForUrl = tableRow.Groups;
          } else {
            initialGroupForUrl = [];
          }

          return (
            <span>
              <Row>
                <Select
                  mode="multiple"
                  defaultValue={initialGroupForUrl}
                  style={{ width: "100%" }}
                  placeholder="Groups Mode"
                  onChange={handleGroupChange}
                >
                  {groupList &&
                    groupList.length > 0 &&
                    groupList.map((item) => {
                      return (
                        <Option key={item.UserID} value={item.Groups}>
                        {item.Groups}
                      </Option>
                      );
                    })}
                </Select>
              </Row>
            </span>
          );
        } else {
          return (
            <span>
              {tableRow.Groups != null ? (
                <Tag>{tableRow.Groups}</Tag>
              ) : (
                <span></span>
              )}
            </span>
          );
        }
      },
    },
    {
      title: "Configuration",
      key: "",
      dataIndex: "",
      width: 50,
      render: (tableRow) => {
        return (
          <span className="settings-icon-click">
            <SettingFilled
              onClick={() => handleModalData(tableRow)}
            ></SettingFilled>
          </span>
        );
      },
    },

    {
      title: "",
      key: "",
      width: 40,
      fixed: "right",
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Row>
              <Col span={12}>
                <Button
                  onClick={() => save("new")}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col
                span={12}
                style={{ textAlign: "center", marginTop: "5px" }}
              ></Col>
            </Row>
          );
        } else if (editData !== null && tableRow.id === editData.id) {
          return (
            <Row>
              <Col span={12}>
                <Button
                  onClick={() => save("edit")}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col
                span={12}
                style={{ textAlign: "center", marginTop: "5px" }}
              ></Col>
            </Row>
          );
        } else {
          return (
            <Button
              onClick={() => {
                handleEditData(tableRow);
              }}
            >
              Edit
            </Button>
          );
        }
      },
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 40,
      render: (tableRow) => {
        if (tableRow.id) {
          return (
            <span>
              <Button
                onClick={() => {
                  handleDeleteExistingUser(tableRow.id);
                }}
                style={{
                  marginRight: 8,
                }}
              >
                Delete
              </Button>
            </span>
          );
        } else {
          return (
            <span>
              <Button
                onClick={() => {
                  setAddNewButtonDisable(!addNewButtonDisable);
                  loadUsers();
                }}
                style={{
                  marginRight: 8,
                }}
              >
                Clear
              </Button>
            </span>
          );
        }
      },
    },
  ];
  const handleEditData = (editDetails) => {
    setEditData({
      ...editDetails,
      isIframe: editDetails.isIframe != null ? editDetails.isIframe : false,
      isNewTab: editDetails.isNewTab != null ? editDetails.isNewTab : false,
    });
  };

  const save = async (type) => {
    try {
      if (type === "new") {
        let newData = {
          ...editData,
          active: editData.Active === true ? 1 : 0,
          thumbnail_name: null,
          OrderCol: 0,
          UserID: userData.UserID,
        };

        const newurl = await handleNewDataSubmit(newData);
      }
      if (type === "edit") {
        let newData = {
          ...editData,
        };
        const editUrl = await handleEditDataSubmit(newData);
      }
    } catch (errInfo) {}
  };

  const searchChange = (e) => {
    const searchKey = e.target.value;
    const lowerCasedInputValue = searchKey.toLowerCase();
    setTargetValueList(e.target.value);

    const searchListUpdated = searchList.filter((dataObj) => {
      let tags = dataObj.Tags;
      const tagsLowerCase = tags != null ? tags.toLowerCase() : null;

      if (
        tagsLowerCase != null &&
        tagsLowerCase.includes(`${lowerCasedInputValue}`)
      ) {
        return dataObj;
      }
    });
    let concatList = [];
    const addStateData = searchListUpdated.map((item) => {
      let getTagsArraylist = item.Tags;
      let splitTagsArraylist =
        getTagsArraylist != null ? getTagsArraylist.split(",") : null;
      if (
        splitTagsArraylist &&
        splitTagsArraylist != null &&
        splitTagsArraylist.length > 0
      ) {
        concatList = concatList.concat(splitTagsArraylist);
      }
      const propertyAddedList =
        concatList.length > 0 &&
        concatList.map((item) => {
          let updatedItem = {
            name: item,
          };
          return updatedItem;
        });
      setTagArrayList(propertyAddedList);
      return {
        ...item,
        Tags: splitTagsArraylist,
      };
    });
    setUpdatedList(addStateData);
  };

  const onAddUserClick = () => {
    setPaginationState(1);
    setEditable(false);
    setAddNewButtonDisable(!addNewButtonDisable);
    setVideoDataState([{ newlyAdded: true }, ...videoDataState]);
    setEditData({
      ...editData,
      isIframe: false,
      isNewTab: false,
      Tags: "",
      Groups: "",
    });
    if (!newvideoDataState) {
      setNewvideoDataState({
        Url: "",
      });
    } else {
      console.log("Please save the existing video url");
    }
  };

  const handleNewDataSubmit = async (data) => {
    try {
      setVideoSaveInProgress(true);
      const newUserSaveResponse = await handleNewUrlDataSubmit(data);
      setVideoSaveInProgress(false);
      setEditData(null);
      if (newUserSaveResponse.data.message == "success") {
        setAddNewButtonDisable(!addNewButtonDisable);
        setPaginationState();
        displayNotification("success", "URL saved successfully!");
        setNewvideoDataState(false);
        loadUsers();
      } else {
        displayNotification("error", "URL saving failed!");
      }
    } catch (error) {
      displayNotification("error", "URL saving failed!");
    }
  };

  const handleEditDataModalSubmit = async (value) => {
    try {
      const dataparams = {
        id: modalId,
        authenticationMode:
          authentication != null
            ? authentication
            : modalNewData.AuthenticationMode,
        authorityUri:
          authorityUri != null ? authorityUri : modalNewData.AuthorityUri,
        scope: scope != null ? scope : modalNewData.Scope,
        apiUrl: apiUrl != null ? apiUrl : modalNewData.APIUrl,
        clientId: clientId != null ? clientId : modalNewData.ClientID,
        workspaceId:
          workspaceId != null ? workspaceId : modalNewData.WorkspaceID,
        reportId: reportId != null ? reportId : modalNewData.ReportID,
        pbiUsername:
          pbiUsername != null ? pbiUsername : modalNewData.pbiUsername,
        pbiPassword:
          pbiPassword != null ? pbiPassword : modalNewData.pbiPassword,
        clientSecret:
          clientSecret != null ? clientSecret : modalNewData.ClientSecret,
        tenantId: tenantId != null ? tenantId : modalNewData.TenantID,
      };
      const updateResponse = await handleNewModalDataUpdate(dataparams);
      if (updateResponse.data.message == "success") {
        displayNotification("success", "URL saved successfully!");
        setEditingvideoDataState(false);
        loadUsers();
        setVisibleModalSettings(false);
      } else {
        displayNotification("error", "URL saved failed!");
      }
    } catch (error) {
      displayNotification("error", "URL saved failed!");
    }
  };

  const handleEditDataSubmit = async (data) => {
    try {
      setVideoIdEditActionInProgress(editingvideoDataState.id);
      const updateResponse = await handleEditUrlDataSubmit(data);
      setVideoIdEditActionInProgress(false);
      setEditData(null);
      if (updateResponse.data.message == "success") {
        displayNotification("success", "URL saved successfully!");
        setEditingvideoDataState(false);
        loadUsers();
      } else {
        displayNotification("error", "URL saved failed!");
      }
    } catch (error) {
      displayNotification("error", "URL saved failed!");
    }
  };

  const handleDeleteExistingUser = async (data) => {
    const { id } = data;
    setDspConfirmBoxVisible(true);
    setVideoIdToDelete(data);
  };

  const handleModalData = async (data) => {
    setAuthentication(data.AuthenticationMode);
    setAuthorityUri(data.AuthorityUri);
    setScope(data.Scope);
    setApiUrl(data.APIUrl);
    setClientId(data.ClientID);
    setWorkspaceId(data.WorkspaceID);
    setReportId(data.ReportID);
    setPbiUsername(data.pbiUsername);
    setpbiPassword(data.pbiPassword);
    setClientSecret(data.ClientSecret);
    settenantId(data.TenantID);
    const { id } = data;
    setVisibleModalSettings(true);
    setModalId(data.id);
    setModalNewData(data);
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
      userId: userData.UserID,
      userRole: userData.UserRole,
    };

    const userDataView = await getVideosDataApi(dataParams);
    let vidData = userDataView.data.body;

    setSearchList(userDataView.data.body);
    let concatList = [];
    const addStateData = vidData.map((item) => {
      let getTagsArraylist = item.Tags;
      let getGroupArraylist = item.Groups;

      let splitTagsArraylist =
        getTagsArraylist != null ? getTagsArraylist.split(",") : null;
      let splitgroupArraylist =
        getGroupArraylist != null ? getGroupArraylist.split(",") : null;
      if (
        splitTagsArraylist &&
        splitTagsArraylist != null &&
        splitTagsArraylist.length > 0
      ) {
        concatList = concatList.concat(splitTagsArraylist);
      }
      const propertyAddedList =
        concatList.length > 0 &&
        concatList.map((item) => {
          let updatedItem = {
            name: item,
          };
          return updatedItem;
        });
      setTagArrayList(propertyAddedList);
      return {
        ...item,
        Tags: splitTagsArraylist,
        Groups: getGroupArraylist,
      };
    });
    setVideoDataState(addStateData);
    setCurrentlyViewingPage(parseInt(userDataView.data.page));
    setTotalRecordsCount(userDataView.data.total_rows);
    setDataLoadingState(false);
  };
  const groupDataUsers = async (params) => {
    const groupData = await getGroupApi();
    setGroupList(groupData.data.body);
  };

  const newIframeOnClickHandler = (row) => {
    setEditData({
      ...editData,
      isNewTab: false,
      isIframe: editData.isIframe ? !editData.isIframe : true,
    });
  };

  const editIframeClickHandler = (row) => {
    setEditData({
      ...editData,
      isNewTab: editData.isIframe,
      isIframe: !editData.isIframe,
    });
  };

  const newTabClickHandler = (row) => {
    setEditData({
      ...editData,
      isNewTab: editData.isNewTab ? !editData.isNewTab : true,
      isIframe: false,
    });
  };

  const editTabClickHandler = (row) => {
    setEditData({
      ...editData,
      isNewTab: !editData.isNewTab,
      isIframe: editData.isNewTab,
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
                <h2 className="title">Manage Analytics</h2>
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
                disabled={addNewButtonDisable}
                onClick={onAddUserClick}
              >
                + Add Url
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="search-by-tags">
          <Col span={4}>
            <Input
              className="input-search-by-tag"
              placeholder="Search by tags"
              onChange={(e) => searchChange(e)}
            ></Input>
          </Col>
        </Row>

        <Spin tip="Loading..." spinning={dataLoading} size="large">
          {/* TABLE******************************************************************************** */}
          <div className="user-data-editable">
            <Table
              rowClassName="editable-row"
              dataSource={targetValueList != "" ? updatedList : videoDataState}
              columns={columns}
              scroll={{ x: 1500, y: 300 }}
              pagination={{ current: paginationState }}
              style={{ cursor: "pointer" }}
            />
            <DspConfirmBox
              title=""
              message="Do you want to delete the selected url?"
              callbackOnOk={async () => {
                try {
                  setVideoDeleteInProgress(true);

                  const deleteUserResponse = await deleteVideoDataApi({
                    id: videoIdToDelete,
                  });

                  setVideoDeleteInProgress(false);
                  if (deleteUserResponse.data.message == "success") {
                    setDspConfirmBoxVisible(false);
                    displayNotification("success", "Url deleted successfully!");
                    loadUsers();
                  } else {
                    setDspConfirmBoxVisible(false);
                    displayNotification("error", "Url deletion failed!");
                  }
                } catch (error) {
                  setDspConfirmBoxVisible(false);
                  displayNotification("error", "Url deletion failed!");
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

        <Modal
          maskClosable={true}
          visible={visibleModalSettings}
          onCancel={onCancelClick}
          width={800}
          customClass="settings-modal-data"
        >
          <div className="manage-analytics-main-modal">
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">authenticationMode :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  name="authenticationMode"
                  className="text-input-field"
                  onChange={(e) => setAuthentication(e.target.value)}
                  value={authentication == "null" ? "" : authentication}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">authorityUri :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  name="authorityUri"
                  className="text-input-field"
                  onChange={(e) => setAuthorityUri(e.target.value)}
                  value={authorityUri == "null" ? "" : authorityUri}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">Scope :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  name="scope"
                  className="text-input-field"
                  onChange={(e) => setScope(e.target.value)}
                  value={scope == "null" ? "" : scope}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">apiUrl :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  className="text-input-field"
                  onChange={(e) => setApiUrl(e.target.value)}
                  value={apiUrl == "null" ? "" : apiUrl}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">clientId :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  className="text-input-field"
                  onChange={(e) => setClientId(e.target.value)}
                  value={clientId == "null" ? "" : clientId}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">workspaceId :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  className="text-input-field"
                  onChange={(e) => setWorkspaceId(e.target.value)}
                  value={workspaceId == "null" ? "" : workspaceId}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">reportId :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  className="text-input-field"
                  onChange={(e) => setReportId(e.target.value)}
                  value={reportId == "null" ? "" : reportId}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">pbiUsername :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  className="text-input-field"
                  onChange={(e) => setPbiUsername(e.target.value)}
                  value={pbiUsername == "null" ? "" : pbiUsername}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">pbiPassword :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  className="text-input-field"
                  onChange={(e) => setpbiPassword(e.target.value)}
                  value={pbiPassword == "null" ? "" : pbiPassword}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">clientSecret :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  className="text-input-field"
                  onChange={(e) => setClientSecret(e.target.value)}
                  value={clientSecret == "null" ? "" : clientSecret}
                />
              </Col>
            </Row>
            <Row className="row-main-details">
              <Col span={6} className="row-main-text">
                <p className="row-main-text-styles">tenantId :</p>
              </Col>
              <Col span={18} className="input-text-main-container">
                <Input
                  type="text"
                  className="text-input-field"
                  onChange={(e) => settenantId(e.target.value)}
                  value={tenantId == "null" ? "" : tenantId}
                />
              </Col>
            </Row>
            <div className="buttons-main-container">
              <Row className="button-save-details">
                <Col span={19}>
                  <Button
                    className="save-button"
                    onClick={handleEditDataModalSubmit}
                  >
                    Save
                  </Button>
                </Col>
                <Col span={5}>
                  <Button className="cancel-button" onClick={onCancelClick}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Modal>
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
