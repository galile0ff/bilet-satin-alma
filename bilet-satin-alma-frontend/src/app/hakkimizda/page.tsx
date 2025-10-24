import React from 'react';
import { Compass, Lightbulb, Scroll } from 'lucide-react';

export default function HakkimizdaPage() {
  
  const sections = [
    {
      icon: Compass,
      title: "Misyonumuz",
      content: "Her yolcunun güvenli ve rahat bir yolculuk yapmasını sağlamak. Mordor'a bile bilet satan tek platform olarak, Orta Dünya'nın dört bir yanına ulaşım sağlıyoruz."
    },
    {
      icon: Lightbulb,
      title: "Vizyonumuz",
      content: "Dijital çağda Orta Dünya'nın ulaşımını modernleştirmek. Büyü ve teknolojiyi bir araya getirerek, yolculukları daha kolay ve eğlenceli hale getirmek."
    },
    {
      icon: Scroll,
      title: "Hikayemiz",
      content: "Hobbiton'da başlayan bu macera, Bilbo'nun yolculuklarından ilham alarak büyüdü. Artık sayısız yolcuya hizmet veren bir platform haline geldik."
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Hakkımızda
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Orta Dünya'nın en güvenilir yolculuk arkadaşı olarak <strong>galileoff.</strong> ile tanışın. Gandalf'ın rehberliğinde başlayan bu yolculuk, artık dijital büyülerimizle devam ediyor.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            
            return (
              <div key={index} className="border-b border-gray-200 pb-12 last:border-0">
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed pl-13">
                  {section.content}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-12 border-t border-gray-200">
          <blockquote className="text-center">
            <p className="text-xl text-gray-900 font-medium italic mb-2">
              "Her dolaşan kaybolmuş değildir."
            </p>
            <cite className="text-gray-600 not-italic">— Bilge Bilbo</cite>
          </blockquote>
        </div>

      </div>
    </div>
  );
}