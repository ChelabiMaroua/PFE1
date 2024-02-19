import { authApi } from './authApi';

export const getEntrepriseFn = async (id_entreprise) => {
  const response = await authApi.get(`entreprise/${id_entreprise}`);
  return response.data;
};

export const getAllEntreprisesFn = async () => {
  const response = await authApi.get(`entreprise`);
  return response.data;
};

export const createEntrepriseFn = async (formData) => {
  const response = await authApi.post(`entreprise/`, formData);
  return response.data;
};

export const updateEntrepriseFn = async ({ id_entreprise, ...formData }) => {
  const response = await authApi.put(`entreprise/${id_entreprise}/`, formData);
  return response.data;
};

export const deleteEntrepriseFn = async (id_entreprise) => {
  const response = await authApi.delete(`entreprise/${id_entreprise}`);
  return response.data;
};
