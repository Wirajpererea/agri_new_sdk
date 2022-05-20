import React, { useState } from "react";
import { Modal } from "../../components";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const addLicence = () => {
    setModalVisible(false);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <div>
      <Modal visible ={modalVisible} onCancel={handleCancel} width={350}>
        <div className="modal-cantainer">
          <h2 className="modal-title-container">Welcome to DOS</h2>
          <p className="modal-containter-text">
            Enter a licence key before you start to build ML Models
          </p>
          <Button onClick={addLicence} className="modal-button">
            <NavLink exact to="/licence">
              Add licence
            </NavLink>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
