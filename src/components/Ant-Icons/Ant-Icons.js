import React from "react";
import { 
    CheckCircleFilled,
    CloseCircleFilled,
    PlayCircleFilled,
    DeleteOutlined
 } from "@ant-design/icons";

const completeColor = "#1890ff";
const unCompleteColor = "#b5b2b2";

const getCheckCircleFilled = (color = null) => {
    let styles = {};
    if(color){
        styles.color = color;
    }
  return <CheckCircleFilled style={styles}/>
};

const getCompleteUncompleteIcon = (complete = false) => {
    let styles = {
        fontSize: "25px",
        marginLeft: "12%"
    }
    if(complete){
        // return colored complete icon
        styles.color = completeColor;
      return <CheckCircleFilled style={styles}/>;
    }else{
        styles.color = unCompleteColor;
        return <CloseCircleFilled style={styles}/>;
    }
};

const getPlayCircleIcon = (enable = false, onclickFunction = null, executionId = null, userId = null) => {
    let styles = {
        fontSize: "25px",
    }
    if(enable){
        // return colored complete icon
        styles.color = completeColor;
      return <a onClick={() =>{onclickFunction(executionId, userId)}}><PlayCircleFilled style={styles}/></a>;
    }else{
        styles.color = unCompleteColor;
        return <PlayCircleFilled style={styles}/>;
    }
};

const deleteIcon = () => {
    return <DeleteOutlined />;
}




export { 
    getCheckCircleFilled,
    getCompleteUncompleteIcon,
    getPlayCircleIcon,
    deleteIcon
};
