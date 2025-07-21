
"use client";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎉 Deployment Test
        </h1>
        <p className="text-gray-600 mb-4">
          Ако виждаш тази страница, deployment-ът работи!
        </p>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-green-800 font-semibold">
            ✅ Next.js приложението се зарежда успешно
          </p>
        </div>
        <div className="mt-4">
          <a 
            href="/" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
          >
            Към главната страница
          </a>
        </div>
      </div>
    </div>
  );
}
