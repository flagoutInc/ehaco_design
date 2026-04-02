import { useState } from 'react';
import { Link } from 'react-router-dom';

const industries = ['IT・ソフトウェア', '製造業', '金融・保険', '商社・卸売', '小売・流通', '建設・不動産', '通信・インフラ', 'メディア・広告', 'コンサルティング', '医療・製薬', '教育', '官公庁・自治体', 'その他'];
const employeeSizes = ['1〜9名', '10〜49名', '50〜99名', '100〜299名', '300〜499名', '500〜999名', '1,000〜4,999名', '5,000名以上'];

const inputClass = 'w-full rounded-lg border border-ehaco-border bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent transition';
const selectClass = 'w-full rounded-lg border border-ehaco-border bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none';
const labelClass = 'block text-sm font-medium text-ehaco-text mb-1';
const req = <span className="text-red-500 ml-0.5">*</span>;

export default function OrgRegisterPage() {
  const [step, setStep] = useState('form'); // form | complete
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState({
    companyName: '', contactName: '', email: '', password: '', phone: '',
    website: '', industry: '', employees: '',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-ehaco-bg flex items-center justify-center px-4 fade-in">
        <div className="w-full max-w-md text-center py-16">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-ehaco-text mb-3">主催者アカウントの作成が完了しました</h1>
          <p className="text-sm text-muted mb-6">管理画面からイベントの作成・管理ができます。</p>
          <div className="flex flex-col gap-3">
            <Link to="/org/dashboard" className="btn-gradient font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.97] text-center">
              管理画面へ
            </Link>
            <Link to="/" className="text-sm text-accent hover:text-accent-light font-medium transition">トップページへ</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ehaco-bg fade-in">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-10 mx-auto mb-3 object-contain" />
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-md">主催者管理</span>
          </div>
          <h1 className="text-2xl font-black text-ehaco-text">主催者アカウント作成（無料）</h1>
          <p className="text-sm text-muted mt-2">イベントページの作成・公開・申込者管理ができるようになります。</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setStep('complete'); }} className="space-y-6">
          <section className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
            <h2 className="font-bold text-ehaco-text mb-4 pl-3 border-l-4 border-accent">担当者情報</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>担当者名 {req}</label>
                <input type="text" required value={form.contactName} onChange={(e) => update('contactName', e.target.value)}
                  className={inputClass} placeholder="例：田中 太郎" />
              </div>
              <div>
                <label className={labelClass}>メールアドレス {req}</label>
                <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
                  className={inputClass} placeholder="会社メールアドレス" />
              </div>
              <div>
                <label className={labelClass}>パスワード {req}</label>
                <input type="password" required minLength={8} value={form.password} onChange={(e) => update('password', e.target.value)}
                  className={inputClass} placeholder="半角英数字8文字以上" />
              </div>
              <div>
                <label className={labelClass}>電話番号 {req}</label>
                <input type="tel" required value={form.phone} onChange={(e) => update('phone', e.target.value)}
                  className={inputClass} placeholder="03-1234-5678" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
            <h2 className="font-bold text-ehaco-text mb-4 pl-3 border-l-4 border-accent">企業情報</h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>会社名 {req}</label>
                <input type="text" required value={form.companyName} onChange={(e) => update('companyName', e.target.value)}
                  className={inputClass} placeholder="例：株式会社〇〇" />
              </div>
              <div>
                <label className={labelClass}>会社URL</label>
                <input type="url" value={form.website} onChange={(e) => update('website', e.target.value)}
                  className={inputClass} placeholder="https://example.com" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>業種 {req}</label>
                  <select required value={form.industry} onChange={(e) => update('industry', e.target.value)} className={selectClass}>
                    <option value="">選択してください</option>
                    {industries.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>従業員規模 {req}</label>
                  <select required value={form.employees} onChange={(e) => update('employees', e.target.value)} className={selectClass}>
                    <option value="">選択してください</option>
                    {employeeSizes.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
            <h2 className="font-bold text-ehaco-text mb-3 pl-3 border-l-4 border-accent">利用規約</h2>
            <div className="border border-ehaco-border rounded-lg h-40 overflow-y-auto p-4 mb-4 text-xs text-gray-600 leading-relaxed bg-gray-50">
              <h3 className="font-bold text-ehaco-text mb-2">イベント主催者利用規約</h3>
              <p>本利用規約は、株式会社フラグアウトが提供するインターネットサイト「ehaco！」を通じてイベントの企画・投稿・実施を行う主催者が遵守すべき利用条件を定めるものです。</p>
              <p className="mt-2 text-muted">（以下省略）</p>
              <p className="mt-2">2024年10月1日 制定</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent" />
              <span className="text-sm text-ehaco-text">
                <a href="https://ehaco.net/about/terms/organizer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">主催者向け利用規約</a>に同意します
              </span>
            </label>
          </section>

          <button type="submit" disabled={!agree}
            className="w-full btn-gradient text-lg font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed">
            アカウントを作成
          </button>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          すでにアカウントをお持ちですか？ <Link to="/org/login" className="text-accent hover:text-accent-light font-medium transition">ログイン</Link>
        </p>
      </div>
    </div>
  );
}
