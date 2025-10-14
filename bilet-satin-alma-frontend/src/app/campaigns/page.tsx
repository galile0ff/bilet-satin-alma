'use client'

import React, { useState } from 'react';

export default function CampaignsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [email, setEmail] = useState('');

  const campaigns = [
    { title: 'Hobbit Yolu Hediyesi', description: 'Shire’den taze çay ve minik bir halı hediyesi! Ruhunuza iyi gelsin.', icon: '🍃' },
    { title: 'Elf Sessizliği Hediyesi', description: 'Lothlórien’den gelen sessiz bir melodi hediye! Yolculuk boyunca dinleyin.', icon: '🧝' },
    { title: 'Cüce Dağ Taşları', description: 'Dağlık bölgelerden cüce işçiliğiyle taşlar! Toplayın, dekor olarak kullanın.', icon: '⛏️' },
    { title: 'Gandalf’ın Sihirli Rotası', description: 'Gandalf’ın sihirli izlerini takip edin! Her durakta sürpriz bir efsane hissi.', icon: '🧙' }
  ];

  // Email doğrulama (parametresiz, direkt state kullanıyor)
  const validateEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubscribe = () => {
    if (!validateEmail()) {
      alert('Bunun bir mail adresi olduğundan emin değilim.');
      return;
    }

    setModalMessage(
      `Yüzüğün teslim alınmaya hazır. Otobüse bindiğinde Elflerin himayesinde güvenle sana ulaştırılacak. Unutma, Orta Dünya yolları uzun ve sürprizlerle dolu; Gandalf’a selam söyle!`
    );
    setEmail('');
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-light)] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-8 text-center">
          Orta Dünya Kampanyaları
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center max-w-3xl mx-auto">
          Orta Dünya'nın en efsanevi hediyeleri sizi bekliyor… Yolculuğunuz ruhunuza iyi gelsin!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {campaigns.map((campaign, index) => (
            <div key={index} className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] rounded-xl p-6 flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="text-5xl mr-4">{campaign.icon}</div>
                <h3 className="text-xl font-semibold text-[var(--text-light)] dark:text-[var(--text-dark)]">{campaign.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{campaign.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">
            Daha Fazla Efsane Yolculuk mu İstiyorsunuz?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Yüzüğünüzü alıp Orta Dünya’nın en gizli hediyelerini keşfedin!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="mail@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
            <button
              onClick={handleSubscribe}
              className="bg-[var(--primary)] text-white px-6 py-2 rounded-xl hover:bg-[var(--primary)]/90 transition-colors duration-300 font-semibold"
            >
              Yüzüğüm Var!
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] rounded-xl p-8 max-w-md w-full text-center shadow-2xl border border-[var(--primary)]">
            <p className="mb-6 text-gray-800 dark:text-gray-100 text-lg leading-relaxed">
              {modalMessage}
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-[var(--primary)] text-white px-6 py-2 rounded-xl hover:bg-[var(--primary)]/90 transition-colors duration-300 font-semibold"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
