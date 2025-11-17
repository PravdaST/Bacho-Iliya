'use client';

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if already authenticated in session
  useEffect(() => {
    const authToken = sessionStorage.getItem('admin_auth_token');
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem('admin_auth_token', data.authToken);
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || 'Невалидна парола');
      }
    } catch (error) {
      setAuthError('Грешка при свързване със сървъра');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8B4513] to-[#D2691E] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#F5E6D3] rounded-full mb-4">
              <Lock className="w-8 h-8 text-[#8B4513]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Панел
            </h1>
            <p className="text-gray-600">Бачо Илия</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Парола
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                placeholder="Въведи парола"
                required
                disabled={isLoading}
              />
            </div>

            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#8B4513] text-white py-3 rounded-lg font-medium hover:bg-[#6D3610] transition-colors disabled:bg-gray-400"
            >
              {isLoading ? 'Проверка...' : 'Вход'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Logout Button */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin Panel - Бачо Илия</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            Изход
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}
