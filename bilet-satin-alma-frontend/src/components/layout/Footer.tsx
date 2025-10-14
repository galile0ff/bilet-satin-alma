export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Hakkımızda</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Türkiye'nin her noktasına güvenli ve konforlu otobüs yolculuğu için bilet satın alma platformu.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">İletişim</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Email: info@otobusticket.com<br />
              Tel: 0850 123 45 67
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Seferler</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>
                <a href="#popular" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Popüler Rotalar
                </a>
              </li>
              <li>
                <a href="#companies" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Otobüs Firmaları
                </a>
              </li>
              <li>
                <a href="#routes" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Tüm Seferler
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} OtobüsTicket. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}