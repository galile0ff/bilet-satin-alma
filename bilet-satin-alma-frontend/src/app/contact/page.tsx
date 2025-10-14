import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <section className="section-spacing">
      <div className="container-minimal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-hero mb-4">İletişim</h1>
            <p className="text-body">
              Sorularınız ve önerileriniz için bizimle iletişime geçin
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="morphism-card p-8">
                <h2 className="text-section mb-6">Bize Ulaşın</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-brand-neutral">Email</p>
                      <p className="text-brand-neutral/70">info@otobusfirmasi.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-brand-neutral">Telefon</p>
                      <p className="text-brand-neutral/70">0850 123 45 67</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-brand-neutral">Adres</p>
                      <p className="text-brand-neutral/70">İstanbul, Türkiye</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="morphism-card p-8">
                <h3 className="text-lg font-semibold text-brand-neutral mb-4">Çalışma Saatleri</h3>
                <div className="space-y-2 text-brand-neutral/70">
                  <div className="flex justify-between">
                    <span>Pazartesi - Cuma</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cumartesi</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pazar</span>
                    <span>Kapalı</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="morphism-card p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
