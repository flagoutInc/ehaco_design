import { useState } from 'react';
import { orgProfile } from '../../data/orgDummy';

interface BadgeProps {
  type: string;
}

const Badge = ({ type }: BadgeProps) => (
  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ml-2 ${
    type === '公開' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
  }`}>{type}</span>
);

export default function CompanyPage() {
  const [formData, setFormData] = useState({
    displayName: orgProfile.displayName,
    pageUrl: orgProfile.pageUrl,
    companyName: orgProfile.companyName,
    logoUrl: orgProfile.logoUrl,
    contactUrl: orgProfile.contactUrl,
    contactEmail: orgProfile.contactEmail,
    websiteUrl: orgProfile.websiteUrl,
    phone: orgProfile.phone,
    description: orgProfile.description,
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const labelClass = 'block text-sm font-medium text-ehaco-text mb-1.5';
  const inputClass = 'w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition';

  return (
    <div className="fade-in">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">主催者情報</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 mb-6">
          <div className="space-y-6">
            <div>
              <label className={labelClass}>表示名 <span className="text-red-500">*</span><Badge type="公開" /></label>
              <input type="text" value={formData.displayName} onChange={handleChange('displayName')} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>専用ページURL <span className="text-xs text-muted font-normal ml-1">変更不可</span></label>
              <div className="flex items-center border border-ehaco-border rounded-lg overflow-hidden bg-gray-50">
                <span className="text-xs text-muted px-3 py-2.5 whitespace-nowrap border-r border-ehaco-border">https://ehaco.net/organizer/</span>
                <input type="text" value={formData.pageUrl} readOnly className="flex-1 px-3 py-2.5 text-sm text-muted bg-gray-50 focus:outline-none cursor-not-allowed" />
              </div>
            </div>

            <div>
              <label className={labelClass}>企業名または団体名</label>
              <input type="text" value={formData.companyName} onChange={handleChange('companyName')} className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>プロフィール表示画像</label>
              <div className="flex items-center gap-5">
                <img src={formData.logoUrl} alt="企業ロゴ" className="w-24 h-24 rounded-lg border border-ehaco-border object-cover" />
                <div>
                  <button className="text-sm font-medium text-accent hover:text-accent/80 border border-accent hover:border-accent/80 hover:bg-accent/5 px-4 py-2 rounded-lg transition">画像をアップロード</button>
                  <p className="text-xs text-muted mt-2">240x240px / jpg,png,gif / 最大1MB</p>
                </div>
              </div>
            </div>

            <div>
              <label className={labelClass}>お問い合わせURL <span className="text-red-500">*</span><Badge type="公開" /></label>
              <input type="url" value={formData.contactUrl} onChange={handleChange('contactUrl')} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>お問い合わせメールアドレス <span className="text-red-500">*</span><Badge type="非公開" /></label>
              <input type="email" value={formData.contactEmail} onChange={handleChange('contactEmail')} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>WebサイトURL <span className="text-red-500">*</span><Badge type="公開" /></label>
              <input type="url" value={formData.websiteUrl} onChange={handleChange('websiteUrl')} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>電話番号 <span className="text-red-500">*</span><Badge type="非公開" /></label>
              <input type="tel" value={formData.phone} onChange={handleChange('phone')} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>紹介文 <span className="text-red-500">*</span><Badge type="公開" /></label>
              <textarea value={formData.description} onChange={handleChange('description')} rows={5} className={`${inputClass} resize-none`} required />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn-gradient font-medium px-8 py-2.5 rounded-lg transition shadow-sm cursor-pointer active:scale-[0.97]"onClick={() => alert('保存しました')}>保存</button>
        </div>
      </div>
    </div>
  );
}
