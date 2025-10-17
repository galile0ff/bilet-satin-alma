'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { register } from '@/services/busService';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Parmaklarda sıkıntı mı var? Şifreler uyuşmuyor!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await register(registerData);
      console.log('Registration successful:', response);
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-brand-neutral mb-2">
          Hesap Oluşturun
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Ad Soyad"
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
          placeholder="Adınızı öğrenebilir miyim?"
          required
        />

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

        <Input
          label="Şifre Tekrar"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
          placeholder="(づ￣ 3￣)づ"
          required
        />

        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            required
            className="h-4 w-4 rounded border-morphism-border text-brand-primary focus:ring-brand-primary/50"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-brand-neutral/70">
            <span>galileoff.'un hizmet koşullarını kabul ediyorum.</span>
          </label>
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
          galileoff'un diyarından mısın?{' '}
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
