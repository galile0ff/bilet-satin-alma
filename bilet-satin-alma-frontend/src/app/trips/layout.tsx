import Header from '@/components/layout/Header';

export const metadata = {
  title: 'galileoff. - Tüm Seferler',
  description: 'Mevcut tüm otobüs seferlerini görüntüleyin ve biletinizi alın.',
}

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>      
    </>
  )
}