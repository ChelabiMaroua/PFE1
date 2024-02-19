import { authApi } from './authApi';

export const getUtilisateurFn = async (id_utilisateur) => {
    const response = await authApi.get(`utilisateur/${id_utilisateur}`);
    return response.data;
};

export const getAllUtilisateursFn = async () => {
    const response = await authApi.get(`utilisateur`);
    return response.data;
};

export const createUtilisateurFn = async (formData) => {
    const response = await authApi.post(`utilisateur/`, formData);
    return response.data;
};

export const updateUtilisateurFn = async ({ id_utilisateur, ...formData }) => {
    const response = await authApi.put(`utilisateur/${id_utilisateur}/`, formData);
    return response.data;
};

export const deleteUtilisateurFn = async (id_utilisateur) => {
    const response = await authApi.delete(`utilisateur/${id_utilisateur}`);
    return response.data;
};
