import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { orgStaff } from '../../data/orgDummy';

export default function StaffEditPage() {
  const { id } = useParams();
  const isEditing = !!id;
  const staff = isEditing ? (orgStaff.find((s) => String(s.id) === id) || orgStaff[0]) : null;

  const [form, setForm] = useState({
    name: staff?.name || '',
    email: staff?.email || '',
    phone: staff?.phone || '',
    role: staff?.role || '閲覧者',
  });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const labelClass = 'block text-sm font-medium text-ehaco-text mb-1.5';
  const inputClass =
    'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition';
  const selectClass =
    'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none';

  return (
    <div className="fade-in">
      <div className="max-w-2xl">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4 mb-8">
          {isEditing ? '担当者設定' : '担当者の追加'}
        </h1>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 space-y-5">
          {/* 担当者名 */}
          <div>
            <label className={labelClass}>担当者名</label>
            <input
              type="text"
              className={inputClass}
              placeholder="例）田中 太郎"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label className={labelClass}>メールアドレス</label>
            <input
              type="email"
              className={inputClass}
              placeholder="例）tanaka@example.com"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label className={labelClass}>電話番号</label>
            <input
              type="tel"
              className={inputClass}
              placeholder="例）03-1234-5678"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
            />
          </div>

          {/* 権限 */}
          <div>
            <label className={labelClass}>権限</label>
            <select
              className={selectClass}
              value={form.role}
              onChange={(e) => set('role', e.target.value)}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option value="管理者">管理者</option>
              <option value="編集者">編集者</option>
              <option value="閲覧者">閲覧者</option>
            </select>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          {isEditing ? (
            <button
              type="button"
              className="px-5 py-2.5 rounded-lg border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition"
            >
              削除
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3 btn-gradient shadow-sm rounded-lg text-sm font-semibold transition"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
