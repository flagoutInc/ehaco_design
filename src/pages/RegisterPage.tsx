import { useState } from 'react';
import { Link } from 'react-router-dom';

const industries: string[] = ['IT・ソフトウェア', '製造業', '金融・保険', '商社・卸売', '小売・流通', '建設・不動産', '通信・インフラ', 'メディア・広告', 'コンサルティング', '医療・製薬', '教育', '官公庁・自治体', 'その他'];
const bizTypes: string[] = ['BtoB', 'BtoC', 'BtoBtoC', 'CtoC', 'その他'];
const employeeSizes: string[] = ['1〜9名', '10〜49名', '50〜99名', '100〜299名', '300〜499名', '500〜999名', '1,000〜4,999名', '5,000名以上'];
const revenueSizes: string[] = ['1億円未満', '1億〜10億円', '10億〜50億円', '50億〜100億円', '100億〜500億円', '500億〜1,000億円', '1,000億円以上'];
const departments: string[] = ['経営・経営企画', '情報システム', 'DX推進', 'マーケティング', '営業', '人事・総務', '広報・IR', '研究・開発', '製造・生産', 'カスタマーサクセス', 'その他'];
const positions: string[] = ['経営者・役員', '部長クラス', '課長クラス', '係長・主任クラス', '一般社員', 'その他'];
const prefectures: string[] = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];

const inputClass = 'w-full rounded-xl border border-ehaco-border bg-white px-4 py-3 text-base focus:ring-2 focus:ring-accent/30 focus:border-accent transition';
const selectClass = 'w-full rounded-xl border border-ehaco-border bg-white px-4 py-3 text-base focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none';
const labelClass = 'block text-base font-semibold text-ehaco-text mb-1.5';
const req = <span className="text-red-500 ml-0.5">*</span>;

const stepLabels: string[] = ['アカウント', 'お名前', '会社情報', '企業属性', '同意'];

interface ProgressProps {
  current: number;
}

