import React, { useState, useEffect } from "react";
import "./createAccount.scss";
import { Card, CreateAccountStepper } from "../../components";
import { connect } from "react-redux";

import Licence from "./components/Licence";
import Connections from "./components/connections";
import UserManagement from "./components/userManagement";
import WelcomePage from "./components/welcome-page";
import Logo from "../../assets/images/common/D&D-Logo.png";

const CreateAccount = ({ userData, currentStage }) => {
  const [currentActive, setCurrentActive] = useState(0);
  const [nextButtonEnable, setNextButtonEnable] = useState(false);
  const [welcomePageLoad, setWelcomePageLoad] = useState(false);

  useEffect(() => {
    if (currentStage) {
      setCurrentActive(currentStage);
    }
  }, [currentStage]);

  const enableNext = (status) => {
    setNextButtonEnable(status);
  };

  const loadNextStage = () => {
    const nexStage = currentActive + 1;
    if (nexStage < 3) {
      setCurrentActive(nexStage);
      setNextButtonEnable(false);
    } else {
      setWelcomePageLoad(true);
    }
  };

  return (
    <div className="create-account-stepper">
      <div className="logo-continer">
        <img alt="logo" className="logo" src={Logo} />
      </div>

      {!welcomePageLoad ? (
        <Card customClass="model-build-card">
          <React.Fragment>
            <h3 className="card-header-name">Create your account</h3>
            <CreateAccountStepper currentActive={currentActive} />
            {currentActive === 0 && (
              <Licence
                enableNext={enableNext}
                loadNextStage={loadNextStage}
                userData={userData}
              />
            )}
            {currentActive === 1 && (
              <UserManagement
                enableNext={enableNext}
                loadNextStage={loadNextStage}
                userData={userData}
              />
            )}
            {currentActive === 2 && (
              <Connections
                enableNext={enableNext}
                loadNextStage={loadNextStage}
                userData={userData}
              />
            )}
          </React.Fragment>
        </Card>
      ) : (
        <WelcomePage />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedModelTypeData: state.globleState.selectedModelTypeData,
  userData: state.mainViewState.userData,
  currentStage: state.createAccountState.currentStage,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
