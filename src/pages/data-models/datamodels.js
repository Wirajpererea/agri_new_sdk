import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Spin, Input } from "antd";
import "./datamodels.scss";
import {
  getDataDictionaryData,
  getAnalyticsData,
} from "./services/dataModelsService";
import { connect } from "react-redux";
import { setActiveModelAction } from "../../actions/globle-action";
import ClickableCardAnalytics from "./components/clickableCardAnalytics";
import { NavLink, useHistory } from "react-router-dom";
import { getPowerBiAccess } from "./services/dataModelsService";
import configConstants from "../../config/constants";
import Iframe from "react-iframe";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { getProducts } from "../products/services/productService";

const BuildModel = ({
  configData,
  userData,
  setUserModelBuilds,
  setCurrentActiveModel,
  resetModelBuild,
  selectedModelTypeData,
  location,
}) => {
  const { UserID } = userData;
  const history = useHistory();
  const [selectedModelCard, setSelectedModelCard] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalStatusError, setModalStatusError] = useState(null);
  const [tabeleData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ifUrlOpen, setIfUrlOpen] = useState(false);
  const [ifActiveUrl, setIfActiveUrl] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [generatedPowerBiToken, setGeneratedPowerBiToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(false);
  const [selectedModel, setSelectedModel] = useState({});
  const [isFromIframe, setIsFromIframe] = useState(false);
  const [mapList, setMapList] = useState([]);
  const [mapFiltered, setMapFiltered] = useState([]);

  const mockData = [{ name: "A", location: "B", price: 80, qty: 5 }];

  useEffect(() => {
    onInitDataInPage();
  }, []);

  const onInitDataInPage = async () => {
    let data = {
      userId: 1,
    };
    const productResults = await getProducts(data);
    setMapList(productResults && productResults.data.body);
  };
  const onClickHandler = async (cardId, model) => {};

  const searchChange = (e) => {
    console.log(e.target.value, "////////////////////");
    const mapFilteredList =
      mapList && mapList.filter((map) => map.name.includes(e.target.value));
    setMapFiltered(mapFilteredList);
  };
  return (
    <div className="build-model-container model-analytics-container">
      <React.Fragment>
        <Row>
          <Col style={{ textAlign: "center" }} span={24}>
            <div className="build-model-header-div">
              <h1 className="build-model-header">Products</h1>
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
                        padding: "0px",
                      }}
                      onClickHandler={() => {
                        onClickHandler(index, modelData);
                      }}
                      active={selectedModelCard === index ? true : false}
                      disabled={false}
                    >
                      <img
                        src={`${configConstants.apiUrlWithPort}/api/v1/ETL_knowledgebase/getAnalyticImage/${modelData.thumbnail_name}.png`}
                        style={{ height: "50px" }}
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
                      <Row>
                        <Col span={12}>
                          <Button
                            type="primary"
                            htmlType="button"
                            style={{ width: "100%" }}
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
                        padding: "0px",
                      }}
                      onClickHandler={() => {
                        onClickHandler(index, modelData);
                      }}
                      active={selectedModelCard === index ? true : false}
                      disabled={false}
                    >
                      <img
                        src={`${configConstants.apiUrlWithPort}/api/v1/ETL_knowledgebase/getAnalyticImage/${modelData.thumbnail_name}.png`}
                        style={{ height: "50px" }}
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
                      <Row>
                        <Col span={12}>
                          <Button
                            type="primary"
                            htmlType="button"
                            style={{ width: "100%" }}
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
