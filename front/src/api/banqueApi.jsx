import { authApi } from './authApi';

export const getBanqueFn = async (id_banque) => {
  const response = await authApi.get(`banque/${id_banque}`);
  return response.data;
};

export const getAllBanquesFn = async () => {
  const response = await authApi.get(`banque`);
  return response.data;
};

export const createBanqueFn = async (formData) => {
  const response = await authApi.post(`banque/`, formData);
  return response.data;
};

export const updateBanqueFn = async ({ id_banque, ...formData }) => {
  const response = await authApi.put(`banque/${id_banque}/`, formData);
  return response.data;
};

export const deleteBanqueFn = async (id_banque) => {
  const response = await authApi.delete(`banque/${id_banque}`);
  return response.data;
};
