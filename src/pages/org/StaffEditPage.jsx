import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orgStaff } from '../../data/orgDummy';

export default function StaffEditPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const staff = isEditing ? (orgStaff.find((s) => String(s.id) === id) || orgStaff[0]) : null;

  const nameParts = (staff?.name || '').split(/\s+/);
  const [form, setForm] = useState({
    lastName: nameParts[0] || '',
    firstName: nameParts[1] || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
  });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const labelClass = 'block text-sm font-medium text-ehaco-text mb-1.5';
  const inputClass = 'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition';

  return (
    <div className="fade-in">
      <div className="max-w-2xl">
        <div className="mb-6">
          <Link to="/org/staff" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            担当者一覧に戻る
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4 mb-8">
          {isEditing ? '担当者設定' : '担当者の追加'}
        </h1>

        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 space-y-5">
          {/* 姓・名 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>姓（全角漢字） <span className="text-red-500">*</span></label>
              <input type="text" required className={inputClass} value={form.lastName}
                onChange={(e) => set('lastName', e.target.value)} placeholder="例：田中" />
            </div>
            <div>
              <label className={labelClass}>名（全角漢字） <span className="text-red-500">*</span></label>
              <input type="text" required className={inputClass} value={form.firstName}
                onChange={(e) => set('firstName', e.target.value)} placeholder="例：太郎" />
            </div>
          </div>

          {/* メールアドレス */}
          <div>
            <label className={labelClass}>担当者ログイン用メールアドレス <span className="text-red-500">*</span></label>
            <input type="email" required className={inputClass} value={form.email}
              onChange={(e) => set('email', e.target.value)} placeholder="例：tanaka@example.com" />
          </div>

          {/* 電話番号 */}
          <div>
            <label className={labelClass}>電話番号 <span className="text-red-500">*</span></label>
            <input type="tel" required className={inputClass} value={form.phone}
              onChange={(e) => set('phone', e.target.value)} placeholder="直通番号（例：08012345678）" />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          {isEditing ? (
            <button type="button"
              className="px-5 py-2.5 rounded-lg border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition cursor-pointer">
              削除
            </button>
          ) : <div />}
          <button type="button"
            className="w-full sm:w-auto px-8 py-3 btn-gradient shadow-sm rounded-lg text-sm font-semibold transition cursor-pointer active:scale-[0.97]">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
