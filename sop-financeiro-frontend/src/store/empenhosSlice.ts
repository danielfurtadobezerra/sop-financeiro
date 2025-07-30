import { getEmpenhos } from '@/services/empenhoService';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Empenhos {
  id: number;
  numeroEmpenho: string;
  dataEmpenho: string;  
  valor: number;
  observacao?: string;
  despesaId: number;
}

interface EmpenhoState {
  items: Empenhos[];
  loading: boolean;
  error: string | null;
}

const initialState: EmpenhoState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchEmpenhos = createAsyncThunk('empenhos/fetch', async () => {
  return await getEmpenhos();
});

const empenhoSlice = createSlice({
  name: 'empenhos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmpenhos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmpenhos.fulfilled, (state, action: PayloadAction<Empenhos[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEmpenhos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Erro ao carregar empenhos';
      });
  },
});

export default empenhoSlice.reducer;
