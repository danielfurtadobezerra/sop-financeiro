'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDespesas } from '../../store/despesasSlice';
import { useRouter, useParams } from 'next/navigation';
import type { RootState, AppDispatch } from '../../store/store';
import Link from 'next/link';

export default function DespesasPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.despesas);

const [filtro, setFiltro] = useState({
  numeroProtocolo: '',
  tipoDespesa: '',
  dataProtocolo: '',
});
useEffect(() => {
  dispatch(fetchDespesas({}));
}, [dispatch]);

  const handleFiltroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFiltro((prev) => ({ ...prev, [name]: value }));
};


const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  dispatch(fetchDespesas(filtro));
};

const handleEditar = (id: string) => {
    router.push(`/despesas/editar/${id}`);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de Despesas</h1>

      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-6xl mb-10 ml-6">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-6xl mb-10 ml-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Pesquisar Despesas</h2>
            <Link
              href="/despesas/novo"
              className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Criar Despesa
            </Link>
          </div>

          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <input
              type="text"
              name="numeroProtocolo"
              placeholder="Número do Protocolo"
              value={filtro.numeroProtocolo}
              onChange={handleFiltroChange}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="tipoDespesa"
              placeholder="Tipo de Despesa"
              value={filtro.tipoDespesa}
              onChange={handleFiltroChange}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              name="dataProtocolo"
              value={filtro.dataProtocolo}
              onChange={handleFiltroChange}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <p className="text-center">Carregando despesas...</p>
      ) : error ? (
        <p className="text-center text-red-600">Erro: {error}</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Número Protocolo</th>
              <th className="border border-gray-300 p-2">Tipo</th>
              <th className="border border-gray-300 p-2">Data Protocolo</th>
              <th className="border border-gray-300 p-2">Credor</th>
              <th className="border border-gray-300 p-2">Valor (R$)</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(items) && items.length > 0 ? (
              items.map(despesa => (
                <tr key={despesa.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{despesa.numeroProtocolo}</td>
                  <td className="border border-gray-300 p-2">{despesa.tipoDespesa}</td>
                  <td className="border border-gray-300 p-2">{despesa.dataProtocolo}</td>
                  <td className="border border-gray-300 p-2">{despesa.credor}</td>
                  <td className="border border-gray-300 p-2">{despesa.valor.toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{despesa.status ?? 'Sem status'}</td>

                  <td className="border border-gray-300 p-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditar(despesa.id.toString())}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={async () => {
                        if (confirm('Tem certeza que deseja excluir essa despesa?')) {
                          try {
                            const response = await fetch(`http://localhost:8080/api/despesas/${despesa.id}`, {
                              method: 'DELETE',
                            });

                            if (response.ok) {
                              alert('Despesa excluída com sucesso.');
                              location.reload(); 
                            } else {
                              alert('Erro ao excluir a despesa.');
                            }
                          } catch (error) {
                            console.error('Erro ao excluir:', error);
                            alert('Erro ao excluir a despesa.');
                          }
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4 text-gray-500">
                  Nenhuma despesa encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </main>

  );
}
