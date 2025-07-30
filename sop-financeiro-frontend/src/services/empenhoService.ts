import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getEmpenhos = async () => {
  const response = await api.get('/empenhos');
  return response.data;
};

export const getEmpenhoById = async (id: number) => {
  const response = await api.get(`/empenhos/${id}`);
  return response.data;
};

export const createEmpenho = async (empenho: unknown) => {
  const response = await api.post('/empenhos', empenho);
  return response.data;
};

export const updateEmpenho = async (id: number, empenho: unknown) => {
  const response = await api.put(`/empenhos/${id}`, empenho);
  return response.data;
};

export const deleteEmpenho = async (id: number) => {
  const response = await api.delete(`/empenhos/${id}`);
  return response.data;
};
