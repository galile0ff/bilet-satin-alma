import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-morphism-surface">
      <div className="w-full max-w-md">
        <div className="bg-morphism-surface backdrop-blur-md border border-morphism-border rounded-2xl p-8 shadow-morphism animate-morph-in">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
