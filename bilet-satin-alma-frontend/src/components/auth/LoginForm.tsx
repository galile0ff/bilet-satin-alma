'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Login işlemi burada yapılacak
      console.log('Giriş yapılıyor:', formData);
      // Simülasyon için
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-brand-neutral mb-2">
          Tekrar Hoşgeldin
        </h1>
        <p className="text-brand-neutral/70">
          galileoff'un diyarına giriş yap (ಠ ʖ̯ ͡ಠ)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="mail@mail.com"
          required
        />

        <Input
          label="Şifre"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="(づ￣ 3￣)づ"
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-morphism-border text-brand-primary focus:ring-brand-primary/50"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-brand-neutral/70">
              Aldım Hafızaya!
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-brand-primary hover:text-brand-secondary transition-colors"
          >
            Şifremi unuttum
          </Link>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Beklicen ecik...' : 'Buyursunlar Efendim!'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-brand-neutral/70">
          galileoff'un diyarından değil misin?{' '}
          <Link
            href="/register"
            className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
          >
            Üye Ol
          </Link>
        </p>
      </div>
    </div>
  );
}
