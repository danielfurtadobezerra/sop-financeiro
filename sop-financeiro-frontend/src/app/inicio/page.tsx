'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-10">Sistema Financeiro SOP</h1>

      <button
        onClick={() => router.push('/despesas')}
        className="w-48 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Despesas
      </button>

      <button
        onClick={() => router.push('/empenhos')}
        className="w-48 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Empenhos
      </button>

      <button
        onClick={() => router.push('/pagamentos')}
        className="w-48 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Pagamentos
      </button>
    </main>
  );
}
