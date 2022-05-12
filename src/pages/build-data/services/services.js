import axios from '../../../config/axiosInstance';
import configConstants from '../../../config/constants';

export const callBuildPipelineApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(
      `${apiUrl}/api/v1/pipeline/executePipeline`,
      {
        params: dataParams,
      }
    );

    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const deleteModelData = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.delete(
      `${apiUrl}/api/v1/pipeline/pipelineExecution`,
      {
        params: dataParams,
      }
    );

    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const getModelBuildInfoApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(
      `${apiUrl}/api/v1/pipeline/getPipelineExecutionInfo`,
      {
        params: dataParams,
      }
    );

    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const getUserPipelineExecution = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/getUserPipelineExecutions`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};

export const getPipelineExecutionLogs = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const pipeLineData = await axios.get(
      `${apiUrl}/api/v1/pipeline/executionLogs`,
      { params: dataParams }
    );
    return pipeLineData;
  } catch (err) {
    throw err;
  }
};
