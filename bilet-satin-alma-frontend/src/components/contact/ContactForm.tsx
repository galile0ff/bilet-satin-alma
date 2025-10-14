'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi buraya gelecek
    console.log('İletişim formu gönderildi:', formData);
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapmayacağız.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <h2 className="text-section mb-6">Neler Söyleyeceksin?</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-neutral mb-2">
              Ad Soyad *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-minimal"
              placeholder="Adınızı Bahşedin"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-neutral mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-minimal"
              placeholder="mail@mail.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-brand-neutral mb-2">
            Konu *
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="input-minimal"
          >
            <option value="">Neyle Alakalı</option>
            <option value="general">Genel Soru</option>
            <option value="booking">Rezervasyon</option>
            <option value="complaint">Şikayet</option>
            <option value="suggestion">Öneri</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-brand-neutral mb-2">
            Mesajınız *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="input-minimal resize-none"
            placeholder="Neler söylemek istersin..."
          />
        </div>

        <button
          type="submit"
          className="btn-minimal w-full"
        >
          Gönder Bakalım
        </button>
      </form>
    </div>
  );
}
