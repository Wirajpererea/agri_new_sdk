import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Table,
  Alert,
  notification,
  Upload,
  Modal,
} from "antd";
import { connect } from "react-redux";
import "./products.scss";

import { Card, MessageAlert } from "../../components";
import { validatePassword } from "../../utils/utils";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";
import CryptoJS from "crypto-js";
import UserImgIcon from "../../assets/images/web/signup.jpg";
import {
  addProducts,
  getProducts,
  updateProducts,
} from "./services/productService";
import { PlusOutlined } from "@ant-design/icons";

const FormItem = Form.Item;
const { Option } = Select;

const Products = ({
  userData,
  updateUser,
  userDataUpdateState,
  userDataUpdateStateBody,
  resetUserDataStatus,
}) => {
  const { Email, FirstName, LastName, Status } = userData;
  const [form] = Form.useForm();
  const [activeButton, setActiveButton] = useState(null);
  // const [statusButton, setStatusButton] = useState(true);
  const [firstName, setFirstName] = useState(FirstName);
  const [lastName, setLastName] = useState(LastName);
  const [email, setEmail] = useState(Email);
  const [userStatus, setUserStatus] = useState(Status);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isValidPasswordState, setIsValidPasswordState] = useState(false);
  const [passwordValidtionStates, setPasswordValidtionStates] = useState({
    minLength: true,
  });
  const [dataRows, setDataRows] = useState([
    {
      name: "test",
      location: "test",
      qty: "10kg",
      price: "100.00",
    },
    {
      name: "test2",
      location: "test2",
      qty: "10kg",
      price: "100.00",
    },
    {
      name: "test3",
      location: "test3",
      qty: "10kg",
      price: "100.00",
    },
    {
      name: "test4",
      location: "test4",
      qty: "10kg",
      price: "100.00",
    },
  ]);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [tableColumns, setTableColumns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      key: "",
      width: 40,
      fixed: "right",
      render: (tableRow) => {
        return (
          <Button
            onClick={() => {
              handleEditData(tableRow);
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 40,
      render: (tableRow) => {
        return (
          <span>
            <Button
              onClick={() => {
                handleDeleteData(tableRow.id);
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
  ]);

  const [products, setProducts] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState([]);

  const handleCancel = () => this.setState({ previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const initialValues = {
    firstname: FirstName,
    lastname: LastName,
    email: Email,
  };

  useEffect(() => {
    onInitPageLoadOut();
  }, []);

  useEffect(() => {
    if (Email && FirstName && LastName) {
      setActiveButton(false);
      setIsValidPasswordState(true);
    }
  }, [Email, FirstName, LastName]);
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleEditData = (data) => {
    console.log("data==>", data);
    setIsEdit(true);
    setEditData(data);
    form.setFieldsValue({
      name: data.name,
      location: data.location,
      qty: data.qty,
      price: data.price,
    });
  };
  const handleDeleteData = (id) => {};

  const onInitPageLoadOut = async () => {
    let data = {
      userId: 1,
    };
    const productResults = await getProducts(data);
    setProducts(productResults && productResults.data.body);
  };

  const onFieldsChange = (values) => {
    const formDataField = values.length > 0 && values[0]["name"][0];
    const formDataFieldValue = values.length > 0 && values[0]["value"];
    if (formDataField === "firstname") {
      setFirstName(formDataFieldValue);
    }
    if (formDataField === "lastname") {
      setLastName(formDataFieldValue);
    }
    if (formDataField === "email") {
      setEmail(formDataFieldValue);
    }

    if (formDataField === "password") {
      const { validationState, isValidPassword } =
        validatePassword(formDataFieldValue);
      setIsValidPasswordState(isValidPassword);
      setPasswordValidtionStates(validationState);
      setPassword(formDataFieldValue);
    }
    if (formDataField === "cpassword") {
      setCPassword(formDataFieldValue);
    }

    if (firstName && lastName && email && isValidPasswordState) {
      if (password === cPassword) {
        setActiveButton(true);
      } else {
        setActiveButton(false);
      }
    } else {
      setActiveButton(false);
    }
  };

  const handleSubmit = async (data) => {
    if (isEdit) {
      let updateProductDetails = {
        ...data,
        productId: editData.product_row_id,
        userId: 1,
      };
      const updateResults = await updateProducts(updateProductDetails);
      if (updateResults.data.message === "success") {
        form.resetFields();
        const args = {
          message: "Successfully Updated",
        };
        notification.open(args);
        onInitPageLoadOut();
      }
      console.log("daataa==>", updateResults);
    } else {
      let addProductDetails = {
        ...data,
        userId: 1,
      };
      const formData = new FormData();
      const keys = Object.keys(addProductDetails);
      const keysToEscape = ["pics"];
      keys.forEach((elementName) => {
        if (keysToEscape.indexOf(elementName) == -1) {
          // allowed to pass to form data
          formData.set(elementName, addProductDetails[elementName]);
        }
      });
      if (addProductDetails.pics) {
        // has documents
        formData.append("pics[]", addProductDetails.pics);
      }
      const loginResult = await addProducts(addProductDetails);
      if (loginResult.data.message === "success") {
        form.resetFields();
        const args = {
          message: "Successfully Added",
        };
        notification.open(args);
        onInitPageLoadOut();
      }
    }
  };

  return (
    <div>
      <Row>
        <Col span={2} />
        <Col span={18}>
          <Card
            style={{ width: "90%" }}
            customClass="user-management-card page-section"
          >
            <h2 className="title">
              {isEdit ? `Update product` : `Add product`}
            </h2>
            <Form
              ref={form}
              form={form}
              onFinish={handleSubmit}
              onFieldsChange={onFieldsChange}
              className="connection-form"
              initialValues={initialValues}
            >
              <Row>
                <Col span={12}>
                  <label className="connection-input-label block-container-item">
                    Name
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input className="connection-input block-container-item" />
                  </FormItem>
                  <label className="connection-input-label block-container-item">
                    Location
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="location"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input className="connection-input block-container-item" />
                  </FormItem>
                  <label className="connection-input-label block-container-item">
                    Qty
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="qty"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      className="connection-input block-container-item"
                      type="text"
                    />
                  </FormItem>
                  <label className="connection-input-label block-container-item">
                    Price
                  </label>
                  <FormItem
                    className="connection-input-item"
                    name="price"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      className="connection-input block-container-item"
                      type="text"
                    />
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 2 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </Row>
              <Row>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="form-submit-button active"
                  >
                    {isEdit ? `Update` : `Add`}
                  </Button>
                </Col>
                <Col span={2}></Col>
                <Col>
                  {isEdit && (
                    <Button
                      type="primary"
                      onClick={() => {
                        setIsEdit(false);
                        form.resetFields();
                      }}
                      className="form-submit-button active"
                    >
                      Clear
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>

      {products.length > 0 && (
        <Table
          dataSource={products}
          columns={tableColumns}
          pagination={{ defaultPageSize: 5 }}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  userDataUpdateState: state.mainViewState.userDataUpdateState,
  userDataUpdateStateBody: state.mainViewState.userDataUpdateStateBody,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (payload) => dispatch(updateUserDataAction(payload)),
  resetUserDataStatus: () => dispatch(resetUserDataAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
