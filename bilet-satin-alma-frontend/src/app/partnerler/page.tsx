import React from 'react';

export default function PartnerlerPage() {
  const partners = [
    { name: 'Shadowfax Express', description: 'Rohan’dan tüm diyarlara hızlı yolculuk', logo: '🐎' },
    { name: 'Mount Doom Transit', description: 'Mordor’un karanlık yollarında güvenli seyehat', logo: '🌋' },
    { name: 'Minas Tirith Lines', description: 'Gondor şehirleri arasında kraliyet konforu', logo: '🏰' },
    { name: 'Lothlórien Glide', description: 'Elflerin sessiz araçlarıyla rahat ulaşım', logo: '🌿' },
    { name: 'Khazad-dûm Coach', description: 'Dağların derinliklerinde sağlam ve güvenli yolculuk', logo: '⛏️' },
    { name: 'Hobbiton Hopper', description: 'Yeşil vadilere özel kırsal servis', logo: '🍂' },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-light)] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-8 text-center">
          Otobüs Firmaları
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto">
          Orta Dünya'nın en güvenilir otobüs firmalarıyla işbirliği yapıyoruz. Her firma, kendi bölgesinde uzmanlaşmış ve kaliteli hizmet sunmaktadır.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{partner.logo}</div>
              <h3 className="text-xl font-semibold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-2">
                {partner.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">
            Orta Dünya yollarında kendi firmanızı parlatmak ister misiniz?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Orta Dünya’nın yollarında firmanız öne çıksın. Binlerce yolcuya ulaşın, hizmetinizi tüm diyar duysun.
          </p>
          <a
            href="/support"
            className="inline-block bg-[var(--primary)] text-white px-6 py-3 rounded-xl hover:bg-[var(--primary)]/90 transition-colors duration-300"
          >
            İletişime Geçin
          </a>
        </div>
      </div>
    </div>
  );
}
