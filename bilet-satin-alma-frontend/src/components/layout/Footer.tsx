import React from 'react';
import { FaGithub, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="flex flex-col gap-4 lg:col-span-1">
            <h2 className="text-3xl font-extrabold text-[var(--primary)] tracking-tight">galileoff.</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Orta Dünya’nın dört bir yanına güvenli yolculuk? Mordor bile sorun değil. Dijital büyülerimizle hep yanındayız.<br />
              — ama Gandalf’ın gözü üstünde.
            </p>
            <div className="flex gap-4 mt-3">
              <a 
                href="https://github.com/galile0ff" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-[var(--primary)] transition-colors duration-200"
                title="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://www.instagram.com/enesyagiz_f/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-[var(--accent)] transition-colors duration-200"
                title="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] border-b-2 border-[var(--primary)] pb-1 w-max">
              Kurumsal
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/hakkimizda" className="hover:text-[var(--primary)] transition-colors duration-200">Hakkımızda</a></li>
              <li><a href="/kvkk" className="hover:text-[var(--primary)] transition-colors duration-200">KVKK ve Gizlilik</a></li>
              <li><a href="/kullanim-kosullari" className="hover:text-[var(--primary)] transition-colors duration-200">Kullanım Koşulları</a></li>
              <li><a href="/partnerler" className="hover:text-[var(--primary)] transition-colors duration-200">Otobüs Firmaları</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] border-b-2 border-[var(--secondary)] pb-1 w-max">
              Hizmetler
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/trips" className="hover:text-[var(--secondary)] transition-colors duration-200">Tüm Seferler</a></li>
              <li><a href="/my-tickets" className="hover:text-[var(--secondary)] transition-colors duration-200">Biletlerim</a></li>
              <li><a href="/campaigns" className="hover:text-[var(--secondary)] transition-colors duration-200">Güncel Kampanyalar</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[var(--text-light)] dark:text-[var(--text-dark)] border-b-2 border-[var(--accent)] pb-1 w-max">
              İletişim
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-[var(--primary)] flex-shrink-0" />
                <a href="mailto:isengard@galileoff.com" className="hover:text-[var(--primary)] transition-colors duration-200">isengard@galileoff.com</a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[var(--secondary)] flex-shrink-0" />
                <span>0850 000 00 00 (ses deneme, ses!)</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-[var(--accent)] flex-shrink-0" />
                <span>The Shire / Buckland</span>
              </div>
            </div>
            
            <a 
              href="/support" 
              className="mt-2 text-sm font-medium w-max py-2 px-4 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 transition-all duration-300"
            >
              Nolmuskine? (●'◡'●)
            </a>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {currentYear} <span className="text-[var(--primary)] font-semibold">galileoff.</span> Tüm haklar şahs-ı münhasırıma aittir; izinsiz kopyalanırsa ejderha nefesiyle yakılır.
          </p>
          <p className="mt-2 md:mt-0 text-gray-600 font-semibold">
            "Her dolaşan kaybolmuş değildir. - Bilge Bilbo"
          </p>
        </div>
      </div>
    </footer>
  );
}