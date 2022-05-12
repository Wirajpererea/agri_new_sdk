import React, { useState } from 'react';
import { Row, Col, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { setActiveModelAction } from '../../actions/globle-action';
import { resetModelBuild } from '../model-build/actions/modelBuild-action';
import './buildModel.scss';
import ClickableCard from './components/ClickableCard';
import { useHistory } from 'react-router-dom';
import { getModelExecutionAvailableApi } from './services/services';
import ModelAvailableModal from './components/modelAvailable-modal';
import configConstants from "../../config/constants";
import {CaretLeftOutlined} from '@ant-design/icons';

const BuildModel = ({
  configData,
  userData,
  setUserModelBuilds,
  setCurrentActiveModel,
  resetModelBuild,
  selectedModelTypeData,
  modelGroupsData
}) => {
  const { UserID } = userData;
  const history = useHistory();
  const [selectedModelCard, setSelectedModelCard] = useState(null);
  const [activeModel, setActiveModel] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalStatusError, setModalStatusError] = useState(null);
  const [activeModelName, setActiveModelName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModelGroupName, setSelectedModelGroupName] = useState(null);

  const onClickHandler = (cardId, model) => {
    setSelectedModelCard(cardId);
    setCurrentActiveModel({
      ...model,
    });
    setActiveModel(model.ModelName.toLowerCase().replace(/\s/g, ''));
    setActiveModelName(model.ModelName);
  };

  const goToModleBuilWizard = async () => {
    try {
      setLoading(true);
      const { data } = await getModelExecutionAvailableApi({
        userId: UserID,
        modelId: selectedModelTypeData.ModelID,
      });
      setLoading(false);
      if (data.body[0]['Result'] === 0) {
        resetModelBuild();
        history.push(`/${activeModel}`);
      } else {
        setModalStatus(true);
        setModalStatusError(data.body[0]['errorMessage']);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const redirectToUserModels = () => {
    history.push(`/models`);
  };

  const redirectToUserData = () => {
    history.push(`/data`);
  };

  const handleCancel = () => {
    setModalStatus(false);
  };
  
  if(selectedModelGroupName){

    return (
      <div className="build-model-container">
        <Row>
          <Col style={{ textAlign: 'center' }} span={4}>
            <Button
                  className="build-model-back-button"
                  type="primary"
                  onClick={() => setSelectedModelGroupName(null)}
                >
                  <CaretLeftOutlined />Back
              </Button>
          </Col>
          <Col style={{ textAlign: 'center' }} span={20}>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'center' }} span={24}>
            <div className="build-model-header-div">
              <h1 className="build-model-header">Build New Model</h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: 'center' }} span={24}>
            <h4 className="build-model-sub-header">Select a model</h4>
          </Col>
        </Row>
        <div className="build-model-list">
          {configData.length > 0 &&
            configData.map((modelData, index) => {
              if(selectedModelGroupName == modelData.ModelGroup){

                return (
                <div className="card-container" key={index}
                >
                  <ClickableCard
                    style={{
                      backgroundImage: `url(${configConstants.apiUrlWithPort}/api/v1/sp/getModelImage/${modelData.ModelImage})`,
                      backgroundPosition: 'center',
  
                    }}
                    onClickHandler={() => onClickHandler(index, modelData)}
                    active={selectedModelCard === index ? true : false}
                    disabled={modelData.Status !== 'Active'}
                  >
                    <div>
                    </div>
                    <span>{modelData.ModelName}</span>
                  </ClickableCard>
                </div>
              );

              }

            })}
        </div>
  
        <Row>
          <Col style={{ textAlign: 'center' }} span={24}>
            <div className="build-model-header-div">
              {!loading ? (
                <Button
                  className="next-video-btn"
                  type="primary"
                  disabled={!activeModel ? 'disabled' : ''}
                  onClick={activeModel && goToModleBuilWizard}
                >
                  Next
                </Button>
              ) : (
                  <Spin className="spin-loading" spinning={loading} size="large" />
                )}
            </div>
          </Col>
        </Row>
        {
          <ModelAvailableModal
            modalVisible={modalStatus}
            width={500}
            customClass={'shedule-modal'}
            redirectToUserModels={() => redirectToUserModels(false)}
            redirectToUserData={redirectToUserData}
            handleCancel={handleCancel}
            activeModelName={activeModelName}
            {...modalStatusError}
          />
        }
      </div>
    );


  }else{
    // not selected model group


    return (
      <div className="build-model-container">
        <Row>
          <Col style={{ textAlign: 'center' }} span={24}>
            <div className="build-model-header-div">
              <h1 className="build-model-header">Select a Model Group</h1>
            </div>
          </Col>
        </Row>

        <div className="build-model-list">
          {modelGroupsData.length > 0 &&
            modelGroupsData.map((modelData, index) => {

                return (
                <div className="card-container" key={index}
                >
                  <ClickableCard
                    style={{
                      backgroundPosition: 'center',
                      width : '200px'
                    }}
                    onClickHandler={() => {
                      setSelectedModelGroupName(modelData.ModelGroup);
                    }}
                  >
                    <div>
                    <img src={`${configConstants.apiUrlWithPort}/api/v1/sp/getModelImage/${modelData.ModelGroupImage}`} style={{height:'50px'}}/>
                    </div>
                    <span>{modelData.ModelGroup}</span>
                  </ClickableCard>
                </div>
              );

            })}
        </div>
  
      </div>
    );


  }
};
const mapStateToProps = (state) => ({
  userData: state.mainViewState.userData,
  configData: state.mainViewState.configData,
  modelGroupsData: state.mainViewState.modelGroupsData,
  executionId: state.modelBuildState.executionData,
  endResult: state.modelBuildState.EndResult,
  modelBuildStartStatus: state.modelBuildState.modelBuildStartStatus,
  selectedModelTypeData: state.globleState.selectedModelTypeData,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentActiveModel: (payload) => dispatch(setActiveModelAction(payload)),
  resetModelBuild: () => dispatch(resetModelBuild()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildModel);