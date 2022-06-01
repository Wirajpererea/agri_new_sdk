import React, { useEffect, useState } from "react";
import { Row, Col, Button, Input } from "antd";
import "./datamodels.scss";
import { connect } from "react-redux";
import { setActiveModelAction } from "../../actions/globle-action";
import ClickableCardAnalytics from "./components/clickableCardAnalytics";
import { NavLink } from "react-router-dom";
import configConstants from "../../config/constants";
import { getProducts } from "../products/services/productService";

const BuildModel = ({}) => {
  const [selectedModelCard, setSelectedModelCard] = useState(null);
  const [mapList, setMapList] = useState([]);
  const [mapFiltered, setMapFiltered] = useState([]);

  useEffect(() => {
    onInitDataInPage();
  }, []);

  const onInitDataInPage = async () => {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    let data = {
      userId: user?.user_row_id,
    };
    const productResults = await getProducts();
    setMapList(productResults && productResults.data.body);
  };
  const onClickHandler = async (cardId, model) => {};

  const searchChange = (e) => {
    const mapFilteredList =
      mapList && mapList.filter((map) => map.name.includes(e.target.value));
    setMapFiltered(mapFilteredList);
  };

  const loggedUser = JSON.parse(sessionStorage.getItem("userData"));

  return (
    <div className="build-model-container model-analytics-container">
      <React.Fragment>
        <Row>
          <Col style={{ textAlign: "center" }} span={24}>
            <div className="build-model-header-div">
              <h1
                className="build-model-header"
                style={{ fontWeight: "bolder", fontSize: "40px" }}
              >
                Products
              </h1>
            </div>
          </Col>
        </Row>
        <Row className="search-by-tags-analytics">
          <Col span={10} />
          <Col span={4}>
            <Input
              className="input-search-by-tag"
              placeholder="Search by name"
              onChange={(e) => searchChange(e)}
            ></Input>
          </Col>
        </Row>
        <div className="build-analytics-list">
          {mapFiltered.length > 0
            ? mapFiltered.length > 0 &&
              mapFiltered.map((modelData, index) => {
                return (
                  <div className="card-container" id="cardOne" key={index}>
                    <ClickableCardAnalytics
                      style={{
                        backgroundPosition: "center",
                        padding: "10px",
                      }}
                      onClickHandler={() => {
                        onClickHandler(index, modelData);
                      }}
                      active={selectedModelCard === index ? true : false}
                      disabled={false}
                    >
                      <img
                        src={modelData.imgUrl}
                        style={{
                          height: "170px",
                          display: "flex",
                          margin: "auto",
                          marginBottom: "15px",
                        }}
                      />
                      <Row>
                        <Col span={8}>Name </Col>
                        <Col span={1}>:</Col>
                        <Col>{modelData.name}</Col>
                      </Row>
                      <Row>
                        <Col span={8}>Location </Col>
                        <Col span={1}>:</Col>
                        <Col>{modelData.location}</Col>
                      </Row>
                      <Row>
                        <Col span={8}>Qty </Col>
                        <Col span={1}>:</Col>
                        <Col>{modelData.qty}</Col>
                      </Row>
                      <Row>
                        <Col span={8}>Price </Col>
                        <Col span={1}>:</Col>
                        <Col>{modelData.price}</Col>
                      </Row>
                      {loggedUser?.type === "consumer" && (
                        <Row>
                          <Col span={12}>
                            <Button
                              type="primary"
                              htmlType="button"
                              style={{ width: "100%", marginTop: "10px" }}
                            >
                              <NavLink
                                exact
                                to={{
                                  pathname: "/orders",
                                  state: { selectedProduct: modelData },
                                }}
                              >
                                Order
                              </NavLink>
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </ClickableCardAnalytics>
                  </div>
                );
              })
            : mapList.length > 0 &&
              mapList.map((modelData, index) => {
                return (
                  <div className="card-container" id="cardOne" key={index}>
                    <ClickableCardAnalytics
                      style={{
                        backgroundPosition: "center",
                        padding: "10px",
                      }}
                      onClickHandler={() => {
                        onClickHandler(index, modelData);
                      }}
                      active={selectedModelCard === index ? true : false}
                      disabled={false}
                    >
                      <img
                        src={modelData.imgUrl}
                        style={{
                          height: "170px",
                          display: "flex",
                          margin: "auto",
                          marginBottom: "15px",
                        }}
                      />
                      <Row>
                        <Col span={8}>Name </Col>
                        <Col span={1}>:</Col>
                        <Col>{modelData.name}</Col>
                      </Row>
                      <Row>
                        <Col span={8}>Location </Col>
                        <Col span={1}>:</Col>
                        <Col>{modelData.location}</Col>
                      </Row>
                      <Row>
                        <Col span={8}>Qty </Col>
                        <Col span={1}>:</Col>
                        <Col>{modelData.qty}</Col>
                      </Row>
                      <Row>
                        <Col span={8}>Price </Col>
                        <Col span={1}>:</Col>
                        <Col>{modelData.price}</Col>
                      </Row>
                      {loggedUser?.type === "consumer" && (
                        <Row>
                          <Col span={12}>
                            <Button
                              type="primary"
                              htmlType="button"
                              style={{ width: "100%", marginTop: "10px" }}
                            >
                              <NavLink
                                exact
                                to={{
                                  pathname: "/orders",
                                  state: { selectedProduct: modelData },
                                }}
                              >
                                Order
                              </NavLink>
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </ClickableCardAnalytics>
                  </div>
                );
              })}
        </div>
      </React.Fragment>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  configData: state.mainViewState.configData,
  executionId: state.modelBuildState.executionData,
  endResult: state.modelBuildState.EndResult,
  modelBuildStartStatus: state.modelBuildState.modelBuildStartStatus,
  selectedModelTypeData: state.globleState.selectedModelTypeData,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentActiveModel: (payload) => dispatch(setActiveModelAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildModel);
