import React from 'react';

export default function KullanimKosullariPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)] py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-8 text-center">
          Kullanım Koşulları
        </h1>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            "galileoff." platformunu kullanarak, aşağıdaki kullanım koşullarını kabul etmiş olursunuz. Bu koşullar, Orta Dünya'nın en güvenilir yolculuk hizmetini kullanırken uymanız gereken kuralları belirler.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Genel Kurallar</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
            <li>Platformu Orta Dünya'nın yasal amaçlarına göre kullanın</li>
            <li>Başkalarının haklarını ihlal etmeyin</li>
            <li>Sisteme hiçbir büyü gücü kullanmaya çalışmayın</li>
            <li>Rezervasyon bilgilerini doğru girin (lütfen)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Rezervasyon ve Ödeme</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
            <li>Bilet rezervasyonları satın aldıktan sonra geçerlidir</li>
            <li>İptal ve değişiklik işlemleri keyfimize tabidir</li>
            <li>Ödemeler güvenli kanallardan yapılır</li>
            <li>İade koşulları diye bi şey yok. İade talep etmeyin!</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Sorumluluk Reddi</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Yolculuk sırasında elf yollarında taş düşmesi, cüce köprülerinin yıkılması veya diğer felaketler yüzünden meydana gelebilecek gecikmelerden sorumlu değiliz. Bu aksaklıklardan ilgili taşra lordları ve otobüs firmaları mesuldür.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Hizmet Değişiklikleri</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hizmetlerimizi geliştirmek için zaman zaman değiştiririz; büyük değişikliklerde müşterilerimize işaret fişekleriyle haber veririz, yoksa Orta Dünya şaşırır.
          </p>

          <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 p-6 rounded-lg mt-8">
            <p className="text-center text-[var(--primary)] font-semibold">
              "Sabır, en karanlık yollarda bile ışığı bulur." - Elrond
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
