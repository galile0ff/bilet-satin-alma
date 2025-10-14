'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Login işlemleri buraya gelecek
    console.log('Giriş yapılıyor:', { email, password });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="relative backdrop-blur-lg bg-white/70 dark:bg-gray-900/50 rounded-2xl shadow-xl dark:shadow-gray-800/20 p-8 ring-1 ring-gray-200/50 dark:ring-gray-800/50">
          {/* Blur Gradient */}
          <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-t from-blue-50/50 to-white/50 dark:from-blue-900/20 dark:to-gray-900/20 rounded-2xl -z-10"></div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium text-gray-900 dark:text-white/90 mb-2">
              Tekrar Hoşgeldiniz
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Hesabınıza giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white/90 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:text-white/90 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400"
                />
                <label htmlFor="remember" className="ml-2 text-gray-700 dark:text-gray-300">
                  Beni hatırla
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
              >
                Şifremi unuttum
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Giriş Yap
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Hesabınız yok mu?{' '}
              <Link
                href="/register"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Üye Ol
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}