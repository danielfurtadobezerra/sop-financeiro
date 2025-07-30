import { configureStore } from '@reduxjs/toolkit';
import despesasReducer from './despesasSlice';
import empenhosReducer from './empenhosSlice';
import pagamentosReducer from './pagamentosSlice';

export const store = configureStore({
  reducer: {
    despesas: despesasReducer,
    empenhos: empenhosReducer,
    pagamentos: pagamentosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
