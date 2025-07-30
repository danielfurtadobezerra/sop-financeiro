'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDespesa } from '../../../services/despesasService';

export default function NovaDespesaPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    numeroProtocolo: '',
    tipoDespesa: '',
    dataProtocolo: '',
    credor: '',
    valor: '',
    status: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

      await createDespesa(data);
      router.push('/despesas'); // Redireciona para a lista
    } catch (err) {
      console.error('Erro ao criar despesa:', err);
      alert('Erro ao criar despesa.');
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Nova Despesa</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto space-y-4">
        <input
          type="text"
          name="numeroProtocolo"
          placeholder="Número do Protocolo"
          value={formData.numeroProtocolo}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="tipoDespesa"
          placeholder="Tipo de Despesa"
          value={formData.tipoDespesa}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="dataProtocolo"
          value={formData.dataProtocolo}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="credor"
          placeholder="Credor"
          value={formData.credor}
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
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push('/despesas')}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Criar Despesa
          </button>
        </div>
      </form>
    </main>
  );
}
