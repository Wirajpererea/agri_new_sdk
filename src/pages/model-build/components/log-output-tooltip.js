import React from "react";
import { DataModalLogOutput, TableComponent } from "../../../components";
import moment from "moment";
import { Empty, Spin } from "antd";

const LogOutputTooltip = ({
  width = 350,
  customClass,
  logOutPut,
  logErrorDetailsLoading
}) => {
  const columns = [
    {
      title: "Date",
      dataIndex: "Log_Date",
      width: "22%",
      render: (date) => {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      title: "User",
      dataIndex: "Log_User",
      width: "18%",
    },
    {
      title: "Description",
      dataIndex: "Log_desc",
      width: "45%",
    },
    {
      title: "Script Type",
      dataIndex: "Script_Type",
      width: "15%",
    },
  ];


  if(logErrorDetailsLoading && !logOutPut){
    return (
      <div className="loader-componet">
        <Spin spinning={logErrorDetailsLoading} size="large" tip="Loading..." />
      </div>
    )
  }else{

    if(typeof logOutPut !== 'undefined' && logOutPut.length > 0){
      return (
        <div className="details-area" style={{ 
          width: "350px",
          height: "400px",
          overflowY: "auto"
          }}>
  
        {
          logOutPut.split(",").map((dataSet, index) => (
              <span
                className={
                  dataSet.replace(/\s/g, "") === "JOBSCHEDULE" ||
                  dataSet.replace(/\s/g, "") === "MODELACCURACY" ||
                  dataSet.replace(/\s/g, "") === "VARIABLEIMPORTANCE" ||
                  dataSet.replace(/\s/g, "") === "API"
                    ? "details-str headings"
                    : "details-str "
                }
                key={index}
              >
                {dataSet}
              </span>
            ))
        }
      </div>
  
  
      )
    }else{
      return (
        <div style={{width : width}} className={customClass}>
            <Empty className="empty-logs-data" description={"No Log data"} />
        </div>
      );
    }

  }


};

export default LogOutputTooltip;
