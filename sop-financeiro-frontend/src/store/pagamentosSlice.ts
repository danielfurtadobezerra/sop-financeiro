import { getPagamentos } from '@/services/pagamentoService';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Pagamentos {
  id: number;
  numeroPagamento: string;
  dataPagamento: string;
  valor: number;
  observacao?: string;
  empenhoId: number;
}

interface PagamentosState {
  items: Pagamentos[];
  loading: boolean;
  error: string | null;
}

const initialState: PagamentosState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPagamentos = createAsyncThunk('pagamentos/fetch', async () => {
  return await getPagamentos();
});

const pagamentoSlice = createSlice({
  name: 'pagamentos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPagamentos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPagamentos.fulfilled, (state, action: PayloadAction<Pagamentos[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPagamentos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erro ao carregar pagamentos';
      });
  },
});

export default pagamentoSlice.reducer;
