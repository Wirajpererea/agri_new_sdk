import axios from '../../../config/axiosInstance';
import configConstants from '../../../config/constants';

export const getPipelineSelectionDataApi = async () => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/getPipelineData`
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const checkDatabaseConnectionApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/checkDatabaseConnection`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const createPipelineDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/createPipelineData`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const createNewPipeline = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/createNewPipeline`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const updateNewPipeline = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.patch(
      `${apiUrl}/api/v1/pipeline`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const getUserPipelineExecutionApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/createPipelineData`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const getPrviewTestQueryDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/getRemoteDatabaseData`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const setMigrateRemoteDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/setRemoteDataMigrateExecution`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const exportPipelineDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/exportPipelineData`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const loadImportQueryDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/loadImportQueryData`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const alterImportQueryDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/alterImportQueryData`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const loadPrviewTestQueryApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/loadPrviewTestQuery`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const testImportQueryValidApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/testImportQueryValidity`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const scheduleDataPipelineApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/schedulePipelineData`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const importFileDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/uploadDataFileDataToDatabase`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const executeMigrateDataStatusApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/checkImportStageStatus`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const executeImportDataStatusApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/checkImportToFinalStatus`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const executeNotebookDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/pipeline/executeNotebookFile`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};