function Progress({ current }: ProgressProps): React.ReactElement {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10">
      {stepLabels.map((label, i) => (
        <div key={label} className="flex items-center gap-1 sm:gap-2">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition ${
              i < current ? 'bg-green-500 text-white' : i === current ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'bg-gray-100 text-gray-400'
            }`}>
              {i < current ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : i + 1}
            </div>
            <span className={`text-[10px] mt-1 hidden sm:block ${i === current ? 'text-accent font-bold' : 'text-muted'}`}>{label}</span>
          </div>
          {i < 4 && <div className={`w-5 sm:w-8 h-0.5 mb-1 sm:mb-0 ${i < current ? 'bg-green-500' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  );
}

interface RegisterForm {
  lastNameKanji: string;
  firstNameKanji: string;
  lastNameKana: string;
  firstNameKana: string;
  company: string;
  companyUrl: string;
  phone: string;
  zip1: string;
  zip2: string;
  prefecture: string;
  address: string;
  industry: string;
  bizType: string;
  employees: string;
  revenue: string;
  department: string;
  position: string;
}

export default function RegisterPage(): React.ReactElement {
  // flow: email → verify → step1(name) → step2(company) → step3(attributes) → step4(agree) → complete
  const [flow, setFlow] = useState<'email' | 'verify' | 'detail' | 'complete'>('email');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [detailStep, setDetailStep] = useState<number>(0); // 0=account(done), 1=name, 2=company, 3=attributes, 4=agree
  const [agree, setAgree] = useState<boolean>(false);

  const [form, setForm] = useState<RegisterForm>({
    lastNameKanji: '', firstNameKanji: '', lastNameKana: '', firstNameKana: '',
    company: '', companyUrl: '', phone: '',
    zip1: '', zip2: '', prefecture: '', address: '',
    industry: '', bizType: '', employees: '', revenue: '', department: '', position: '',
  });
  const update = (key: keyof RegisterForm, value: string): void => setForm((prev) => ({ ...prev, [key]: value }));

  const verifyUrl = `${window.location.origin}${window.location.pathname}#/register?token=abc123`;

  const next = (): void => {
    if (detailStep < 4) { setDetailStep(detailStep + 1); window.scrollTo(0, 0); }
    else { setFlow('complete'); }
  };
  const back = (): void => { if (detailStep > 1) { setDetailStep(detailStep - 1); window.scrollTo(0, 0); } };

  // ─── Email step ───
  if (flow === 'email') {
    return (
      <div className="min-h-screen bg-ehaco-bg flex items-center justify-center px-4 fade-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/"><img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-10 mx-auto mb-4 object-contain" /></Link>
            <h1 className="text-2xl font-black text-ehaco-text">新規会員登録</h1>
            <p className="text-sm text-muted mt-2">メールアドレスとパスワードを入力してください</p>
          </div>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setFlow('verify'); }} className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 space-y-4">
            <div>
              <label className={labelClass}>メールアドレス {req}</label>
              <input type="email" required value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} className={inputClass} placeholder="example@company.com" />
            </div>
            <div>
              <label className={labelClass}>パスワード {req}</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required minLength={8} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} className={`${inputClass} pr-12`} placeholder="8文字以上" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-ehaco-text hover:bg-gray-100 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    {showPassword
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>}
                  </svg>
                </button>
              </div>
              <p className="text-xs text-muted mt-1">半角英数字または記号、8文字以上</p>
            </div>
            <button type="submit" disabled={!email || password.length < 8}
              className="w-full btn-gradient font-medium py-3 rounded-xl shadow-lg transition cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed">
              認証メールを送信
            </button>
          </form>
          <p className="text-center text-sm text-muted mt-6">
            すでにアカウントをお持ちですか？ <Link to="/login" className="text-accent hover:text-accent-light font-medium">ログイン</Link>
          </p>
        </div>
      </div>
    );
  }

  // ─── Verify step ───
  if (flow === 'verify') {
    return (
      <div className="min-h-screen bg-ehaco-bg flex items-center justify-center px-4 fade-in">
        <div className="w-full max-w-md text-center py-16">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-ehaco-text mb-3">認証メールを送信しました</h1>
          <p className="text-sm text-muted mb-6"><span className="font-medium text-ehaco-text">{email}</span> 宛に認証メールを送信しました。</p>
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 mb-6 text-left">
            <p className="text-xs text-muted mb-2">以下のURLをクリックして本登録に進んでください：</p>
            <button onClick={() => { setFlow('detail'); setDetailStep(1); }} className="text-sm text-accent hover:text-accent-light font-medium break-all text-left transition underline cursor-pointer">{verifyUrl}</button>
          </div>
          <p className="text-xs text-muted">メールが届かない場合は、迷惑メールフォルダをご確認ください。</p>
        </div>
      </div>
    );
  }

  // ─── Complete ───
  if (flow === 'complete') {
    return (
      <div className="min-h-screen bg-ehaco-bg flex items-center justify-center px-4 fade-in">
        <div className="w-full max-w-md text-center py-16">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-2xl font-black text-ehaco-text mb-3">会員登録が完了しました</h1>
          <p className="text-sm text-muted mb-6">ehaco! のすべての機能をご利用いただけます。</p>
          <div className="flex flex-col gap-3">
            <Link to="/" className="btn-gradient font-medium px-8 py-3 rounded-xl shadow-lg transition active:scale-[0.97] text-center">イベントを探す</Link>
            <Link to="/mypage/dashboard" className="text-sm text-accent hover:text-accent-light font-medium">マイページへ</Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── Detail steps (1-4) ───
  return (
    <div className="min-h-screen bg-ehaco-bg fade-in">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-6">
          <Link to="/"><img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-10 mx-auto mb-4 object-contain" /></Link>
          <h1 className="text-2xl font-black text-ehaco-text">新規会員登録（無料）</h1>
        </div>

        <Progress current={detailStep} />

        {/* Step 1: お名前 */}
        {detailStep === 1 && (
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 md:p-8">
            <h2 className="text-lg font-bold text-ehaco-text mb-6">お名前</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>姓（漢字） {req}</label><input type="text" value={form.lastNameKanji} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('lastNameKanji', e.target.value)} className={inputClass} placeholder="絵箱" /></div>
                <div><label className={labelClass}>名（漢字） {req}</label><input type="text" value={form.firstNameKanji} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('firstNameKanji', e.target.value)} className={inputClass} placeholder="太郎" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>姓（カナ） {req}</label><input type="text" value={form.lastNameKana} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('lastNameKana', e.target.value)} className={inputClass} placeholder="エハコ" /></div>
                <div><label className={labelClass}>名（カナ） {req}</label><input type="text" value={form.firstNameKana} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('firstNameKana', e.target.value)} className={inputClass} placeholder="タロウ" /></div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 会社情報 */}
        {detailStep === 2 && (
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 md:p-8">
            <h2 className="text-lg font-bold text-ehaco-text mb-6">会社情報</h2>
            <div className="space-y-4">
              <div><label className={labelClass}>会社名 {req}</label><input type="text" value={form.company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('company', e.target.value)} className={inputClass} placeholder="株式会社〇〇" /></div>
              <div><label className={labelClass}>会社URL {req}</label><input type="url" value={form.companyUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('companyUrl', e.target.value)} className={inputClass} placeholder="https://example.com" /></div>
              <div>
                <label className={labelClass}>電話番号 {req}</label>
                <input type="tel" value={form.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('phone', e.target.value)} className={inputClass} placeholder="直通番号（例：09012345678）" />
              </div>
              <div>
                <label className={labelClass}>所在地 {req}</label>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-muted">〒</span>
                  <input type="text" value={form.zip1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('zip1', e.target.value)} className={`${inputClass} w-28`} placeholder="100" maxLength={3} />
                  <span className="text-muted">ー</span>
                  <input type="text" value={form.zip2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('zip2', e.target.value)} className={`${inputClass} w-32`} placeholder="0001" maxLength={4} />
                </div>
                <select value={form.prefecture} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('prefecture', e.target.value)} className={`${selectClass} mb-2`}>
                  <option value="">都道府県</option>
                  {prefectures.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <input type="text" value={form.address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('address', e.target.value)} className={inputClass} placeholder="市区町村番地・ビル名" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 企業属性 */}
        {detailStep === 3 && (
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 md:p-8">
            <h2 className="text-lg font-bold text-ehaco-text mb-6">企業属性</h2>
            <div className="space-y-4">
              <div><label className={labelClass}>業種 {req}</label><select value={form.industry} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('industry', e.target.value)} className={selectClass}><option value="">選択してください</option>{industries.map((v) => <option key={v}>{v}</option>)}</select></div>
              <div><label className={labelClass}>ビジネス形態 {req}</label><select value={form.bizType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('bizType', e.target.value)} className={selectClass}><option value="">選択してください</option>{bizTypes.map((v) => <option key={v}>{v}</option>)}</select></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>従業員規模 {req}</label><select value={form.employees} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('employees', e.target.value)} className={selectClass}><option value="">選択</option>{employeeSizes.map((v) => <option key={v}>{v}</option>)}</select></div>
                <div><label className={labelClass}>年商規模 {req}</label><select value={form.revenue} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('revenue', e.target.value)} className={selectClass}><option value="">選択</option>{revenueSizes.map((v) => <option key={v}>{v}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>職種 {req}</label><select value={form.department} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('department', e.target.value)} className={selectClass}><option value="">選択</option>{departments.map((v) => <option key={v}>{v}</option>)}</select></div>
                <div><label className={labelClass}>役職 {req}</label><select value={form.position} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('position', e.target.value)} className={selectClass}><option value="">選択</option>{positions.map((v) => <option key={v}>{v}</option>)}</select></div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: 同意 */}
        {detailStep === 4 && (
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 md:p-8">
            <h2 className="text-lg font-bold text-ehaco-text mb-4">利用規約</h2>
            <p className="text-sm text-muted mb-4">以下の内容をご確認の上、ご同意いただける場合のみ「登録する」ボタンを押してください。</p>
            <div className="border border-ehaco-border rounded-lg h-48 overflow-y-auto p-4 mb-5 text-xs text-gray-600 leading-relaxed bg-gray-50">
              <h3 className="font-bold text-ehaco-text mb-2">イベント参加者利用規約</h3>
              <p className="mb-2"><span className="font-bold">第1条（総則）</span><br />
              1.本利用規約は、株式会社フラグアウト（以下「弊社」といいます。）が提供するインターネットサイト「ehaco！」を利用する者が遵守すべき利用条件を定めるものです。</p>
              <p className="mb-2"><span className="font-bold">第2条（定義）</span><br />
              (1)「本サービス」：本サイトにて提供するサービスのことをいいます。<br />
              (2)「主催者」：本サービスを通じてイベントの企画・投稿・実施を行う法人をいいます。</p>
              <p className="text-muted">（以下省略 — 全24条）</p>
              <p className="mt-2">2024年10月1日 制定<br />(c) FLAGOUT Inc. All Rights Reserved.</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgree(e.target.checked)}
                className="mt-0.5 w-5 h-5 rounded border-ehaco-border text-accent focus:ring-accent" />
              <span className="text-base text-ehaco-text font-medium">利用規約に同意します</span>
            </label>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pb-8">
          {detailStep > 1 ? (
            <button onClick={back} className="flex items-center gap-1.5 text-sm text-muted hover:text-ehaco-text transition cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              戻る
            </button>
          ) : <div />}
          <button onClick={next} disabled={detailStep === 4 && !agree}
            className="btn-gradient font-medium px-10 py-3 rounded-xl shadow-lg transition cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed">
            {detailStep === 4 ? '登録する' : '次へ'}
          </button>
        </div>
      </div>
    </div>
  );
}
