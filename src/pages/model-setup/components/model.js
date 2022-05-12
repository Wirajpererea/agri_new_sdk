import React, { useState } from "react";
import { Radio, Row, Col, Select, Button, Input } from "antd";
import "./model.scss";
import { useEffect } from "react";
import { MessageAlert } from "../../../components";
import {connect} from 'react-redux';
import {getUserCreatedModelData} from "../services/modelData-service"

const { Option } = Select;

const Models = ({
  goNextStage,
  loadPipelineSelectionData,
  pipelineSelectionData,
  setSelectedPipeLine,
  selectedPipeline,
  createPipelineData,
  userData,
  pipelineCreatePending,
  pipelineCreateSuccess,
  pipelineCreateError,
  exportPipelineData,
  exportDataFileUrl,
  exportPiplineStatus,
  resetExportPipeline,
  toggleCreateModelView,
  newlyInsertedPipelineName,
  toggleEditModelView,
  setNewlyInsertedPipelineName,
  modelsList
}) => {
  const [activeImportButton, setActiveImportButton] = useState(false);
  const [activeExportButton, setActiveExportButton] = useState(false);
  const [activeNextButton, setActiveNextButton] = useState(false);
  const [activeEditPipelineButton, setActiveEditPipelineButton] = useState(
    false
  );
  const [activeDownloadButton, setActiveDownloadButton] = useState(false);
  const [radioBtnIE, setRadioBtnIE] = useState(1);
  const [modelSelectionDataState, setmodelSelectionDataState] = useState(
    []
  );
  const pipelineListRef = React.useRef(null);

  useEffect(() => {
    loadPipelineSelectionData();
  }, [loadPipelineSelectionData]);

  useEffect(() => {
    // setmodelSelectionDataState(pipelineSelectionData);
    if(modelsList.length > 0 && newlyInsertedPipelineName){
      pipelineSearch(newlyInsertedPipelineName);
      setNewlyInsertedPipelineName(false);
    }
  }, [modelsList]);

  useEffect(() => {
    if (pipelineCreateSuccess) {
      goNextStage();
    }
  }, [goNextStage, pipelineCreateSuccess]);

  useEffect(() => {
    if (exportPiplineStatus === "success") {
      const host = window.location.origin;
      const newFileUrl = `${host}${exportDataFileUrl}`;
      downloadFile(newFileUrl);
      resetExportPipeline();
    }
  }, [exportDataFileUrl, exportPiplineStatus, resetExportPipeline]);

  // useEffect(() => {
  //   setmodelSelectionDataState(modelsList);
  // }, [modelsList]);

  useEffect(() => {
    initDataInPage();
  },[]);

  const initDataInPage = async() => {
    const { UserID } = userData;

    const modelList = await getUserCreatedModelData({
      userId : UserID
    });
    setmodelSelectionDataState(modelList.data.body.modelData);
  }

  const resetWindow = () => {
    window.location.reload();
  };

  const onChangeIEHandler = (e) => {
    setRadioBtnIE(e.target.value);
  };

  const downloadFile = (newFileUrl) => {
    let element = document.createElement("a");
    element.setAttribute("href", newFileUrl);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const selectImportHandler = (value) => {
    const selectedValue = value.target.value;

    if (selectedValue) {
      const selectedPipline = modelsList.filter(
        (data) => data.ModelID === selectedValue
      );
      setSelectedPipeLine(selectedPipline[0]);
      // setActiveExportButton(selectedPipline[0]["Export"]);
      setActiveNextButton(true);
      setActiveEditPipelineButton(true);
    }
  };

  const goNextInPipeline = () => {
    // const { DataPipeID } = selectedPipeline;
    // const { UserID } = userData;
    createPipelineData({
      // pipeLineId: DataPipeID,
      // userId: UserID,
    });
  };

  const downloadPipelineData = () => {
    const { DataPipeID, DataPipe } = selectedPipeline;
    const { UserID } = userData;
    exportPipelineData({
      pipelineName: DataPipe,
      pipeLineId: DataPipeID,
      userId: UserID,
    });
  };

  /**
   * <b>Front end search to select the matching pipeline</b>
   * @author Sandun M
   * @since 2021-1-12
   */
  const pipelineSearch = async (value) => {
    const typingValue = value;
    let filteredSelection = [];
    let exactMatchFound = false;
    let possibleMatches = [];
    if (typingValue != "") {
      modelsList.forEach((pipelineElement, index) => {
        let element = pipelineElement;
        if (typeof element.searchMatch !== "undefined") {
          delete element.searchMatch;
        }
        if (element.ModelName.match(new RegExp(typingValue, "gi"))) {
          if (!exactMatchFound) {
            if (element.ModelName.toLowerCase() == typingValue.toLowerCase()) {
              // exact match
              exactMatchFound = true;
              element.searchMatch = true;
            } else {
              possibleMatches.push(index);
            }
          }
          filteredSelection.push(element);
        } else {
          filteredSelection.push(element);
        }
      });

      if (!exactMatchFound && possibleMatches.length > 0) {
        const mostPossibleMatch = filteredSelection[possibleMatches[0]];
        filteredSelection[possibleMatches[0]] = {
          ...mostPossibleMatch,
          searchMatch: true,
        };
      }
    } else {
      filteredSelection = modelsList;
    }

    await setmodelSelectionDataState(filteredSelection);

    if (pipelineListRef.current) {
      pipelineListRef.current.scrollIntoView();
    }
  };



  /**
   * <b>Front end search to select the matching pipeline</b>
   * @author Sandun M
   * @since 2021-1-12
   */
  const pipelineSearchChangeHandler = async (event) => {
    const typingValue = event.target.value;
    pipelineSearch(typingValue);
  };

  return (
    <Row>
      <Col span={12}>
        <div className="data-pipe">
          {(radioBtnIE === 1 || 2) && (
            <div className="selection-div">
              <Row style={{ marginBottom: "10px" }}>
                <Col span={10}>
                  <label className="select-data-pipeline-label">
                    Select Model*
                  </label>
                </Col>
                <Col span={8}>
                  <Input
                    placeholder="Search Models"
                    className="search-input"
                    onChange={pipelineSearchChangeHandler}
                  />
                </Col>
                <Col span={6}>
                  <Button
                     type="primary"
                     htmlType="submit"
                    className="refresh-button"
                    onClick={resetWindow}
                    dataRefreshState
                  >
                    Refresh
                  </Button>
                </Col>
              </Row>
              <div className="loading-pipeline-container">
                <Radio.Group
                  onChange={selectImportHandler}
                  defaultValue={null}
                  style={{ marginTop: 16 }}
                >
                  {modelSelectionDataState.map((data, index) => {
                    if (
                      typeof data !== "undefined" &&
                      typeof data.ModelID !== "undefined"
                    ) {
                      if (
                        typeof data.searchMatch !== "undefined" &&
                        data.searchMatch
                      ) {
                        return (
                          <div ref={pipelineListRef}>
                            <Radio.Button
                              key={index}
                              className="pipline-list-item highlighted"
                              value={data.ModelID}
                            >
                              {data.ModelName}
                            </Radio.Button>
                          </div>
                        );
                      } else {
                        return (
                          <div>
                            <Radio.Button
                              key={index}
                              className="pipline-list-item"
                              value={data.ModelID}
                            >
                              {data.ModelName}
                            </Radio.Button>
                          </div>
                        );
                      }
                    }
                  })}
                </Radio.Group>
              </div>
            </div>
          )}
          {pipelineCreateError && (
            <MessageAlert
              customClass={"error-msg"}
              type={"error"}
              message={"Pipeline create failed"}
            />
          )}

          <Row>
            <Col span={12}>
              {radioBtnIE === 1 && (
                <div className="submit-btn-div">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={
                      activeNextButton
                        ? "form-submit-button active"
                        : "form-submit-button"
                    }
                    disabled={
                      !activeNextButton || pipelineCreateError ? true : false
                    }
                    onClick={goNextInPipeline}
                  >
                    {pipelineCreatePending ? "Redirecting..." : "Next"}
                  </Button>
                </div>
              )}
              {radioBtnIE === 2 && (
                <div className="submit-btn-div">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={
                      activeNextButton
                        ? "form-submit-button active"
                        : "form-submit-button"
                    }
                    disabled={
                      !activeNextButton || pipelineCreateError ? true : false
                    }
                    onClick={downloadPipelineData}
                  >
                    {exportPiplineStatus === "pending"
                      ? "Downloading..."
                      : "Download"}
                  </Button>
                </div>
              )}
            </Col>
            <Col span={12}>
              <div className="submit-btn-div">
                {activeEditPipelineButton ? (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="form-submit-button active pipeline-button"
                    disabled={false}
                    onClick={toggleEditModelView}
                  >
                    Edit Model
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="form-submit-button active pipeline-button"
                    disabled={false}
                    onClick={toggleCreateModelView}
                  >
                    New Model
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  modelsList: state.mainViewState.configData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Models);
