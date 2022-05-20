import axios from '../../../config/axiosInstance';
import configConstants from '../../../config/constants';

export const getPipelineSelectionDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/sp/getModelsList`,
      {params : dataParams}
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const getModelPipeLineList = async () => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/getModelBuildDataList`
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


export const saveConnectAndPreviewData = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/sp/insertModelDataset`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};
//get all files related to the folder
export const getAllFilesInFolder = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/sp/getFileInFolder`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const getPreviousPipelineDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/sp/getSavedModelDatasets`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const getPreviousPipelineDataApiBuildDataSet = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/sp/getSavedModelDatasetsForBuildDataSet`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};


export const updatPipelineDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.patch(
      `${apiUrl}/api/v1/sp/updateBuildModelDataset`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const updatPipelineValidateDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.patch(
      `${apiUrl}/api/v1/sp/updateValidateModelDataset`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const updateModelTrainDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.patch(
      `${apiUrl}/api/v1/sp/updateModelTrainData`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const updateModelProductionDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.patch(
      `${apiUrl}/api/v1/sp/updateModelProductionData`,
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


export const updateModel = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.patch(
      `${apiUrl}/api/v1/sp/updateModel`,
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

export const getBuildDatasetFieldsApi = async (data) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/sp/getSetupModelsFields`,
      { params: data }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const getBuildDatasetTablesApi = async () => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/sp/getSetupModelsTables`,
      { params: {} }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const createNewModel = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.post(
      `${apiUrl}/api/v1/sp/insertModel`,
      dataParams
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const getUserCreatedModelData = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/sp/callUserCreatedModelData`, {
      params: dataParams
  });

    return ModelData;
  } catch (err) {
    throw err;
  }
};