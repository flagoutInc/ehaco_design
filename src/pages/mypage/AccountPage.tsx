import { useState, type ChangeEvent, type ReactNode } from 'react';
import { user } from '../../data/dummy';

const industries: string[] = ['IT・ソフトウェア', '製造業', '金融・保険', '商社・卸売', '小売・流通', '建設・不動産', '通信・インフラ', 'メディア・広告', 'コンサルティング', '医療・製薬', '教育', '官公庁・自治体', 'その他'];
const bizTypes: string[] = ['BtoB', 'BtoC', 'BtoBtoC', 'CtoC', 'その他'];
const employeeSizes: string[] = ['1〜9名', '10〜49名', '50〜99名', '100〜299名', '300〜499名', '500〜999名', '1,000〜4,999名', '5,000名以上'];
const revenueSizes: string[] = ['1億円未満', '1億〜10億円', '10億〜50億円', '50億〜100億円', '100億〜500億円', '500億〜1,000億円', '1,000億円以上'];
const departments: string[] = ['経営・経営企画', '情報システム', 'DX推進', 'マーケティング', '営業', '人事・総務', '広報・IR', '研究・開発', '製造・生産', 'カスタマーサクセス', 'その他'];
const positions: string[] = ['経営者・役員', '部長クラス', '課長クラス', '係長・主任クラス', '一般社員', 'その他'];
const prefectures: string[] = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];
const allTags: string[] = ['DX推進', 'AI活用', 'セキュリティ', 'マーケティング', 'サステナビリティ', '人事・HR', 'ビジネス戦略', 'SaaS', 'データ分析', 'クラウド', '経営', '営業・CS', 'IoT', 'ロボティクス'];

const inputClass = 'w-full rounded-lg border border-ehaco-border bg-white px-4 py-3 text-base focus:ring-2 focus:ring-accent/30 focus:border-accent transition';
const selectClass = 'w-full rounded-lg border border-ehaco-border bg-white px-4 py-3 text-base focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none';
const labelClass = 'block text-base font-semibold text-ehaco-text mb-1.5';
const req: ReactNode = <span className="text-red-500 ml-0.5">*</span>;

interface AccountForm {
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
  tags: string[];
}

