import React from 'react';
import { Shield, Database, Lock, AlertCircle } from 'lucide-react';

export default function KvkkPage() {
  
  const sections = [
    {
      icon: Database,
      title: "Toplanan Veriler",
      items: [
        "Ad, soyad ve iletişim bilgileri",
        "Yolculuk tercihleri ve geçmiş rezervasyonlar",
        "Cihaz ve tarayıcı bilgileri",
        "IP adresi ve konum verileri",
        "Bazı büyü bilgileriniz",
        "Cihazınızdaki loglar",
        "En sevdiğiniz arkadaşınızın amcasının ikametgah adresi"
      ]
    },
    {
      icon: Shield,
      title: "Veri Kullanım Amaçları",
      items: [
        "Burası ruh halimize göre değişir."
      ]
    },
    {
      icon: Lock,
      title: "Veri Güvenliği",
      description: "Verileriniz, Sauron'un gözünden bile korunuyor! Bazı büyüsel yöntemler ve güçlü muhafızlarımız var."
    },
    {
      icon: AlertCircle,
      title: "Haklarınız",
      description: "Bize verdiğiniz bilgilerin hiçbirinden hak talep edemezsiniz. Çünkü bu bilgiler artık bizim."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            KVKK ve Gizlilik Politikası
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Kişisel verilerinizin gizliliği bizim için fevkalade önemlidir. Bu politika, Orta Dünya'nın en güvenilir yolculuk platformu olan <strong>galileoff.</strong>'da nasıl veri topladığımızı, kullandığımızı ve koruduğumuzu açıklar.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <div key={index} className="border-b border-gray-200 pb-12 last:border-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-gray-400 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {section.description && (
                  <p className="text-gray-700 leading-relaxed">
                    {section.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 p-6 bg-gray-50 border-l-4 border-gray-900">
          <p className="text-gray-900 font-medium text-center">
            Sorularınız için: <a href="mailto:isengard@galileoff.com" className="underline hover:text-gray-600">isengard@galileoff.com</a>
          </p>
        </div>

      </div>
    </div>
  );
}