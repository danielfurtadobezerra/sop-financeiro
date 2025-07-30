'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Empenho {
  id: number;
  numeroEmpenho: string;
  dataEmpenho: string;
  valor: number;
}

export default function EmpenhosPage() {
  const [empenhos, setEmpenhos] = useState<Empenho[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/api/empenhos')
      .then(res => res.json())
      .then(data => setEmpenhos(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este empenho?')) {
      try {
        const res = await fetch(`http://localhost:8080/api/empenhos/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          alert('Empenho excluído com sucesso.');
          setEmpenhos(prev => prev.filter(emp => emp.id !== id));
        } else {
          alert('Erro ao excluir empenho.');
        }
      } catch (err) {
        console.error(err);
        alert('Erro ao excluir.');
      }
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Empenhos</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lista de Empenhos</h2>
        <Link
          href="/empenhos/novo"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Criar Empenho
        </Link>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Número</th>
              <th className="border p-2">Data</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {empenhos.map(emp => (
              <tr key={emp.id}>
                <td className="border p-2">{emp.numeroEmpenho}</td>
                <td className="border p-2">{emp.dataEmpenho}</td>
                <td className="border p-2">R$ {emp.valor.toFixed(2)}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => router.push(`/empenhos/editar/${emp.id}`)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
