'use client';

export default function RegisterPage() {
  // Giveaway ended - show message
  return (
    <div className="bg-old-paper relative min-h-screen overflow-hidden px-4 py-24 flex items-center justify-center">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-md">
        <h1 className="font-handwritten text-3xl md:text-4xl text-gray-600 mb-4">
          Играта приключи
        </h1>
        <p className="text-gray-500 mb-6">
          Благодарим на всички участници! Победителите са изтеглени.
        </p>
        <a
          href="/"
          className="inline-block bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Към началната страница
        </a>
      </div>
    </div>
  );
}
