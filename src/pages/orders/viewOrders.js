import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Spin, Input } from "antd";
// import "./datamodels.scss";
import { connect } from "react-redux";
import { setActiveModelAction } from "../../actions/globle-action";
import { getOrders } from "./services/orderService";
import moment from "moment";
const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [tableColumns, setTableColumns] = useState([
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Requested Date",
      dataIndex: "dateRequested",
      key: "dateRequested",
      render: (text, record) => (
        <p className="warning-tags">{moment(text).format("YYYY-MM-DD")}</p>
      ),
    },
    {
      title: "Requested User",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Total Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <p className="warning-tags">{text * record.qty}</p>
      ),
    },
    {
      title: "",
      key: "operation",
      fixed: "right",
      width: 40,
      render: (tableRow) => {
        return tableRow.isTransported != 1 ? (
          <span>
            <Button
              //   onClick={() => {
              //     handleDeleteData(tableRow.id);
              //   }}
              style={{
                marginRight: 8,
              }}
            >
              Transport
            </Button>
          </span>
        ) : (
          <p>Transported by {tableRow.transporterName}</p>
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
    setOrders(orderResults.data.body);
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
