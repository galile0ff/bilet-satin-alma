import React from 'react';

export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-light)] py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] mb-8 text-center">
          Hakkımızda
        </h1>

        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Orta Dünya'nın en güvenilir yolculuk arkadaşı olarak "galileoff." ile tanışın! Gandalf'ın rehberliğinde başlayan bu yolculuk, artık dijital büyülerimizle devam ediyor.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Misyonumuz</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Her yolcunun güvenli ve rahat bir yolculuk yapmasını sağlamak. Mordor'a bile bilet satan tek platform olarak, Orta Dünya'nın dört bir yanına ulaşım sağlıyoruz.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Vizyonumuz</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Dijital çağda Orta Dünya'nın ulaşımını modernleştirmek. Büyü ve teknolojiyi bir araya getirerek, yolculukları daha kolay ve eğlenceli hale getirmek.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-4">Hikayemiz</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Hobbiton'da başlayan bu macera, Bilbo'nun yolculuklarından ilham alarak büyüdü. Artık sayısız yolcuya hizmet veren bir platform haline geldik.
          </p>

          <div className="bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20 p-6 rounded-lg mt-8">
            <p className="text-center text-[var(--primary)] font-semibold">
              "Her dolaşan kaybolmuş değildir." - Bilge Bilbo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
