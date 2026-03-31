import { useState } from 'react';
import { orgProfile } from '../../data/orgDummy';

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

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="fade-in">
      <div className="max-w-3xl">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
            企業設定
          </h1>
        </div>

        {/* Company info card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 mb-6">
          <div className="space-y-6">
            {/* 表示名 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                表示名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={handleChange('displayName')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                required
              />
              <p className="text-xs text-muted mt-1.5">
                企業プロフィールに表示名として公開されます
              </p>
            </div>

            {/* 専用ページURL */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                専用ページURL
              </label>
              <div className="flex items-center border border-ehaco-border rounded-lg overflow-hidden bg-gray-50">
                <span className="text-xs text-muted px-3 py-2.5 whitespace-nowrap border-r border-ehaco-border bg-gray-50">
                  https://ehaco.net/organizer/
                </span>
                <input
                  type="text"
                  value={formData.pageUrl}
                  readOnly
                  className="flex-1 px-3 py-2.5 text-sm text-muted bg-gray-50 focus:outline-none cursor-not-allowed"
                />
              </div>
              <div className="mt-1.5 space-y-0.5">
                <p className="text-xs text-muted">
                  専用ページURLは変更できません。変更をご希望の場合はお問い合わせください。
                </p>
                <p className="text-xs text-muted">
                  半角英数字・ハイフンのみ使用できます。
                </p>
              </div>
            </div>

            {/* 企業名または団体名 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                企業名または団体名
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={handleChange('companyName')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>

            {/* プロフィール表示画像 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                プロフィール表示画像
              </label>
              <div className="flex items-center gap-5">
                <img
                  src={formData.logoUrl}
                  alt="企業ロゴ"
                  className="w-24 h-24 rounded-lg border border-ehaco-border object-cover"
                />
                <div>
                  <button className="text-sm font-medium text-accent hover:text-accent/80 border border-accent hover:border-accent/80 hover:bg-accent/5 px-4 py-2 rounded-lg transition">
                    画像をアップロード
                  </button>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-xs text-muted">推奨サイズ: 240 x 240px</p>
                    <p className="text-xs text-muted">対応形式: jpg, png, gif</p>
                    <p className="text-xs text-muted">最大ファイルサイズ: 1MB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* お問い合わせURL */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                お問い合わせURL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.contactUrl}
                onChange={handleChange('contactUrl')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                required
              />
            </div>

            {/* お問い合わせメールアドレス */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                お問い合わせメールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={handleChange('contactEmail')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                required
              />
            </div>

            {/* 企業・団体のWebサイトURL */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                企業・団体のWebサイトURL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={handleChange('websiteUrl')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                required
              />
            </div>

            {/* 電話番号 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                企業または団体の電話番号 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handleChange('phone')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                required
              />
              <p className="text-xs text-muted mt-1.5">
                利用者には公開されません
              </p>
            </div>

            {/* 紹介文 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                紹介文 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={handleChange('description')}
                rows={5}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button className="btn-gradient font-medium px-8 py-2.5 rounded-lg transition shadow-sm">
            変更を保存
          </button>
        </div>
      </div>
    </div>
  );
}
