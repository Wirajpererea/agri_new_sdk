import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Select,
  notification,
} from "antd";
import { connect } from "react-redux";

import { Card } from "../../components";
import {
  updateUserDataAction,
  resetUserDataAction,
} from "../login/actions/login-action";
import { addTransportOrder, getTransporters } from "./services/orderService";
import { useLocation } from "react-router-dom";

const FormItem = Form.Item;

const AddTransport = () => {
  let location = useLocation();
  const [selectedTransporter, setSelectedTransporter] = useState();
  const [transporters, setTransporters] = useState(0);

  useEffect(() => {
    onInitDataInPage();
  }, []);

  const onInitDataInPage = async () => {
    const transporterss = await getTransporters();
    setTransporters(transporterss?.data.body);
  };

  const handleSubmit = async () => {
    const formData = {};
    formData.orderId = location.state.selectedOrder.order_row_id;
    formData.transportedBy = selectedTransporter;
    const addOrderResult = await addTransportOrder(formData);

    if (addOrderResult.data.message === "success") {
      const args = {
        message: "Transport Added Successfully",
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
              key={location.state.selectedOrder.order_row_id}
            >
              <Row>
                <Col span={8}>Product </Col>
                <Col span={1}>:</Col>
                <Col>{location.state.selectedOrder.productName}</Col>
              </Row>
              <Row>
                <Col span={8}>User </Col>
                <Col span={1}>:</Col>
                <Col>{location.state.selectedOrder.userName}</Col>
              </Row>
              <Row>
                <Col span={8}>Qty </Col>
                <Col span={1}>:</Col>
                <Col>{location.state.selectedOrder.qty}</Col>
              </Row>
              <Row>
                <Col span={8}>Unit Price </Col>
                <Col span={1}>:</Col>
                <Col>{location.state.selectedOrder.price}</Col>
              </Row>
              <Row>
                <Col span={8}>Total Price </Col>
                <Col span={1}>:</Col>
                <Col>
                  {location.state.selectedOrder.qty *
                    location.state.selectedOrder.price}
                </Col>
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
                  <h2 className="title">Place Trnsport Order</h2>
                  <form className="connection-form">
                    <Row>
                      <Col span={12}>
                        <label className="connection-input-label block-container-item">
                          Transporter
                        </label>
                        <FormItem className="connection-input-item" name="qty">
                          <Select
                            onChange={(e) => {
                              setSelectedTransporter(e);
                            }}
                          >
                            {transporters && transporters.length > 0 && transporters.map((record) => (
                                <option
                                  value={record.user_row_id}
                                  key={record.name}
                                >
                                  {record.name}
                                </option>
                            ))}
                          </Select>
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          disabled={!selectedTransporter}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTransport);