export default function AccountPage() {
  const nameParts = user.name.split(/\s+/);
  const [form, setForm] = useState<AccountForm>({
    lastNameKanji: nameParts[0] || '', firstNameKanji: nameParts[1] || '',
    lastNameKana: 'スズキ', firstNameKana: 'イチロウ',
    company: user.company, companyUrl: user.companyUrl, phone: user.phone,
    zip1: '100', zip2: '0001', prefecture: '東京都', address: '千代田区千代田1-1',
    industry: user.industry, bizType: 'BtoB', employees: user.employees,
    revenue: '10億〜50億円', department: user.department, position: user.position,
    tags: [...user.interests],
  });
  const [tagInput, setTagInput] = useState<string>('');

  const update = (key: keyof AccountForm, value: string): void => setForm((prev) => ({ ...prev, [key]: value }));
  const addTag = (tag: string): void => {
    if (form.tags.length < 10 && !form.tags.includes(tag)) setForm((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    setTagInput('');
  };
  const removeTag = (tag: string): void => setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  const filteredSuggestions = tagInput ? allTags.filter((t) => t.includes(tagInput) && !form.tags.includes(t)) : [];

  return (
    <div className="fade-in">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text">アカウント設定</h1>
        </div>

        <div className="space-y-6">
          {/* ID & Email */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>利用者ID</label><p className="text-base text-muted bg-gray-50 rounded-lg px-4 py-3">47</p></div>
              <div><label className={labelClass}>メールアドレス</label><p className="text-base text-muted bg-gray-50 rounded-lg px-4 py-3 truncate">{user.email}</p></div>
            </div>
          </div>

          {/* Name */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>姓（全角漢字） {req}</label><input type="text" value={form.lastNameKanji} onChange={(e: ChangeEvent<HTMLInputElement>) => update('lastNameKanji', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>名（全角漢字） {req}</label><input type="text" value={form.firstNameKanji} onChange={(e: ChangeEvent<HTMLInputElement>) => update('firstNameKanji', e.target.value)} className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>姓（全角カナ） {req}</label><input type="text" value={form.lastNameKana} onChange={(e: ChangeEvent<HTMLInputElement>) => update('lastNameKana', e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>名（全角カナ） {req}</label><input type="text" value={form.firstNameKana} onChange={(e: ChangeEvent<HTMLInputElement>) => update('firstNameKana', e.target.value)} className={inputClass} /></div>
            </div>
          </div>

          {/* Company */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 space-y-4">
            <div><label className={labelClass}>会社名 {req}</label><input type="text" value={form.company} onChange={(e: ChangeEvent<HTMLInputElement>) => update('company', e.target.value)} className={inputClass} placeholder="株式会社〇〇" /></div>
            <div><label className={labelClass}>会社URL {req}</label><input type="url" value={form.companyUrl} onChange={(e: ChangeEvent<HTMLInputElement>) => update('companyUrl', e.target.value)} className={inputClass} /></div>
            <div>
              <label className={labelClass}>電話番号 {req}</label>
              <input type="tel" value={form.phone} onChange={(e: ChangeEvent<HTMLInputElement>) => update('phone', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>所在地 {req}</label>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted">〒</span>
                <input type="text" value={form.zip1} onChange={(e: ChangeEvent<HTMLInputElement>) => update('zip1', e.target.value)} className={`${inputClass} w-28`} maxLength={3} />
                <span className="text-muted">ー</span>
                <input type="text" value={form.zip2} onChange={(e: ChangeEvent<HTMLInputElement>) => update('zip2', e.target.value)} className={`${inputClass} w-32`} maxLength={4} />
              </div>
              <select value={form.prefecture} onChange={(e: ChangeEvent<HTMLSelectElement>) => update('prefecture', e.target.value)} className={`${selectClass} mb-2`}>
                <option value="">都道府県</option>
                {prefectures.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <input type="text" value={form.address} onChange={(e: ChangeEvent<HTMLInputElement>) => update('address', e.target.value)} className={inputClass} placeholder="市区町村番地・ビル名" />
            </div>
          </div>

          {/* Attributes */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>業種 {req}</label><select value={form.industry} onChange={(e: ChangeEvent<HTMLSelectElement>) => update('industry', e.target.value)} className={selectClass}><option value="">選択</option>{industries.map((v) => <option key={v}>{v}</option>)}</select></div>
              <div><label className={labelClass}>ビジネス形態 {req}</label><select value={form.bizType} onChange={(e: ChangeEvent<HTMLSelectElement>) => update('bizType', e.target.value)} className={selectClass}><option value="">選択</option>{bizTypes.map((v) => <option key={v}>{v}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>会社の従業員規模 {req}</label><select value={form.employees} onChange={(e: ChangeEvent<HTMLSelectElement>) => update('employees', e.target.value)} className={selectClass}><option value="">選択</option>{employeeSizes.map((v) => <option key={v}>{v}</option>)}</select></div>
              <div><label className={labelClass}>会社の年商規模 {req}</label><select value={form.revenue} onChange={(e: ChangeEvent<HTMLSelectElement>) => update('revenue', e.target.value)} className={selectClass}><option value="">選択</option>{revenueSizes.map((v) => <option key={v}>{v}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={labelClass}>担当領域（職種） {req}</label><select value={form.department} onChange={(e: ChangeEvent<HTMLSelectElement>) => update('department', e.target.value)} className={selectClass}><option value="">選択</option>{departments.map((v) => <option key={v}>{v}</option>)}</select></div>
              <div><label className={labelClass}>立場（役職） {req}</label><select value={form.position} onChange={(e: ChangeEvent<HTMLSelectElement>) => update('position', e.target.value)} className={selectClass}><option value="">選択</option>{positions.map((v) => <option key={v}>{v}</option>)}</select></div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
            <label className={labelClass}>興味のある分野タグ（最大10つまで）</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-accent/70"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                </span>
              ))}
            </div>
            <div className="relative">
              <input type="text" value={tagInput} onChange={(e: ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)} className={inputClass}
                placeholder="興味のある分野タグを設定できます。キーワードを入力してみましょう！" disabled={form.tags.length >= 10} />
              {filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg border border-ehaco-border shadow-lg z-10 max-h-40 overflow-y-auto">
                  {filteredSuggestions.map((tag) => (
                    <button key={tag} onClick={() => addTag(tag)} className="w-full text-left px-3 py-2 text-sm text-ehaco-text hover:bg-accent/5 hover:text-accent transition">{tag}</button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-muted mt-1">{form.tags.length}/10</p>
          </div>

          <div className="hidden sm:flex justify-end pb-8">
            <button className="btn-gradient font-medium px-8 py-3 rounded-xl shadow-sm transition cursor-pointer active:scale-[0.97]"onClick={() => alert('保存しました')}>保存</button>
          </div>
          {/* Mobile: sticky save button */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-ehaco-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] z-40">
            <button className="w-full btn-gradient font-medium py-3 rounded-xl shadow-sm transition cursor-pointer active:scale-[0.97]"onClick={() => alert('保存しました')}>保存</button>
          </div>
        </div>
      </div>
    </div>
  );
}
