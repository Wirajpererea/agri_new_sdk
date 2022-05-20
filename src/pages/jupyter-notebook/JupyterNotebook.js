import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Spin } from "antd";
import "./jupyterModel.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import configConstants from "../../config/constants";
import Iframe from "react-iframe";
import { getJupyterDetails } from "./services/services";

const JupyterNotebook = ({
  configData,
  userData,
  setUserModelBuilds,
  setCurrentActiveModel,
  resetModelBuild,
  selectedModelTypeData,
  location,
}) => {
  const { UserID, Email } = userData;
  const history = useHistory();
  const [selectedModelCard, setSelectedModelCard] = useState(null);
  const [jupyterNotebookDetails, setJupyterNotebookDetails] = useState({});
  const [jupyterUrl, setJupyterUrl] = useState("");
  const [ifActiveUrl, setIfActiveUrl] = useState(false);

  useEffect(() => {
    intiDataInPage();
  }, []);
  const intiDataInPage = async () => {
    const jupyterdetails = await getJupyterDetails();
    setIfActiveUrl(true);
    setJupyterNotebookDetails(jupyterdetails.data.body[0]);
    if (jupyterdetails.data.body[0].UseJupyterHub === "1") {
      setJupyterUrl(`${jupyterdetails.data.body[0].ProcedureValue}${Email}`);
    } else {
      setJupyterUrl(`${jupyterdetails.data.body[0].ProcedureValue}`);
    }
  };
  // const IFrame = ({ src, height, width }) => {
  //   return (
  //     <div>
  //       <iframe
  //         src={jupyterUrl}
  //         height={height}
  //         width={width}
  //         title="Jupyter Notebook"
  //       />
  //     </div>
  //   );
  // };
  return (
    <div
      className={
        !ifActiveUrl
          ? "build-model-container"
          : "build-model-container model-analytics-container"
      }
    >
      <div className="iframe-container">
        <Iframe
          url={jupyterUrl}
          width="100%"
          height="100%"
          id="modelIframe"
          className="model-iframe"
          //display={ifUrlOpen ? "initial" : "none"}
          position="relative"
        />
      </div>
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(JupyterNotebook);
