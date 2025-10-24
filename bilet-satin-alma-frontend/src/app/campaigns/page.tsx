'use client'
import React, { useState, useEffect } from 'react';
import { Tag, Map, Mail, Swords } from 'lucide-react';

interface Coupon {
  code: string;
  company_name: string;
  discount_rate: number;
  usage_count: number;
  usage_limit: number;
  expiry_date: string;
}

interface LoreCampaign {
  title: string;
  description: string;
  icon: string;
}

const CouponCard: React.FC<{ coupon: Coupon }> = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const isExpired = new Date() >= new Date(coupon.expiry_date);
  const isLimitReached = coupon.usage_count >= coupon.usage_limit;
  const isActive = !isExpired && !isLimitReached;
  
  const usagePercentage = Math.min(100, (coupon.usage_count / coupon.usage_limit) * 100);

  const handleCopy = () => {
    if (!isActive) return;
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardBase = "rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 shadow-xl bg-white";
  const cardClass = isActive
    ? `${cardBase} border-l-4 border-green-400 hover:shadow-2xl` 
    : `${cardBase} bg-gray-50 border-l-4 border-red-400 opacity-75 shadow-lg`;

  const buttonClass = isActive
    ? "bg-gray-100 text-gray-800 shadow-md hover:shadow-inner-soft hover:bg-gray-200 active:shadow-inner-soft active:bg-gray-300 focus:ring-green-500"
    : "bg-gray-200 text-gray-600 shadow-none cursor-not-allowed";
    
  const badgeText = isExpired ? 'SÜRESİ DOLDU' : (isLimitReached ? 'TÜKENDİ' : 'AKTİF');
  const badgeColor = isExpired || isLimitReached ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={cardClass} >
      <div className='flex flex-col h-full'>
        <div className="flex justify-between items-start mb-4 pb-2 border-b border-gray-200">
          <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">{`%${coupon.discount_rate} İNDİRİM`}</h3>
          <span className={`text-xs font-bold uppercase px-3 py-1 ${badgeColor} text-white rounded-full self-start tracking-wider`}>
            {badgeText}
          </span>
        </div>
      
        <p className="text-base font-semibold text-gray-900 mb-4">
          <span className="font-normal text-gray-700">Geçerli Firma:</span> <span className="text-green-700 font-extrabold">{coupon.company_name}</span>
        </p>

        <div className="mb-4">
            <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                <span>Kalan Kullanım: {coupon.usage_count} / {coupon.usage_limit}</span>
                <span>%{Math.round(usagePercentage)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 shadow-inner">
                <div 
                    className={`h-2.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} 
                    style={{ width: `${usagePercentage}%` }}
                ></div>
            </div>
        </div>

        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-dashed border-gray-300">
          <span className="text-xl font-mono tracking-widest text-green-700 bg-gray-200 shadow-inner px-4 py-2 rounded-lg truncate w-2/3 text-center">
            {coupon.code}
          </span>
          <button
            onClick={handleCopy}
            disabled={!isActive}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-4 ${buttonClass}`}
          >
            {copied ? 'Cepledin!' : 'KOPYALA'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CampaignsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [email, setEmail] = useState('');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);

  const LORE_COLOR = 'text-green-600';
  const LORE_BG = 'bg-gray-100';
  const LORE_HOVER_BORDER = 'border-green-300';

  const loreCampaigns: LoreCampaign[] = [
    { title: 'Hobbit Yolu Hediyesi', description: 'Shire’den taze çay ve minik bir halı hediyesi! Ruhunuza iyi gelsin.', icon: '🍃' },
    { title: 'Elf Sessizliği Hediyesi', description: 'Lothlórien’den gelen sessiz bir melodi hediye! Yolculuk boyunca dinleyin.', icon: '🧝' },
    { title: 'Cüce Dağ Taşları', description: 'Dağlık bölgelerden cüce işçiliğiyle taşlar! Toplayın, dekor olarak kullanın.', icon: '⛏️' },
    { title: 'Gandalf’ın Sihirli Rotası', description: 'Gandalf’ın sihirli izlerini takip edin! Her durakta sürpriz bir efsane hissi.', icon: '🧙' }
  ];

  const validateEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubscribe = () => {
    if (!validateEmail()) {
      alert('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }
    setModalMessage(
      `Yüzüğün, Orta Dünya yollarında rüzgârla yarışan kargocu atların sırtında sana doğru yola çıktı. Elf muhafızları gözetiyor, karanlık ormanlardan bile geçse güvenle ulaşacak. Kapına geldiğinde, bir bilgelik nişanesi olarak Gandalf’a selam etmeyi unutma gezgin.`
    );
    setEmail('');
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/public-coupons');
        const data = await response.json();
        if (response.ok) {
          const sortedData = data.sort((a: Coupon, b: Coupon) => 
            new Date(b.expiry_date).getTime() - new Date(a.expiry_date).getTime()
          );
          setCoupons(sortedData);
        } else {
          console.error("Kuponlar çekilirken hata oluştu:", data.message);
        }
      } catch (error) {
        console.error("Kampanyalar çekilirken hata oluştu:", error);
      } finally {
        setLoadingCoupons(false);
      }
    };
    fetchCoupons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 space-y-20">

        <section>
          <div className="text-center mb-12">
            <Tag className="mx-auto h-14 w-14 text-green-600 transform rotate-12" />
            <h2 className="text-4xl font-extrabold text-gray-900 mt-4">Seyehatinizi Ucuza Getirin</h2>
            <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-700">
              Cebindeki altınları koru gezgin! Aşağıdaki büyülü parşömen kodlarını kullanarak yolculuğunu daha az altınla tamamla. Rüzgâr seninle olsun, yollarda ucuzluk senin kaderin!
            </p>
          </div>
          
          {loadingCoupons ? (
            <p className="text-center text-gray-600 py-10">Kuponlar yükleniyor... ⏳</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coupons.length > 0 ? (
                coupons.map((coupon, index) => (
                  <CouponCard key={index} coupon={coupon} />
                ))
              ) : (
                <div className="col-span-full text-center bg-gray-100 p-8 rounded-xl shadow-inner border border-gray-200">
                    <p className="text-lg text-gray-600">Şu anda aktif indirim kuponu bulunmamaktadır.</p>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="pt-12 border-t border-gray-300">
            <div className="text-center mb-12">
                <Map className={`mx-auto h-14 w-14 ${LORE_COLOR}`} />
                <h2 className="text-4xl font-extrabold text-gray-900 mt-4">Orta Dünya Hediyeleri</h2>
                <p className="mt-3 max-w-3xl mx-auto text-lg text-gray-700">
                    Sadece seyahat değil, ruhunuza iyi gelecek efsanevi hediyeler sizi bekliyor.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loreCampaigns.map((campaign, index) => (
                    <div key={index} className={`bg-white rounded-xl p-8 flex items-start shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 ${LORE_HOVER_BORDER}`}>
                        <div className="text-5xl mr-6 transform hover:scale-110 transition-transform duration-300">{campaign.icon}</div>
                        <div>
                            <h3 className={`text-xl font-bold ${LORE_COLOR} mb-2`}>{campaign.title}</h3>
                            <p className="text-gray-700">{campaign.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className={`bg-gray-100 p-12 rounded-2xl text-center shadow-inner`}>
          <Mail className={`mx-auto h-10 w-10 ${LORE_COLOR} mb-4`} />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Daha Fazla Efsane Yolculuk mu İstiyorsunuz?
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            E-posta adresini kadim parşömene kazı. Böylece yüzüğün sana ulaşsın ve Orta Dünya’nın gizli hazineleri, henüz elfler bile duymadan önce senin kulağına fısıldansın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="mail@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-2 py-3 rounded-xl text-gray-900 border border-gray-300 shadow-inner focus:outline-none focus:ring-4 focus:ring-green-400/50"
              required
            />
            <button
              onClick={handleSubscribe}
              className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors duration-300 font-bold shadow-md transform active:shadow-inner active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400/50"
            >
              Yüzüğüm Var! 💍
            </button>
          </div>
        </section>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-xl p-10 max-w-lg w-full text-center shadow-2xl border-4 border-green-500/50 transform scale-105">
            <Swords className='mx-auto h-12 w-12 text-green-600 mb-4' />
            <p className="mb-6 text-gray-800 text-xl font-semibold leading-relaxed" >
              {modalMessage}
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold shadow-md active:shadow-inner active:scale-95"
            >
              Yolculuğa Başla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}