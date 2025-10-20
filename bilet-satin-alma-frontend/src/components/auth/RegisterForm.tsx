'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { register } from '@/services/busService';
import { useRouter } from 'next/navigation';

type UserType = 'customer' | 'company' | null;

export default function RegisterForm() {
  const [userType, setUserType] = useState<UserType>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
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
      
      if (userType === 'company') {
        const response = await fetch('http://localhost:8000/api/register/company', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            full_name: registerData.full_name,
            company_name: registerData.company_name,
            email: registerData.email,
            password: registerData.password,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Şirket kaydı başarısız.');
        }
        console.log('Company registration successful:', data);
      } else {
        const response = await register(registerData);
        console.log('Registration successful:', response);
      }
      
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Kayıt olurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-brand-neutral mb-2">
            galileoff.'a Hoş Buyurdunuz!
          </h1>
          <p className="text-brand-neutral/60 text-sm">
            Hangi sıfatla katılmak istersiniz?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setUserType('customer')}
            className="group relative p-6 border-2 border-morphism-border rounded-xl hover:border-brand-primary transition-all hover:shadow-lg"
          >
            <div className="text-4xl mb-3">🧭</div>
            <h3 className="text-xl font-semibold text-brand-neutral mb-2">
              Gezgin
            </h3>
            <p className="text-sm text-brand-neutral/60">
              Orta Dünya'nın yollarında seyahat etmek istiyorum
            </p>
          </button>

          <button
            onClick={() => setUserType('company')}
            className="group relative p-6 border-2 border-morphism-border rounded-xl hover:border-brand-primary transition-all hover:shadow-lg"
          >
            <div className="text-4xl mb-3">🚌</div>
            <h3 className="text-xl font-semibold text-brand-neutral mb-2">
              Otobüs Firması
            </h3>
            <p className="text-sm text-brand-neutral/60">
              Kervanımı Orta Dünya'ya açmak istiyorum
            </p>
          </button>
        </div>

        <div className="text-center pt-4 border-t border-morphism-border">
          <p className="text-brand-neutral/70">
            Zaten galileoff'un diyarından mısın?{' '}
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={() => setUserType(null)}
          className="text-brand-primary hover:text-brand-secondary text-sm mb-4 inline-flex items-center gap-1"
        >
          ← Geri Dön
        </button>
        <h1 className="text-3xl font-semibold text-brand-neutral mb-2">
          {userType === 'company' ? 'Firma Hesabı Oluştur' : 'Gezgin Hesabı Oluştur'}
        </h1>
        <p className="text-brand-neutral/60 text-sm">
          {userType === 'company' 
            ? 'Kervanınızı Orta Dünya\'ya kaydedin' 
            : 'Yolculuğunuza başlayın'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {userType === 'company' ? (
          <>
            <Input
              label="Firma Adı"
              type="text"
              value={formData.company_name}
              onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
              placeholder="Kervanınızın adı nedir?"
              required
            />
            <Input
              label="Yetkili Ad Soyad"
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="Adınızı öğrenebilir miyim?"
              required
            />
          </>
        ) : (
          <Input
            label="Ad Soyad"
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
            placeholder="Adınızı öğrenebilir miyim?"
            required
          />
        )}

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
