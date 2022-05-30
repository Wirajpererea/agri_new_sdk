import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Checkbox,
  notification,
  Spin,
  Typography,
  Transfer,
  Table,
  Tag,
  Select,
} from "antd";
import { connect } from "react-redux";
import "./userManagement-batch.scss";
import { Card, DspConfirmBox, Modal } from "../../components";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UndoOutlined,
} from "@ant-design/icons";

import {
  createUserApi,
  getUsersDataApi,
  deleteUserDataApi,
  updateUserApi,
  getUserRolesApi,
  saveUserRole,
  getUserRoleByUserId,
  getGroupApi,
} from "./services/services";
const { Option } = Select;
const mockData = [
  { key: 1, title: "User Management", value: "um", userId: 2 },
  { key: 2, title: "Data Integration", value: "di" },
  { key: 3, title: "Data Dictionary", value: "dd", userId: 2 },
  { key: 4, title: "Manage Videos", value: "mv" },
  { key: 5, title: "Data", value: "d", userId: 2 },
];

const initialTargetKeys = mockData
  .filter((item) => item.selected === false)
  .map((item) => item.key);

const FormItem = Form.Item;

const UserManagementBatch = ({
  userData,
  resetUserDataStatus,
}) => {
  const [form] = Form.useForm();

  const [userDataState, setUserDataState] = useState([]);
  const [newUserDataState, setNewUserDataState] = useState(false);
  const [editingUserDataState, setEditingUserDataState] = useState(false);
  const [usersSearchValueState, setUsersSearchValueState] = useState("");
  const [dataLoading, setDataLoadingState] = useState(false);
  const [currentlyViewingPage, setCurrentlyViewingPage] = useState(1);
  const [totalRecordsCount, setTotalRecordsCount] = useState(10);
  const [dspConfirmBoxVisible, setDspConfirmBoxVisible] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(false);
  const [userDeleteInProgress, setUserDeleteInProgress] = useState(false);
  const [userSaveInProgress, setUserSaveInProgress] = useState(false);
  const [toggleDataRoleInfoModal, setToggleDataRoleInfoModal] = useState(false);
  const [editDataRoleInView, setEditDataRoleInView] = useState(false);
  const [userIdEditActionInProgress, setUserIdEditActionInProgress] =
    useState(false);

  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [editData, setEditData] = useState(null);
  const [newAddUser, setNewAddUser] = useState(false);
  const [editInView, setEditInView] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    return () => {
      resetUserDataStatus();
    };
  }, [resetUserDataStatus]);

  useEffect(() => {
    loadUsers();
  }, []);
  useEffect(() => {
    groupDataUsers();
  }, []);
  useEffect(() => {
    initDataInPage();
  }, []);
  const groupDataUsers = async (params) => {
    const groupData = await getGroupApi();

    setGroupList(groupData.data.body);
  };
  const handleGroupChange = (value) => {
    setEditData({
      ...editData,
      Groups: `${value}`,
    });
  };
  const columns = [
    {
      title: "First Name",
      width: 100,
      dataIndex: "",
      fixed: "left",
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="FirstName"
              onChange={(event) => {
                setEditData({
                  ...editData,
                  FirstName: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <Input
              name="FirstName"
              value={
                editData !== null ? editData.FirstName : tableRow.FirstName
              }
              onChange={(event) => {
                setEditData({
                  ...editData,
                  FirstName: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>{tableRow.FirstName}</span>;
        }
      },
    },
    {
      title: "Last Name",
      width: 100,
      dataIndex: "",
      fixed: "left",
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="LastName"
              onChange={(event) => {
                setEditData({
                  ...editData,
                  LastName: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <Input
              name="LastName"
              value={editData !== null ? editData.LastName : tableRow.LastName}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  LastName: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>{tableRow.LastName}</span>;
        }
      },
    },
    {
      title: "Email",
      dataIndex: "",
      key: "1",
      width: 150,
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="Email"
              onChange={(event) => {
                setEditData({
                  ...editData,
                  Email: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <Input
              name="Email"
              value={editData !== null ? editData.Email : tableRow.Email}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  Email: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>{tableRow.Email}</span>;
        }
      },
    },
    {
      title: "Password",
      dataIndex: "",
      key: "2",
      width: 150,
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="Password"
              type="password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(event) => {
                setEditData({
                  ...editData,
                  Password: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <Input
              name="Password"
              type="Password"
              value={editData !== null ? editData.Password : "********"}
              onChange={(event) => {
                setEditData({
                  ...editData,
                  Password: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>********</span>;
        }
      },
    },
    {
      title: "License",
      dataIndex: "",
      key: "3",
      width: 150,
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="LicenceKey"
              onChange={(event) => {
                setEditData({
                  ...editData,
                  LicenceKey: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <Input
              name="LicenceKey"
              value={
                editData !== null ? editData.LicenceKey : tableRow.LicenceKey
              }
              onChange={(event) => {
                setEditData({
                  ...editData,
                  LicenceKey: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>{tableRow.LicenceKey}</span>;
        }
      },
    },
    {
      title: "Organization",
      dataIndex: "",
      key: "4",
      width: 150,
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Input
              name="UserOrganization"
              onChange={(event) => {
                setEditData({
                  ...editData,
                  UserOrganization: event.target.value,
                });
              }}
            />
          );
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <Input
              name="UserOrganization"
              value={
                editData !== null
                  ? editData.UserOrganization
                  : tableRow.UserOrganization
              }
              onChange={(event) => {
                setEditData({
                  ...editData,
                  UserOrganization: event.target.value,
                });
              }}
            />
          );
        } else {
          return <span>{tableRow.UserOrganization}</span>;
        }
      },
    },
    {
      title: "Role",
      dataIndex: "",
      key: "5",
      width: 250,
      editable: true,
      render: (tableRow) => {
        if (tableRow.UserRole !== undefined) {
          let splittedRoles = tableRow.UserRole.split(",");
          let role = "";
          switch (splittedRoles[0]) {
            case "1":
              role = "Admin";
              break;
            case "2":
              role = "Data Manager";
              break;
            case "3":
              role = "Model Manager";
              break;
            case "4":
              role = "Analytics Manager";
              break;
            case "5":
              role = "Analytics user";
              break;
            case "6":
              role = "Model User";
              break;
          }

          return (
            <Button
              style={{ width: "175px" }}
              type="ghost"
              onClick={() => {
                navItemHandler(tableRow.UserID);
              }}
            >
              {splittedRoles.length === 1 ? role : `${role}...`}
            </Button>
          );
        } else {
          return (
            <Button
              style={{ width: "175px", fontStyle: "italic" }}
              type="ghost"
              onClick={() => {
                navItemHandler(tableRow.UserID);
              }}
            >
              Add a user role
            </Button>
          );
        }
      },
    },
    {
      title: "Groups",
      key: "",
      width: 150,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <span>
              <Row>
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Tags Mode"
                  onChange={handleGroupChange}
                >
                  {groupList &&
                    groupList.length > 0 &&
                    groupList.map((item) => {
                      return (
                        <Option key={item.Groups} value={item.Groups}>
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
                  mode="tags"
                  defaultValue={initialGroupForUrl}
                  style={{ width: "100%" }}
                  placeholder="Groups Mode"
                  onChange={handleGroupChange}
                >
                  {groupList &&
                    groupList.length > 0 &&
                    groupList.map((item) => {
                      return (
                        <Option key={item.Groups} value={item.Groups}>
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
      title: "Enable",
      dataIndex: "",
      key: "6",
      width: 150,
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <FormItem
              className="user-mgt-form-item"
              valuePropName="checked"
              initialValue={false}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Checkbox
                onChange={(event) => {
                  setEditData({
                    ...editData,
                    UserStatus: event.target.checked,
                  });
                }}
                defaultChecked={false}
              />
            </FormItem>
          );
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <FormItem
              className="user-mgt-form-item"
              valuePropName="checked"
              initialValue={tableRow.UserStatus === true ? true : false}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Checkbox
                onChange={(event) => {
                  setEditData({
                    ...editData,
                    UserStatus: event.target.checked,
                  });
                }}
                defaultChecked={tableRow.UserStatus === true ? true : false}
              />
            </FormItem>
          );
        } else {
          return (
            <FormItem
              className="user-mgt-form-item"
              valuePropName="checked"
              initialValue={tableRow.UserStatus === true ? true : false}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Checkbox
                disabled={
                  editingUserDataState &&
                  editingUserDataState.UserID == tableRow.UserID
                    ? false
                    : true
                }
                defaultChecked={tableRow.UserStatus === true ? true : false}
              />
            </FormItem>
          );
        }
      },
    },

    {
      title: "Enforce 2fa",
      dataIndex: "",
      key: "6",
      width: 150,
      editable: true,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <FormItem
              className="user-mgt-form-item"
              valuePropName="checked"
              initialValue={false}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Checkbox
                onChange={(event) => {
                  setEditData({
                    ...editData,
                    Enforce2fa: event.target.checked,
                  });
                }}
                defaultChecked={false}
              />
            </FormItem>
          );
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <FormItem
              className="user-mgt-form-item"
              valuePropName="checked"
              initialValue={tableRow.Enforce2fa === true ? true : false}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Checkbox
                onChange={(event) => {
                  setEditData({
                    ...editData,
                    Enforce2fa: event.target.checked,
                  });
                }}
                defaultChecked={tableRow.Enforce2fa === true ? true : false}
              />
            </FormItem>
          );
        } else {
          return (
            <FormItem
              className="user-mgt-form-item"
              valuePropName="checked"
              initialValue={tableRow.Enforce2fa === true ? true : false}
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Checkbox
                disabled={
                  editingUserDataState &&
                  editingUserDataState.UserID == tableRow.UserID
                    ? false
                    : true
                }
                defaultChecked={tableRow.Enforce2fa === true ? true : false}
              />
            </FormItem>
          );
        }
      },
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 150,
      render: (tableRow) => {
        if (typeof tableRow.newlyAdded !== "undefined") {
          return (
            <Row>
              <Col span={12}>
                <Button
                  // onClick={() => save()}
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
        } else if (editData !== null && tableRow.key === editData.key) {
          return (
            <Row>
              <Col span={12}>
                <Button
                  // onClick={() => save()}
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
      fixed: "right",
      width: 100,
      render: (tableRow) => {
        return (
          <span>
            <Button
              onClick={() => {
                handleDeleteExistingUser({
                  UserID: tableRow.UserID,
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

  const cancel = () => {
    setEditData(null);
    setNewAddUser(false);
    loadUsers();
  };
  const edit = (record) => {
    setEditData(record);
  };

  const initDataInPage = async () => {
    const getUserRoles = await getUserRolesApi();
    const rolelist = getUserRoles.data.map((item) => {
      let updatedItem = {
        key: item.Id,
        title: item.Role,
        value: item.Role,
        selected: false,
      };
      return updatedItem;
    });
    setUserRoles(rolelist);
  };

  const onAddUserClick = () => {
    setNewAddUser(true);
    setTargetKeys([]);
    setUserDataState([{ newlyAdded: true }, ...userDataState]);
  };

  const saveValidations = (data) => {
    let isValid = true;

    if (data != null || data != undefined) {
      if (data.UserRole === "" || data.UserRole === undefined) {
        isValid = false;
      }
    }
    return isValid;
  };

  // const handleNewUserDataSubmit = async (data) => {
  //   try {
  //     let isValid = saveValidations(data);
  //     if (isValid) {
  //       var ciphertext = CryptoJS.AES.encrypt(
  //         JSON.stringify(data),
  //         "my-secret-key@123"
  //       ).toString();
  //       let userdetailsNeeded = {
  //         userdetails: ciphertext,
  //       };
  //       setUserSaveInProgress(true);
  //       const newUserSaveResponse = await createUserApi(userdetailsNeeded);
          

  //       setUserSaveInProgress(false);
  //       if (newUserSaveResponse.data.message == "success") {
  //         displayNotification(
  //           "success",
  //           "New user details saved successfully!"
  //         );
  //         setNewUserDataState(false);
  //         loadUsers();
  //       } else {
  //         displayNotification("error", "New user details saving failed!");
  //       }
  //       setTargetKeys([]);
  //       setNewAddUser(false);
  //       setEditData(null);
  //     } else {
  //       displayNotification("error", "Please fill out the required fields!");
  //     }
  //   } catch (error) {
  //     displayNotification("error", "New user details saving failed!");
  //   }
  // };

  // const save = async () => {
  //   try {
  //     if (newAddUser && editData != null) {
  //       await handleNewUserDataSubmit(editData);
  //     } else {
  //       const data = editData;
  //       var ciphertextedit = CryptoJS.AES.encrypt(
  //         JSON.stringify(data),
  //         "my-secret-key@123"
  //       ).toString();
  //       let usereditdetailsNeeded = {
  //         userdetails: ciphertextedit,
  //       };
  //       setUserIdEditActionInProgress(editingUserDataState.UserID);
  //       const updateResponse = await updateUserApi({
  //         ...usereditdetailsNeeded,
  //         UserID: editData.UserID,
  //       });
  //       setUserIdEditActionInProgress(false);
  //       if (updateResponse.data.message == "success") {
  //         displayNotification("success", "User details updated successfully!");
  //         setEditingUserDataState(false);
  //         loadUsers();
  //       } else {
  //         displayNotification("error", "User details update failed!");
  //       }
  //       setEditData(null);
  //     }
  //   } catch (errInfo) {}
  // };

  const handleDeleteExistingUser = async (data) => {
    const { UserID } = data;
    setDspConfirmBoxVisible(true);
    setUserIdToDelete(UserID);
  };

  const displayNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const loadUsers = async (paginationPage) => {
    const page =
      typeof paginationPage !== "undefined" &&
      typeof paginationPage !== "undefined"
        ? paginationPage
        : 1;
    setDataLoadingState(true);
    setUserDataState([]);
    let dataParams = {
      page: page,
    };
    if (usersSearchValueState != "") {
      dataParams = {
        search: usersSearchValueState,
      };
    }

    const userData = await getUsersDataApi(dataParams);
    const userDataList = userData.data.dataset.map((item, i) => {
      let updatedItem = {
        ...item,
        key: i,
      };
      return updatedItem;
    });
    if (userDataList.length > 0) {
      setUserDataState(userDataList);
    }
    setPagination({
      current: page,
      total: userData.data.total_rows,
    });

    setCurrentlyViewingPage(parseInt(userData.data.page));
    setTotalRecordsCount(userData.data.total_rows);
    setDataLoadingState(false);
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      loadUsers();
    }
  };
  const navItemHandler = async (userId) => {
    if (userId !== undefined) {
      setSelectedUserId(userId);
      let userdataNeeded = {
        userId: userId,
      };
      const getInitialUserRole = await getUserRoleByUserId(userdataNeeded);
      let urole = getInitialUserRole.data[0].UserRole;
      if (urole !== null) {
        let splitted = urole.split(",");
        const intarray = splitted.map((item) => {
          return parseInt(item);
        });
        setTargetKeys(intarray);
      }
    }
    //  else {

    //   setTargetKeys([]);
    // }
    setToggleDataRoleInfoModal(true);
    groupDataUsers();
  };

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {};
  const DataContiner = () => (
    <div>
      <Transfer
        dataSource={userRoles}
        titles={["All", "Selected"]}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={editData !== null ? onChange : null}
        onSelectChange={editData !== null ? onSelectChange : null}
        onScroll={onScroll}
        render={(item) => item.title}
        oneWay
      />
    </div>
  );
  const handleOk = async () => {
    if (editInView && editDataRoleInView) {
      if (targetKeys.length > 0) {
        let userUpdatedData = {
          userId: selectedUserId != "" ? selectedUserId : null,
          selectedKeys: targetKeys.toString(),
        };
        const saveUserRoles = await saveUserRole(userUpdatedData);
        displayNotification("success", "User Role Changed!");
        setToggleDataRoleInfoModal(false);
        setEditInView(false);
        setEditDataRoleInView(false);
        setTargetKeys([]);
        setEditData(null);
        loadUsers();
      } else {
        displayNotification("error", "Please fill out the required fields!");
      }
    } else {
      setEditData({ ...editData, UserRole: targetKeys.toString() });
      displayNotification("success", "User Role Changed!");
    }
    //setTargetKeys([]);
    setToggleDataRoleInfoModal(false);
    groupDataUsers();
  };

  const handleEditInView = () => {
    setEditInView(true);
    setEditData(true);
    setEditDataRoleInView(true);
    groupDataUsers();
  };

  const handleTableChange = (paginationStates) => {
    setPagination({
      current: paginationStates.current,
    });
    loadUsers(paginationStates.current);
  };

  return (
    <div>
      <Card
        style={{ width: "95%" }}
        customClass="user-management-card page-section"
      >
        <Row>
          <Col span={24}>
            <h2 className="title">User Management</h2>
          </Col>
        </Row>

        <Row className="user-mgt-search-input-row">
          <Col span={12}>
            <Row>
              <Col span={12}>
                <Input
                  onChange={(e) => {
                    setUsersSearchValueState(e.target.value);
                  }}
                  className="search-input"
                  onKeyDown={onKeyDownHandler}
                />
              </Col>
              <Col span={12}>
                <div className="submit-btn-div">
                  <Button
                    type="ghost"
                    htmlType="submit"
                    className="user-mgt-form-submit-button search"
                    disabled={false}
                    onClick={loadUsers}
                  >
                    Search
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={4} offset={8}>
            <div className="submit-btn-div">
              <Button
                type="ghost"
                htmlType="submit"
                className="user-mgt-form-submit-button active"
                disabled={false}
                onClick={onAddUserClick}
              >
                + Add User
              </Button>
            </div>
          </Col>
        </Row>
        <Spin tip="Loading..." spinning={dataLoading} size="large">
          <Form form={form} component={false}>
            <Table
              rowClassName="editable-row"
              dataSource={userDataState}
              columns={columns}
              scroll={{ x: 1500, y: 300 }}
              pagination={{
                ...pagination,
              }}
              onChange={handleTableChange}
            />
          </Form>

          <Modal
            visible={toggleDataRoleInfoModal}
            onCancel={() => setToggleDataRoleInfoModal(false)}
            title="Roles"
            customClass="data-info-modal traget-navbar-data"
            footer={[
              <Button
                key="back"
                onClick={() => setToggleDataRoleInfoModal(false)}
                hidden={editData !== null ? false : true}
              >
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleOk}
                hidden={editData !== null ? false : true}
              >
                Save
              </Button>,
              <Button
                key="submit"
                type="primary"
                onClick={handleEditInView}
                hidden={editData !== null ? true : false}
              >
                Edit
              </Button>,
            ]}
            handleOk={handleOk}
          >
            <div className="report-single-tab">
              <DataContiner />
            </div>
          </Modal>
          <DspConfirmBox
            title=""
            message="Do you want to delete the selected user?"
            callbackOnOk={async () => {
              try {
                setUserDeleteInProgress(true);
                const deleteUserResponse = await deleteUserDataApi({
                  UserID: userIdToDelete,
                });

                setUserDeleteInProgress(false);
                if (deleteUserResponse.data.message == "success") {
                  setDspConfirmBoxVisible(false);
                  displayNotification(
                    "success",
                    "User details deleted successfully!"
                  );
                  loadUsers();
                } else {
                  setDspConfirmBoxVisible(false);
                  displayNotification("error", "User details deletion failed!");
                }
              } catch (error) {
                setDspConfirmBoxVisible(false);
                displayNotification("error", "User details deletion failed!");
              }
            }}
            callbackOnCancel={() => {
              setDspConfirmBoxVisible(false);
              setUserIdToDelete(false);
            }}
            visibleState={dspConfirmBoxVisible}
            okActivityInProgressState={userDeleteInProgress}
            okActivityInProgressButtonText="Deleting..."
            okButtonText="Delete"
          />
        </Spin>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  userDataUpdateState: state.mainViewState.userDataUpdateState,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUserDataAction(payload)),
  resetUserDataStatus: () => dispatch(resetUserDataAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementBatch);
