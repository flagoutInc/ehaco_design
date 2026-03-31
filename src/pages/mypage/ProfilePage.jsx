import { useState } from 'react';
import MypageSidebar from '../../components/MypageSidebar';
import { user, categories } from '../../data/dummy';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: user.name,
    company: user.company,
    department: user.department,
    position: user.position,
  });

  const [selectedCategories, setSelectedCategories] = useState(
    new Set(user.interests)
  );

  const [bio, setBio] = useState(
    '情報システム部にてDX推進を担当しています。最新のテクノロジートレンドを常にキャッチアップし、社内のデジタル化を推進することに注力しています。'
  );

  const maxBioLength = 500;

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 pb-20 sm:pb-8">
      <MypageSidebar activePage="profile" />
      <div className="mt-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-ehaco-text">プロフィール設定</h1>
            <div className="mt-2 h-1.5 w-16 bg-accent rounded-full" />
          </div>

          {/* Avatar */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-ehaco-text mb-4">
              プロフィール画像
            </h2>
            <div className="flex items-center gap-4 sm:gap-6">
              <img
                src={user.avatar}
                alt={user.name}
                loading="lazy"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <button className="text-sm font-medium text-accent hover:text-accent-light transition border border-accent hover:border-accent-light px-4 py-2 rounded-lg">
                  画像を変更
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  JPG、PNG形式。最大2MBまで。
                </p>
              </div>
            </div>
          </div>

          {/* Basic info */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-ehaco-text mb-4">
              基本情報
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                  氏名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                  会社名
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange('company')}
                  className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                  部署
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={handleInputChange('department')}
                  className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                  役職
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={handleInputChange('position')}
                  className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-ehaco-text mb-4">
              興味のあるカテゴリ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => {
                const isChecked = selectedCategories.has(category);
                return (
                  <label
                    key={category}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition ${
                      isChecked
                        ? 'border-accent bg-accent/5'
                        : 'border-ehaco-border hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleCategory(category)}
                      className="sr-only"
                    />
                    <span
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${
                        isChecked
                          ? 'bg-accent border-accent'
                          : 'border-gray-300'
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-ehaco-text">{category}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold tracking-tight text-ehaco-text mb-4">
              自己紹介
            </h2>
            <div className="relative">
              <textarea
                value={bio}
                onChange={(e) => {
                  if (e.target.value.length <= maxBioLength) {
                    setBio(e.target.value);
                  }
                }}
                rows={5}
                placeholder="自己紹介を入力してください..."
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
              />
              <p className="text-xs text-gray-400 text-right mt-1">
                <span className={bio.length > maxBioLength * 0.9 ? 'text-red-500' : ''}>
                  {bio.length}
                </span>
                /{maxBioLength}文字
              </p>
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button className="btn-gradient font-medium px-8 py-2.5 rounded-lg transition">
              プロフィールを保存
            </button>
          </div>
      </div>
    </div>
  );
}
