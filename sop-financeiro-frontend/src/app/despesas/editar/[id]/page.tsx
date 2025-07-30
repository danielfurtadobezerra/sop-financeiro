'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getDespesaById, updateDespesa } from '../../../../services/despesasService';

export default function EditarDespesaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [formData, setFormData] = useState({
    numeroProtocolo: '',
    tipoDespesa: '',
    dataProtocolo: '',
    credor: '',
    valor: '',
    status: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDespesa() {
      try {
        const data = await getDespesaById(Number(id));
        setFormData({
          numeroProtocolo: data.numeroProtocolo ?? '',
          tipoDespesa: data.tipoDespesa ?? '',
          dataProtocolo: data.dataProtocolo ? data.dataProtocolo.slice(0, 10) : '', 
          credor: data.credor ?? '',
          valor: data.valor?.toString() ?? '',
          status: data.status ?? '',
        });
      } catch (error) {
        alert('Erro ao carregar despesa.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchDespesa();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToUpdate = {
        ...formData,
        valor: parseFloat(formData.valor),
      };
      await updateDespesa(Number(id), dataToUpdate);
      router.push('/despesas');
    } catch (error) {
      alert('Erro ao atualizar despesa.');
    }
  };

  if (loading) {
    return <p>Carregando despesa...</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Despesa</h1>

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
            Atualizar Despesa
          </button>
        </div>
      </form>
    </main>
  );
}
