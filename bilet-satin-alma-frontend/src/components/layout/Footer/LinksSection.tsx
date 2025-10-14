import Link from 'next/link';

const links = [
  { href: '/popular-routes', label: 'Popüler Rotalar' },
  { href: '/companies', label: 'Otobüs Firmaları' },
  { href: '/routes', label: 'Tüm Seferler' },
  { href: '/help', label: 'Yardım' },
  { href: '/about', label: 'Hakkımızda' },
];

export default function LinksSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-brand-neutral">Bağlantılar</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-brand-neutral/70 hover:text-brand-primary transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
