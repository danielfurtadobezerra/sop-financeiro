import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
});

export const getDespesas = async (filtros = {}) => {
  const filtrosLimpos = Object.fromEntries(
    Object.entries(filtros).filter(([_, v]) => v !== '')
  );

  const response = await api.get('/despesas/listar', { params: filtrosLimpos });
  return response.data;
};

export const getDespesaById = async (id: number) => {
  const response = await api.get(`/despesas/${id}`);
  return response.data;
};

export const createDespesa = async (despesa: unknown) => {
  const response = await api.post('/despesas', despesa, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateDespesa = async (id: number, despesa: unknown) => {
  const response = await api.put(`/despesas/${id}`, despesa);
  return response.data;
};

export const deleteDespesa = async (id: number) => {
  const response = await api.delete(`/despesas/${id}`);
  return response.data;
};
