export default function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-light via-white to-brand-secondary/20">
      <div className="container-minimal">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-hero mb-6">
            Orta Dünya'nın Her Yerine
            <span className="block text-brand-primary">Güvenli Yolculuk</span>
          </h1>
          <p className="text-body text-xl max-w-2xl mx-auto">
            Orta Dünya yollarında güvenli ve büyülü yolculuklar seni bekliyor! Gondor’a, Rohan’a ya da Shire’ın huzurlu tepelerine… Nereye gidersen git, biletin burada seni bekliyor.
          </p>
        </div>
      </div>
    </section>
  );
}