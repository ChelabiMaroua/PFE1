import { authApi } from './authApi';

export const getEnseignantFn = async (id_enseignant) => {
  const response = await authApi.get(`enseignant/${id_enseignant}`);
  return response.data;
};

export const getAllEnseignantsFn = async () => {
  const response = await authApi.get(`enseignant`);
  return response.data;
};

export const createEnseignantFn = async (formData) => {
  const response = await authApi.post(`enseignant/`, formData);
  return response.data;
};

export const updateEnseignantFn = async ({ id_enseignant, ...formData }) => {
  const response = await authApi.put(`enseignant/${id_enseignant}/`, formData);
  return response.data;
};

export const deleteEnseignantFn = async (id_enseignant) => {
  const response = await authApi.delete(`enseignant/${id_enseignant}`);
  return response.data;
};
