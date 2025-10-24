'use client';
import React from 'react';
import { Shield, Coins, AlertTriangle, FileText } from 'lucide-react';

export default function KullanimKosullariPage() {
  const sections = [
    {
      id: 1,
      icon: Shield,
      title: "Genel Kurallar",
      items: [
        "Platformu Orta Dünya'nın yasal ve barışçıl amaçlarına uygun olarak kullanın. Yasadışı veya hain amaçlar kesinlikle yasaktır.",
        "Başkalarının haklarını, mülkiyetini ve huzurunu (özellikle Shire'daki hobbitlerin) ihlal etmeyin.",
        "Sisteme hiçbir karanlık veya ak büyü gücü kullanarak sızmaya veya müdahale etmeye kalkışmayın. Bu tür girişimler Yüksek Konsey'e bildirilecektir.",
        "Rezervasyon bilgilerini doğru ve eksiksiz girin. Yanlış veya yanıltıcı bilgi, yolculuğunuzun Gondor Surları'nda sonlandırılmasına neden olabilir."
      ]
    },
    {
      id: 2,
      icon: Coins,
      title: "Rezervasyon ve Ödeme",
      items: [
        "Bilet rezervasyonları, ödeme (altın, gümüş veya modern kredi) onaylandıktan hemen sonra kesinleşir.",
        "İptal ve değişiklik işlemleri son derece kısıtlıdır ve tamamen şirket keyfimize bağlıdır. Planlarınızı kesinleştirmeden bilet almayınız.",
        "Ödemeler, Elf Güvenlik Protokolleri (ESG) ile korunan kanallardan yapılır."
      ],
      special: "İade hakkınız vardır ve gizli tutulur. Burası galileoff., Mordor'lu bilet şirketlerinin garip iade koşullarına boyun eğmek zorunda değilsiniz."
    },
    {
      id: 3,
      icon: AlertTriangle,
      title: "Sorumluluk Reddi ve Yol Güvenliği",
      description: "Platformumuz, yolculuk sırasında elf yollarında taş düşmesi, cüce köprülerinin plansız yıkılması, trollerin yolu kapatması, Nazgûl saldırıları veya diğer doğaüstü felaketler yüzünden meydana gelebilecek gecikmelerden veya zararlardan sorumlu tutulamaz. Bu aksaklıklardan ilgili taşra lordları, otobüs firmaları ve yerel canavarlar mesuldür."
    },
    {
      id: 4,
      icon: FileText,
      title: "Hizmet Değişiklikleri",
      description: "Hizmetlerimizi Orta Dünya'nın sürekli değişen jeopolitik koşullarına ayak uydurmak için zaman zaman değiştiririz. Büyük değişikliklerde, tüm müşterilerimize en az yedi gün önceden işaret fişekleriyle haber veririz. Küçük değişiklikler bu sayfada anında geçerli olur."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Kullanım Koşulları
          </h1>
          <p className="text-lg text-gray-600">
            galileoff. — Orta Dünya Seyahat Kuralları ve Yükümlülükler
          </p>
        </div>

        <div className="mb-12 p-6 bg-gray-50 border-l-4 border-gray-900">
          <p className="text-gray-700 leading-relaxed">
            "galileoff." platformunu kullanarak, aşağıdaki kullanım koşullarını kabul etmiş olursunuz. Bu koşullar, Orta Dünya'nın en güvenilir yolculuk hizmetini kullanırken uymanız gereken kadim ve bağlayıcı kuralları belirler.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <div key={section.id} className="border-b border-gray-200 pb-12 last:border-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {index + 1}. {section.title}
                  </h2>
                </div>

                {section.items && (
                  <ul className="space-y-3 mb-4">
                    {section.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <span className="text-gray-400 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {section.special && (
                  <div className="mt-4 p-4 bg-gray-100 border-l-4 border-gray-900">
                    <p className="text-gray-900 font-medium">
                      {section.special}
                    </p>
                  </div>
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

        <div className="mt-16 pt-12 border-t border-gray-200">
          <blockquote className="text-center">
            <p className="text-xl text-gray-900 font-medium italic mb-2">
              "Sabır, en karanlık yollarda bile ışığı bulur."
            </p>
            <cite className="text-gray-600 not-italic">— Elrond</cite>
          </blockquote>
        </div>

      </div>
    </div>
  );
}