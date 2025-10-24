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

  const PRIMARY_COLOR = 'text-green-600';
  const SECOND_COLOR = 'text-red-600';

  return (
    <div className="min-h-screen bg-[var(--bg-light)] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className={`text-5xl font-extrabold text-gray-900 mb-4 tracking-tight`}>
            <span className={PRIMARY_COLOR}>Önde Gelen</span> Otobüs Firmalarımız
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Orta Dünya'nın en güvenilir otobüs firmalarıyla işbirliği yapıyoruz. Her firma, kendi bölgesinde uzmanlaşmış ve kaliteli hizmet sunmaktadır.
          </p>
        </header>

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

       <div className="mt-20 p-12 rounded-2xl text-center shadow-inner-lg border border-gray-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Orta Dünya yollarında <span className={PRIMARY_COLOR}>galileoff.</span> ile kendi firmanızı parlatmak ister misiniz?
          </h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            Orta Dünya yollarında firmanız öne çıksın. Binlerce yolcuya ulaşın, hizmetinizi tüm diyar duysun. <span className={SECOND_COLOR}>Ne Gandalf, ne ejderha… sadece işini bilen bir marka.</span>
          </p>
          <a
            href="/support"
            className={`inline-block bg-black text-white px-8 py-3 rounded-xl font-bold shadow-md transform active:shadow-inner active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-400/50`}
          >
            İletişime Geçin
          </a>
        </div>
      </div>
    </div>
  );
}
