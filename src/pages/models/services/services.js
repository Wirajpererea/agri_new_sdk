import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const getModelsData = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/sp/callGetUserModels`, {
      params: dataParams
  });

    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const callBuildPipelineApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/sp/callBuildPipelineNow`, {
      params: dataParams
  });

    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const deleteModelData = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.delete(`${apiUrl}/api/v1/sp/callDeleteModel`, {
      params: dataParams
  });

    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const getModelBuildInfoApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/sp/callModelBuildInfo`, {
      params: dataParams
  });

    return ModelData;
  } catch (err) {
    throw err;
  }
}
