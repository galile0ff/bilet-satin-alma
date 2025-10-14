import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import LinksSection from './LinksSection';
import SocialSection from './SocialSection';

export default function Footer() {
  return (
    <footer className="bg-morphism-surface border-t border-morphism-border mt-auto">
      <div className="container-minimal section-spacing">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AboutSection />
          <ContactSection />
          <LinksSection />
          <SocialSection />
        </div>

        <div className="mt-12 pt-8 border-t border-morphism-border text-center">
          <p className="text-brand-neutral/60">
            © {new Date().getFullYear()} OtobüsTicket. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
