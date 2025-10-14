import React from 'react';

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)] py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-8 text-center">
          KVKK ve Gizlilik Politikası
        </h1>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Kişisel verilerinizin gizliliği bizim için fevkalade önemlidir. Bu politika, Orta Dünya'nın en güvenilir yolculuk platformu olan "galileoff."da nasıl veri topladığımızı, kullandığımızı ve koruduğumuzu açıklar.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Toplanan Veriler</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
            <li>Ad, soyad ve iletişim bilgileri</li>
            <li>Yolculuk tercihleri ve geçmiş rezervasyonlar</li>
            <li>Cihaz ve tarayıcı bilgileri</li>
            <li>IP adresi ve konum verileri</li>
            <li>Bazı büyü bilgileriniz</li>
            <li>Cihazınızdaki loglar</li>
            <li>En sevdiğiniz arkadaşınızın amcasının ikametgah adresi</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Veri Kullanım Amaçları</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6">
            <li>Burası ruh halimize göre değişir.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Veri Güvenliği</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Verileriniz, Sauron'un gözünden bile korunuyor! Bazı büyüsel yöntemler ve güçlü muhafızlarımız var.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Haklarınız</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Bize verdiğiniz bilgilerin hiçbirinden hak talep edemezsiniz. Çünkü bu bilgiler artık bizim.
          </p>

          <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 p-6 rounded-lg mt-8">
            <p className="text-center text-[var(--primary)] font-semibold">
              Sorularınız için: isengard@galileoff.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
