import { authApi } from './authApi';

export const getEtudiantFn = async (id_etudiant) => {
  const response = await authApi.get(`etudiant/${id_etudiant}`);
  return response.data;
};

export const getAllEtudiantsFn = async () => {
  const response = await authApi.get(`etudiant`);
  return response.data;
};

export const createEtudiantFn = async (formData) => {
  const response = await authApi.post(`etudiant/`, formData);
  return response.data;
};

export const updateEtudiantFn = async ({ id_etudiant, ...formData }) => {
  const response = await authApi.put(`etudiant/${id_etudiant}/`, formData);
  return response.data;
};

export const deleteEtudiantFn = async (id_etudiant) => {
  const response = await authApi.delete(`etudiant/${id_etudiant}`);
  return response.data;
};
