import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-10">Sistema Financeiro SOP</h1>

      <Link href="/despesas">
        <button className="w-48 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Despesas
        </button>
      </Link>
      

      <Link href="/empenhos">
        <button className="w-48 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Empenhos
        </button>
      </Link>

      <Link href="/pagamentos">
        <button className="w-48 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
          Pagamentos
        </button>
      </Link>
    </main>
  );
}
