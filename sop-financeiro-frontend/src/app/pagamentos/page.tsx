'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPagamentos } from '../../store/pagamentosSlice'; 
import type { RootState, AppDispatch } from '../../store/store';

export default function PagamentoPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.pagamentos);

  useEffect(() => {
    dispatch(fetchPagamentos());
  }, [dispatch]);

  if (loading) return <p>Carregando pagamentos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Pagamentos</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Número Pagamento</th>
            <th className="border border-gray-300 p-2">Data Pagamento</th>
            <th className="border border-gray-300 p-2">Valor (R$)</th>
            <th className="border border-gray-300 p-2">Observação</th>
            <th className="border border-gray-300 p-2">Empenho ID</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(items) ? (
            items.map(pagamento => (
              <tr key={pagamento.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{pagamento.numeroPagamento}</td>
                <td className="border border-gray-300 p-2">{pagamento.dataPagamento}</td>
                <td className="border border-gray-300 p-2">{pagamento.valor.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{pagamento.observacao ?? '-'}</td>
                <td className="border border-gray-300 p-2">{pagamento.empenhoId ?? '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                Nenhum pagamento encontrado ou formato inválido.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
