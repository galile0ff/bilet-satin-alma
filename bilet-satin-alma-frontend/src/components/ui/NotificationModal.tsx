'use client';

import Button from './Button';

interface NotificationModalProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const ICONS = {
  success: (
    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const TITLES = {
  success: 'Harika (づ￣ 3￣)づ!',
  error: 'Maalesef ಥ_ಥ!',
};

export default function NotificationModal({ message, type, onClose }: NotificationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all scale-95 hover:scale-100 duration-300">
        <div className="mx-auto mb-4 flex items-center justify-center">
          {ICONS[type]}
        </div>
        <h2 className="text-3xl font-extrabold mb-3 text-gray-800">{TITLES[type]}</h2>
        <p className="mb-6 text-gray-600 text-lg">{message}</p>
        <div className="flex justify-center">
          <Button onClick={onClose} variant={type === 'success' ? 'primary' : 'secondary'} size="lg">
            Anladım
          </Button>
        </div>
      </div>
    </div>
  );
}
