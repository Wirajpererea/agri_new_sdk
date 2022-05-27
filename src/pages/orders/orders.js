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
  notification
} from "antd";
import { connect } from "react-redux";

import { Card } from "../../components";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";
import { addOrder } from "./services/orderService";
import DatePickerComponent from "../../components/DatePicker/DatePicker";
import { useLocation } from "react-router-dom";

const FormItem = Form.Item;

const Orders = () => {
  let location = useLocation();
  const [requestedDate, setRequestedDate] = useState("");
  const [requestedQty, setRequestedQty] = useState(0);

  const handleSubmit = async () => {
    const formData = {};
    formData.dateRequested = requestedDate;
    formData.qty = requestedQty;
    formData.product_row_id = location.state.selectedProduct.product_row_id;
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    formData.user_row_id = userData.user_row_id;
    const addOrderResult = await addOrder(formData);

    if (addOrderResult.data.message === "success") {
      const args = {
        message: "Order Added Successfully",
      };
      notification.open(args);
    }
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Card>
            <div
              className=""
              id=""
              key={location.state.selectedProduct.product_row_id}
            >
              {/* <img
              src={`${configConstants.apiUrlWithPort}/api/v1/ETL_knowledgebase/getAnalyticImage/${modelData.thumbnail_name}.png`}
              style={{ height: "50px" }}
            /> */}
              <Row>
                <Col span={8}>Name </Col>
                <Col span={1}>:</Col>
                <Col>{location.state.selectedProduct.name}</Col>
              </Row>
              <Row>
                <Col span={8}>Location </Col>
                <Col span={1}>:</Col>
                <Col>{location.state.selectedProduct.location}</Col>
              </Row>
              <Row>
                <Col span={8}>Qty </Col>
                <Col span={1}>:</Col>
                <Col>{location.state.selectedProduct.qty}</Col>
              </Row>
              <Row>
                <Col span={8}>Price </Col>
                <Col span={1}>:</Col>
                <Col>{location.state.selectedProduct.price}</Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <div>
            <Row>
              <Col span={2} />
              <Col span={18}>
                <Card
                // style={{ width: "90%" }}
                // customClass="user-management-card page-section"
                >
                  <h2 className="title">Place Order</h2>
                  <form className="connection-form">
                    <Row>
                      <Col span={12}>
                        <label className="connection-input-label block-container-item">
                          Qty
                        </label>
                        <FormItem className="connection-input-item" name="qty">
                          <Input
                            className="connection-input block-container-item"
                            type="number"
                            value={requestedQty}
                            onChange={(e) => {
                              setRequestedQty(e.target.value);
                            }}
                          />
                        </FormItem>
                        <label className="connection-input-label block-container-item">
                          Order Date
                        </label>
                        <FormItem>
                          <DatePickerComponent
                            placeholder={""}
                            setDate={setRequestedDate}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          disabled={requestedQty === 0 || requestedDate === ""}
                          onClick={() => handleSubmit()}
                          type="primary"
                          className="form-submit-button active"
                        >
                          Add
                        </Button>
                      </Col>
                      <Col span={2}></Col>
                    </Row>
                  </form>
                </Card>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
