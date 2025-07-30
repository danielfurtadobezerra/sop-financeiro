// src/store/despesasSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDespesas } from '../services/despesasService';

export interface Despesa {
  id: number;
  numeroProtocolo: string;
  tipoDespesa: string;
  dataProtocolo: string;
  dataVencimento: string;
  credor: string;
  descricao: string;
  valor: number;
  status?: string;
}

interface DespesasState {
  items: Despesa[];
  loading: boolean;
  error: string | null;
}

const initialState: DespesasState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDespesas = createAsyncThunk(
  'despesas/fetchDespesas',
  async (filtros: { numeroProtocolo?: string; tipoDespesa?: string; dataProtocolo?: string }) => {
    const response = await getDespesas(filtros);
    return response;
  }
);

const despesasSlice = createSlice({
  name: 'despesas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDespesas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDespesas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchDespesas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erro ao carregar despesas';
      });
  },
});

export default despesasSlice.reducer;
