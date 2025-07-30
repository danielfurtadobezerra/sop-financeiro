import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getPagamentos = async () => {
  const response = await api.get('/pagamentos');
  return response.data;
};

export const getPagamentoById = async (id: number) => {
  const response = await api.get(`/pagamentos/${id}`);
  return response.data;
};

export const createPagamento = async (pagamento: unknown) => {
  const response = await api.post('/pagamentos', pagamento);
  return response.data;
};

export const updatePagamento = async (id: number, pagamento: unknown) => {
  const response = await api.put(`/pagamentos/${id}`, pagamento);
  return response.data;
};

export const deletePagamento = async (id: number) => {
  const response = await api.delete(`/pagamentos/${id}`);
  return response.data;
};
