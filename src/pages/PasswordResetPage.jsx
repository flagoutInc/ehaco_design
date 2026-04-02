import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="min-h-screen bg-ehaco-bg flex items-center justify-center px-4 fade-in">
        <div className="w-full max-w-md text-center py-16">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-ehaco-text mb-3">メールを送信しました</h1>
          <p className="text-sm text-muted mb-6">
            <span className="font-medium text-ehaco-text">{email}</span> 宛に<br />
            パスワード再設定用のリンクを送信しました。<br />
            メールをご確認ください。
          </p>
          <p className="text-xs text-muted mb-6">メールが届かない場合は、迷惑メールフォルダをご確認いただくか、<br />別のメールアドレスでお試しください。</p>
          <Link to="/login" className="text-sm text-accent hover:text-accent-light font-medium transition">ログインページに戻る</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ehaco-bg flex items-center justify-center px-4 fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-10 mx-auto mb-4 object-contain" />
          </Link>
          <h1 className="text-2xl font-black text-ehaco-text">パスワード再設定</h1>
          <p className="text-sm text-muted mt-2">ご登録のメールアドレスを入力してください</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-ehaco-text mb-1">メールアドレス</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-ehaco-border px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent transition" placeholder="example@company.com" />
          </div>
          <button type="submit"
            className="w-full btn-gradient font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-[0.97]">
            再設定メールを送信
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          <Link to="/login" className="text-accent hover:text-accent-light font-medium transition">ログインページに戻る</Link>
        </p>
      </div>
    </div>
  );
}
