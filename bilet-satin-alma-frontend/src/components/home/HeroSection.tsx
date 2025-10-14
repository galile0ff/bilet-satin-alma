import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="section-spacing bg-gradient-to-br from-brand-light via-white to-brand-secondary/20">
      <div className="container-minimal">
        <div className="text-center max-w-4xl mx-auto animate-morph-in">
          <h1 className="text-hero mb-6">
            Türkiye'nin Her Yerine
            <span className="block text-brand-primary">Güvenli Yolculuk</span>
          </h1>

          <p className="text-body text-xl mb-8 max-w-2xl mx-auto">
            Binlerce otobüs firması ile istediğiniz yere, istediğiniz zaman yolculuk edin.
            En uygun fiyatlar ve en kaliteli hizmet sizleri bekliyor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" size="lg" className="animate-float">
              Sefer Ara
            </Button>
            <Button variant="ghost" size="lg">
              Popüler Rotalar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
