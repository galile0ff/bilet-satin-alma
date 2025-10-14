'use client';

import React from 'react';
import ContactForm from '../../components/contact/ContactForm';

export default function SupportPage() {
  const faqs = [
    {
      question: 'Biletimi nasıl iptal edebilirim?',
      answer: 'Yol bazen değişir, tıpkı kader gibi… Eğer yolculuğunuzu iptal etmek isterseniz, rehberlerimize (müşteri hizmetlerine) başvurun. Unutmayın, her krallığın kuralları farklıdır.'
    },
    {
      question: 'Yolculuk tarihimi nasıl değiştirebilirim?',
      answer: 'Güneş batmadan bir gün önce bize seslen; rüzgâr yeni bir yön gösterecektir.Yolun değişse de Orta Dünya seni bekliyor.'
    },
    {
      question: 'Kayıp eşyamı nasıl bulabilirim?',
      answer: 'Kayıp mı ettin? Belki Merry ya da Pippin çalmıştır! Yine de emin olmak için yolculuk yaptığın firmanın dostane hizmetkârlarına danış. Belki çaydan önce bulurlar.'
    },
    {
      question: 'Ödeme sorunları için ne yapmalıyım?',
      answer: 'Altın kesesine mi sıkıştı? Endişelenme, banka muhafızlarıyla ya da bizimle konuş — hazinen karanlık güçlerin elinde değil, emin ol.'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-light)] py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Başlık */}
        <h1 className="text-4xl font-bold text-center text-[var(--text-light)] dark:text-[var(--text-dark)] mb-6">
          Destek ve Yardım
        </h1>

        <p className="text-lg text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
          Endişelenmeyin yolcu, Mordor bile bir soruyla fethedilmez.
          Kadim büyücülerden oluşan destek ekibimiz size her adımda eşlik ediyor.
        </p>

        {/* Form ve SSS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* İletişim Formu */}
          <div>
            <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">
              Bize Ulaşın
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Her türlü mesajınız, kartallarla bize ulaşır. Formu doldur yolcu, cevap rüzgârla sana dönecektir.
            </p>
            <ContactForm />
          </div>

          {/* SSS */}
          <div>
            <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">
              Sık Sorulan Sorular
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 transition-shadow hover:shadow-md bg-white dark:bg-[var(--bg-dark)]"
                >
                  <h3 className="font-semibold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-2 text-lg">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
