import { useState } from 'react';

const inputClass = 'w-full rounded-xl border border-ehaco-border bg-white px-4 py-3 text-base focus:ring-2 focus:ring-accent/30 focus:border-accent transition';
const labelClass = 'block text-base font-semibold text-ehaco-text mb-1.5';
const req = <span className="text-red-500 ml-0.5">*</span>;

const inquiryTypes: string[] = ['主催者管理画面に関する操作・機能について', '集客強化に関するご相談', 'その他'];

interface ContactOrgForm {
  type: string;
  company: string;
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  message: string;
  file: File | null;
  agree: boolean;
}

export default function ContactOrgPage(): React.ReactElement {
  const [form, setForm] = useState<ContactOrgForm>({ type: '', company: '', lastName: '', firstName: '', email: '', phone: '', message: '', file: null, agree: false });
  const [sent, setSent] = useState<boolean>(false);
  const update = <K extends keyof ContactOrgForm>(k: K, v: ContactOrgForm[K]): void => setForm((p) => ({ ...p, [k]: v }));

  if (sent) return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center fade-in">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h1 className="text-2xl font-black text-ehaco-text mb-3">お問合せを受け付けました</h1>
      <p className="text-base text-muted">内容を確認の上、担当者よりご連絡いたします。</p>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-12 fade-in">
      <h1 className="text-2xl md:text-3xl font-black text-ehaco-text mb-2">お問合せ（主催者）</h1>
      <p className="text-sm text-muted mb-8">ehaco!主催者専用のお問合せフォームです。</p>

      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setSent(true); }} className="space-y-5">
        <div>
          <label className={labelClass}>お問合せの種類 {req}</label>
          <div className="space-y-2">
            {inquiryTypes.map((t) => (
              <label key={t} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${form.type === t ? 'border-accent bg-accent/5' : 'border-ehaco-border hover:border-accent/30'}`}>
                <input type="radio" name="type" value={t} checked={form.type === t} onChange={() => update('type', t)} className="w-4 h-4 text-accent focus:ring-accent" />
                <span className="text-sm text-ehaco-text">{t}</span>
              </label>
            ))}
          </div>
        </div>
        <div><label className={labelClass}>会社名 {req}</label><input type="text" required value={form.company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('company', e.target.value)} className={inputClass} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass}>姓 {req}</label><input type="text" required value={form.lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('lastName', e.target.value)} className={inputClass} /></div>
          <div><label className={labelClass}>名 {req}</label><input type="text" required value={form.firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('firstName', e.target.value)} className={inputClass} /></div>
        </div>
        <div><label className={labelClass}>会社で使用しているEメールアドレス {req}</label><input type="email" required value={form.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('email', e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>日中つながる電話番号 {req}</label><input type="tel" required value={form.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('phone', e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>お問合せ内容 {req}</label><textarea required value={form.message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => update('message', e.target.value)} className={`${inputClass} min-h-[150px] resize-none`} /></div>
        <div>
          <label className={labelClass}>ファイル添付</label>
          <input type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('file', e.target.files?.[0] ?? null)} className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent/10 file:text-accent hover:file:bg-accent/20 file:cursor-pointer" />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.agree} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('agree', e.target.checked)} className="mt-0.5 w-5 h-5 rounded border-ehaco-border text-accent focus:ring-accent" />
          <span className="text-sm text-ehaco-text"><a href="https://flagout.co.jp/terms/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">個人情報の取り扱い</a>に同意する</span>
        </label>
        <button type="submit" disabled={!form.agree} className="w-full btn-gradient font-bold py-3.5 rounded-xl text-base shadow-lg transition active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed">送信</button>
      </form>
    </div>
  );
}
