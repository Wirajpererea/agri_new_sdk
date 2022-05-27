import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Spin, Input } from "antd";
// import "./datamodels.scss";
import { connect } from "react-redux";
import { setActiveModelAction } from "../../actions/globle-action";
import { getOrders } from "./services/orderService";
import { NavLink } from "react-router-dom";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [tableColumns, setTableColumns] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Requested Date",
      dataIndex: "requested_date",
      key: "requested_date",
    },
    {
      title: "Quantity",
      dataIndex: "requested_qty",
      key: "requested_qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 40,
      render: (tableRow) => {
        return (
          <span>
            <NavLink
              exact
              to={{
                pathname: "/add-transport",
                state: { selectedOrder: tableRow },
              }}
            >
              Transport
            </NavLink>
          </span>
        );
      },
    },
  ]);
  useEffect(() => {
    onInitDataInPage();
  }, []);

  const onInitDataInPage = async () => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    const orderResults = await getOrders(user.user_row_id);
    setOrders(orderResults);
  };

  return (
    <div className="build-model-container model-analytics-container">
      {orders.length > 0 && (
        <Table
          dataSource={orders}
          columns={tableColumns}
          pagination={{ defaultPageSize: 5 }}
        />
      )}
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  setCurrentActiveModel: (payload) => dispatch(setActiveModelAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);
