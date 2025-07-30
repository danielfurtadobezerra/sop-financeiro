'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEmpenho } from '@/services/empenhoService';

export default function NovoEmpenhoPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    numeroEmpenho: '',
    dataEmpenho: '',
    valor: '',
    despesaId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const valorParsed = parseFloat(formData.valor);
    if (isNaN(valorParsed)) {
      alert('Informe um valor válido.');
      return;
    }

    try {
      const data = {
        ...formData,
        valor: valorParsed,
      };

      await createEmpenho(data);
      router.push('/empenhos'); 
    } catch (err) {
      console.error('Erro ao criar empenho:', err);
      alert('Erro ao criar empenho.');
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Novo Empenho</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-4">
        <input
          type="text"
          name="numeroEmpenho"
          placeholder="Número do Empenho"
          value={formData.numeroEmpenho}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="dataEmpenho"
          value={formData.dataEmpenho}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="valor"
          placeholder="Valor (R$)"
          step="0.01"
          value={formData.valor}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="despesaId"
          placeholder="ID da Despesa relacionada"
          value={formData.despesaId}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/empenhos')}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Criar Empenho
          </button>
        </div>
      </form>
    </main>
  );
}
