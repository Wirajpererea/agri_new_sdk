import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Card } from "../../components";
import "./datadictionary.scss";
import { getDataDictionaryData } from "./services/dataDictionaryService";
import config from "../../config/constants";

const DataDictionary = (props) => {
  const [tabeleData, setTableData] = useState([]);
  const [iFrameUrl, setIFrameUrl] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Documents",
      dataIndex: "document",
      key: "document",
      render: (document) => <span>{document.split(".")[0]}</span>,
    },

    {
      title: "",
      align: "right",
      className: "",
      dataIndex: "link",
      key: "link",
      render: (link) => {
        const apiUrl = config.apiUrlWithPort;
        let linkToGo = `${apiUrl}${link}`;
        return (
          <span>
            <button
              onClick={() => iFramePage(linkToGo)}
              rel="noopener noreferrer"
            >
              open
            </button>
          </span>
        );
      },
    },
  ];

  const iFramePage = (link) => {
    setIFrameUrl(link);
  };

  const getData = async () => {
    const documentData = await getDataDictionaryData();
    setTableData(documentData.data.body);
  };
  return (
    <div className="data-dictionary-container">
      <Card className="data-dictionary-card">
        <h2 className="data-dictionary-header">Data Dictionary</h2>
        {iFrameUrl != null ? (
          <div>
            <button
              style={{ marginBottom: 10 }}
              onClick={() => {
                setIFrameUrl(null);
              }}
            >
              Back
            </button>
            <iframe
              src={iFrameUrl}
              width="100%"
              height="500px"
              position="relative"
            />
          </div>
        ) : (
          <Table
            className="data-dictionary-table"
            dataSource={tabeleData}
            columns={columns}
          />
        )}
      </Card>
    </div>
  );
};

export default DataDictionary;
