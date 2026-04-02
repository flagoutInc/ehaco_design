import { useState } from 'react';

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="fade-in">
      <div className="max-w-2xl">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text">プロフィール設定</h1>
        </div>

        <div className="space-y-10">
          {/* Display name */}
          <div>
            <label className="block text-lg font-bold text-ehaco-text mb-2">プロフィール表示名</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-xl border border-ehaco-border bg-white px-4 py-3.5 text-base focus:ring-2 focus:ring-accent/30 focus:border-accent transition" />
            <p className="text-sm text-muted mt-2 leading-relaxed">
              入力をすると、プロフィールに利用者名として公開されます。<br />
              空欄の場合は、プロフィールに利用者名は表示されません。
            </p>
          </div>

          {/* Profile image */}
          <div>
            <label className="block text-lg font-bold text-ehaco-text mb-3">プロフィール表示画像</label>
            <div className="flex items-start gap-6">
              {imagePreview ? (
                <img src={imagePreview} alt="プロフィール画像" className="w-28 h-28 rounded-xl border border-ehaco-border object-cover" />
              ) : (
                <div className="w-28 h-28 rounded-xl border-2 border-dashed border-ehaco-border bg-gray-50 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              )}
              <div className="pt-1">
                <label className="text-base font-medium text-accent hover:text-accent/80 border border-accent hover:border-accent/80 hover:bg-accent/5 px-5 py-2.5 rounded-xl transition cursor-pointer inline-block">
                  画像をアップロード
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
                <ul className="mt-3 space-y-1 text-sm text-muted">
                  <li>サイズ: 240 x 240px</li>
                  <li>種類: jpg、gif、png形式</li>
                  <li>ファイルサイズ: 最大1MB</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-10 pb-8">
          <button className="btn-gradient font-medium px-10 py-3.5 rounded-xl text-base shadow-sm transition cursor-pointer active:scale-[0.97]"onClick={() => alert('保存しました')}>保存</button>
        </div>
      </div>
    </div>
  );
}
