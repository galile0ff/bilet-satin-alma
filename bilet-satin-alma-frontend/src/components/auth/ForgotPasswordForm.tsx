'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      console.log('Şifre sıfırlama isteği:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('Şifre sıfırlama isteği gönderilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-brand-neutral mb-2">
            Sıfırlama Bağlantısı Gönderdim ( ͡° ͜ʖ ͡°)
          </h1>
          <p className="text-brand-neutral/70">
            Şifre sıfırlama bağlantısını {email} adresine gönderdim. Posta kutularını kontrol edecek kadar sorumlu ol.
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/login"
            className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
          >
            Hadi Şimdi Giriş Sayfasına Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-brand-neutral mb-2">
          Şifremi Unuttum ¯\_(ツ)_/¯
        </h1>
        <p className="text-brand-neutral/70">
          Bu sayfaya girdiğin için B12 eksikliğin olduğunu düşünüyorum. E-posta adresini gir, sana bir şifre sıfırlama bağlantısı göndereyim. (şşş, aramızda)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mail@mail.com"
          required
        />

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
          {loading ? 'Beklicen ecik...' : 'Şifremi Veer!'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-brand-neutral/70">
          Hafızanı tazeledin mi?{' '}
          <Link
            href="/login"
            className="text-brand-primary hover:text-brand-secondary font-medium transition-colors"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
